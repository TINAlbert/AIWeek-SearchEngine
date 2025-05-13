using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using SearchServiceEngine.Controllers;
using SearchServiceEngine.Data;
using SearchServiceEngine.Models;
using SearchServiceEngine.Request;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using SearchServiceEngine.Services;
using Microsoft.AspNetCore.Http;

namespace SearchServiceEngine.Tests
{
    public class AuthControllerTests
    {
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<SignInManager<User>> _signInManagerMock;
        private readonly Mock<IRefreshTokenService> _refreshTokenServiceMock;
        private readonly AuthController _controller;
        private readonly Mock<AppDbContext> _dbContextMock;

        public AuthControllerTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().Options;
            _dbContextMock = new Mock<AppDbContext>(options);
            var store = new Mock<IUserStore<User>>();
            var optionsMock = new Mock<Microsoft.Extensions.Options.IOptions<IdentityOptions>>();
            var passwordHasher = new Mock<IPasswordHasher<User>>();
            var userValidators = new List<IUserValidator<User>> { new Mock<IUserValidator<User>>().Object };
            var passwordValidators = new List<IPasswordValidator<User>> { new Mock<IPasswordValidator<User>>().Object };
            var keyNormalizer = new Mock<ILookupNormalizer>();
            var errors = new Mock<IdentityErrorDescriber>();
            var services = new Mock<IServiceProvider>();
            var logger = new Mock<Microsoft.Extensions.Logging.ILogger<UserManager<User>>>();
            _userManagerMock = new Mock<UserManager<User>>(
                store.Object,
                optionsMock.Object,
                passwordHasher.Object,
                userValidators,
                passwordValidators,
                keyNormalizer.Object,
                errors.Object,
                services.Object,
                logger.Object
            );
            var contextAccessor = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
            var claimsFactory = new Mock<IUserClaimsPrincipalFactory<User>>();
            var signInLogger = new Mock<Microsoft.Extensions.Logging.ILogger<SignInManager<User>>>();
            var confirmation = new Mock<IUserConfirmation<User>>();
            var schemeProvider = new Mock<Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider>();
            var signInManager = new SignInManager<User>(
                _userManagerMock.Object,
                contextAccessor.Object,
                claimsFactory.Object,
                optionsMock.Object,
                signInLogger.Object,
                schemeProvider.Object,
                confirmation.Object
            );
            _signInManagerMock = new Mock<SignInManager<User>>(); // Solo para exponer el mock, pero se usará la instancia real
            _refreshTokenServiceMock = new Mock<IRefreshTokenService>();
            _controller = new AuthController(_userManagerMock.Object, signInManager, new Mock<IConfiguration>().Object, _refreshTokenServiceMock.Object);
        }

        [Fact]
        public async Task Login_ReturnsUnauthorized_WhenUserNotFound()
        {
            // Arrange: usar EF Core InMemory
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb1")
                .Options;
            using var context = new AppDbContext(options);
            var mockUserStore = new Mock<IUserStore<User>>();
            var userManager = new UserManager<User>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            var mockSignInManager = new Mock<SignInManager<User>>(userManager,
                Mock.Of<Microsoft.AspNetCore.Http.IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(), null, null, null, null);
            var mockConfig = new Mock<IConfiguration>();
            var mockRefreshTokenService = new Mock<IRefreshTokenService>();
            var controller = new AuthController(userManager, mockSignInManager.Object, mockConfig.Object, mockRefreshTokenService.Object);
            var loginRequest = new LoginRequest { UserName = "notfound", Password = "irrelevant" };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public async Task Login_ReturnsToken_WhenUserExistsAndPasswordMatches()
        {
            // Arrange: usar EF Core InMemory
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb2")
                .Options;
            using var context = new AppDbContext(options);
            var user = new User { Id = "user-123", UserName = "admin", Role = "Admin" };
            context.Users.Add(user);
            context.SaveChanges();

            var mockUserStore = new Mock<IUserStore<User>>();
            var userManager = new Mock<UserManager<User>>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(user);
            var signInManager = new Mock<SignInManager<User>>(userManager.Object,
                Mock.Of<Microsoft.AspNetCore.Http.IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(), null, null, null, null);
            signInManager.Setup(m => m.CheckPasswordSignInAsync(user, It.IsAny<string>(), false)).ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns("test_secret_key_1234567890123456");
            mockConfig.Setup(c => c["Jwt:Issuer"]).Returns("test_issuer");
            mockConfig.Setup(c => c["Jwt:Audience"]).Returns("test_audience");
            var mockRefreshTokenService = new Mock<IRefreshTokenService>();
            mockRefreshTokenService.Setup(s => s.InvalidateAllAsync(It.IsAny<string>())).Returns(Task.CompletedTask);
            mockRefreshTokenService.Setup(s => s.GenerateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(new RefreshToken { Token = "refresh-token-123" });
            var controller = new AuthController(userManager.Object, signInManager.Object, mockConfig.Object, mockRefreshTokenService.Object);
            // Mock HttpContext.Connection.RemoteIpAddress
            var httpContext = new DefaultHttpContext();
            httpContext.Connection.RemoteIpAddress = System.Net.IPAddress.Parse("127.0.0.1");
            controller.ControllerContext = new ControllerContext { HttpContext = httpContext };
            var loginRequest = new LoginRequest { UserName = "admin", Password = "1234" };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            var tokenProp = okResult.Value.GetType().GetProperty("token");
            Assert.NotNull(tokenProp);
            var token = tokenProp.GetValue(okResult.Value) as string;
            Assert.False(string.IsNullOrEmpty(token));
        }
    }
}
