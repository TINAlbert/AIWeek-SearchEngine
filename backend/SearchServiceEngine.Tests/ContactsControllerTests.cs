using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SearchServiceEngine.Controllers;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Services;
using Xunit;

namespace SearchServiceEngine.Tests
{
    public class ContactsControllerTests
    {
        private readonly Mock<IContactService> _serviceMock;
        private readonly ContactsController _controller;

        public ContactsControllerTests()
        {
            _serviceMock = new Mock<IContactService>();
            _controller = new ContactsController(_serviceMock.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult_WithContacts()
        {
            // Arrange
            var contacts = new List<ContactDto> { new ContactDto { Id = 1, FirstName = "Test", LastName = "User" } };
            _serviceMock.Setup(s => s.GetAllAsync(null, 1, 10)).ReturnsAsync(contacts);

            // Act
            var result = await _controller.GetAll(null, 1, 10);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(contacts, okResult.Value);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult_WhenNoContacts()
        {
            _serviceMock.Setup(s => s.GetAllAsync(null, 1, 10)).ReturnsAsync(new List<ContactDto>());
            var result = await _controller.GetAll(null, 1, 10);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var value = Assert.IsAssignableFrom<IEnumerable<ContactDto>>(okResult.Value);
            Assert.Empty(value);
        }

        [Fact]
        public async Task GetById_ReturnsOk_WhenContactExists()
        {
            var contact = new ContactDto { Id = 1, FirstName = "Test", LastName = "User" };
            _serviceMock.Setup(s => s.GetByIdAsync(1)).ReturnsAsync(contact);

            var result = await _controller.GetById(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(contact, okResult.Value);
        }

        [Fact]
        public async Task GetById_ReturnsNotFound_WhenContactDoesNotExist()
        {
            _serviceMock.Setup(s => s.GetByIdAsync(1)).ReturnsAsync((ContactDto?)null);

            var result = await _controller.GetById(1);

            Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public async Task GetById_ReturnsBadRequest_WhenIdIsInvalid(int invalidId)
        {
            var result = await _controller.GetById(invalidId);
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction_WithContact()
        {
            var createDto = new ContactCreateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var createdDto = new ContactDto { Id = 1, FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _serviceMock.Setup(s => s.CreateAsync(createDto)).ReturnsAsync(createdDto);

            var result = await _controller.Create(createDto);

            var createdAt = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(createdDto, createdAt.Value);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenServiceReturnsNull()
        {
            // Arrange
            _serviceMock.Setup(s => s.CreateAsync(It.IsAny<ContactCreateDto>())).ReturnsAsync((ContactDto?)null);
            // Act
            var result = await _controller.Create(new ContactCreateDto());
            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsBadRequest_WhenInputIsNull()
        {
            var result = await _controller.Create(null);
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Create_ReturnsServerError_WhenServiceThrowsException()
        {
            var createDto = new ContactCreateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _serviceMock.Setup(s => s.CreateAsync(createDto)).ThrowsAsync(new System.Exception("DB error"));
            var result = await _controller.Create(createDto);
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Fact]
        public async Task Update_ReturnsNoContent_WhenSuccessful()
        {
            var updateDto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _serviceMock.Setup(s => s.UpdateAsync(1, updateDto)).ReturnsAsync(true);

            var result = await _controller.Update(1, updateDto);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFound_WhenContactDoesNotExist()
        {
            var updateDto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _serviceMock.Setup(s => s.UpdateAsync(1, updateDto)).ReturnsAsync(false);

            var result = await _controller.Update(1, updateDto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsServerError_WhenServiceThrowsException()
        {
            var updateDto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _serviceMock.Setup(s => s.UpdateAsync(1, updateDto)).ThrowsAsync(new System.Exception("DB error"));
            var result = await _controller.Update(1, updateDto);
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public async Task Update_ReturnsBadRequest_WhenIdIsInvalid(int invalidId)
        {
            var updateDto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var result = await _controller.Update(invalidId, updateDto);
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsBadRequest_WhenInputIsNull()
        {
            var result = await _controller.Update(1, null);
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent_WhenSuccessful()
        {
            _serviceMock.Setup(s => s.DeleteAsync(1)).ReturnsAsync(true);

            var result = await _controller.Delete(1);

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNotFound_WhenContactDoesNotExist()
        {
            _serviceMock.Setup(s => s.DeleteAsync(1)).ReturnsAsync(false);

            var result = await _controller.Delete(1);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsServerError_WhenServiceThrowsException()
        {
            _serviceMock.Setup(s => s.DeleteAsync(1)).ThrowsAsync(new System.Exception("DB error"));
            var result = await _controller.Delete(1);
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, objectResult.StatusCode);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public async Task Delete_ReturnsBadRequest_WhenIdIsInvalid(int invalidId)
        {
            var result = await _controller.Delete(invalidId);
            Assert.IsType<BadRequestResult>(result);
        }
    }
}
