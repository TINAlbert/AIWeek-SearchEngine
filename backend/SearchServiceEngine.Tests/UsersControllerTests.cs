using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Moq;
using SearchServiceEngine.Controllers;
using SearchServiceEngine.Data;
using SearchServiceEngine.Models;
using SearchServiceEngine.DTOs;
using Xunit;
using Microsoft.EntityFrameworkCore;

namespace SearchServiceEngine.Tests
{
    public class UsersControllerTests
    {
        private readonly Mock<AppDbContext> _dbContextMock;
        private readonly UsersController _controller;
        private readonly Mock<UserManager<User>> _userManagerMock;

        public UsersControllerTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().Options;
            _dbContextMock = new Mock<AppDbContext>(options);
            // Usar mocks válidos para todos los argumentos requeridos por UserManager<User>
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
            _controller = new UsersController(_dbContextMock.Object);
        }

        [Fact]
        public void GetAll_ReturnsOk_WithUsers()
        {
            // Arrange
            var users = new List<User> { new User { Id = "1", UserName = "admin", Role = "Admin" } };
            var usersDbSet = GetQueryableMockDbSet(users);
            _dbContextMock.Setup(x => x.Users).Returns(usersDbSet.Object);

            // Act
            var result = _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var value = Assert.IsAssignableFrom<IEnumerable<object>>(okResult.Value);
        }

        [Fact]
        public async Task Create_ReturnsOk_WhenUserCreated()
        {
            var dto = new UserCreateDto { UserName = "newuser", Password = "Password1", Role = "User" };
            _userManagerMock.Setup(x => x.FindByNameAsync(dto.UserName)).ReturnsAsync((User)null);
            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), dto.Password)).ReturnsAsync(IdentityResult.Success);

            var result = await _controller.Create(dto, _userManagerMock.Object);

            var okResult = Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsConflict_WhenUserExists()
        {
            var dto = new UserCreateDto { UserName = "admin", Password = "Password1", Role = "Admin" };
            _userManagerMock.Setup(x => x.FindByNameAsync(dto.UserName)).ReturnsAsync(new User { UserName = dto.UserName });

            var result = await _controller.Create(dto, _userManagerMock.Object);

            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenValidationFails()
        {
            var dto = new UserCreateDto { UserName = "", Password = "", Role = "" };
            var result = await _controller.Create(dto, _userManagerMock.Object);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Helper para simular DbSet<User> en memoria
        private static Mock<DbSet<T>> GetQueryableMockDbSet<T>(List<T> sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();
            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            return dbSet;
        }
    }
}
