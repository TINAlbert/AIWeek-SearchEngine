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

namespace SearchServiceEngine.Tests
{
    public class AuthControllerTests
    {
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
            var controller = new AuthController(userManager, mockSignInManager.Object, mockConfig.Object);
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
            var user = new User { UserName = "admin", Role = "Admin" };
            context.Users.Add(user);
            context.SaveChanges();

            var mockUserStore = new Mock<IUserStore<User>>();
            var userManager = new Mock<UserManager<User>>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            userManager.Setup(m => m.FindByNameAsync("admin")).ReturnsAsync(user);
            var signInManager = new Mock<SignInManager<User>>(userManager.Object,
                Mock.Of<Microsoft.AspNetCore.Http.IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(), null, null, null, null);
            signInManager.Setup(m => m.CheckPasswordSignInAsync(user, It.IsAny<string>(), false)).ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns("test_secret_key_1234567890123456");
            mockConfig.Setup(c => c["Jwt:Issuer"]).Returns("test_issuer");
            mockConfig.Setup(c => c["Jwt:Audience"]).Returns("test_audience");
            var controller = new AuthController(userManager.Object, signInManager.Object, mockConfig.Object);
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
