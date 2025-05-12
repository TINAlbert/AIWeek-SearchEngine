using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using SearchServiceEngine.Controllers;
using SearchServiceEngine.Data;
using SearchServiceEngine.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SearchServiceEngine.Tests
{
    public class AuthControllerTests
    {
        [Fact]
        public void Login_ReturnsUnauthorized_WhenUserNotFound()
        {
            // Arrange: usar EF Core InMemory
            var options = new Microsoft.EntityFrameworkCore.DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb1")
                .Options;
            using var context = new AppDbContext(options);
            // No agregamos usuarios
            var mockConfig = new Mock<IConfiguration>();
            var controller = new AuthController(context, mockConfig.Object);
            var loginUser = new User { Username = "notfound", Password = "wrong" };

            // Act
            var result = controller.Login(loginUser);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void Login_ReturnsToken_WhenUserExistsAndPasswordMatches()
        {
            // Arrange: usar EF Core InMemory
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb2")
                .Options;
            using var context = new AppDbContext(options);
            context.Users.Add(new User { Username = "admin", Password = "1234", Role = "Admin" });
            context.SaveChanges();

            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns("test_secret_key_1234567890123456");
            mockConfig.Setup(c => c["Jwt:Issuer"]).Returns("test_issuer");
            mockConfig.Setup(c => c["Jwt:Audience"]).Returns("test_audience");
            var controller = new AuthController(context, mockConfig.Object);
            var loginUser = new User { Username = "admin", Password = "1234" };

            // Act
            var result = controller.Login(loginUser);

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
