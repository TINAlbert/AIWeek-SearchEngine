using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Moq;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Models;
using SearchServiceEngine.Repositories;
using SearchServiceEngine.Services;
using Xunit;

namespace SearchServiceEngine.Tests
{
    public class ContactServiceTests
    {
        private readonly Mock<IContactRepository> _repoMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly ContactService _service;

        public ContactServiceTests()
        {
            _repoMock = new Mock<IContactRepository>();
            _mapperMock = new Mock<IMapper>();
            _service = new ContactService(_repoMock.Object, _mapperMock.Object);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsContacts()
        {
            var contacts = new List<Contact> { new Contact { Id = 1, FirstName = "Test" } };
            var contactDtos = new List<ContactDto> { new ContactDto { Id = 1, FirstName = "Test" } };
            _repoMock.Setup(r => r.GetAllAsync(null, 1, 10)).ReturnsAsync(contacts);
            _mapperMock.Setup(m => m.Map<IEnumerable<ContactDto>>(contacts)).Returns(contactDtos);

            var result = await _service.GetAllAsync(null, 1, 10);

            Assert.Equal(contactDtos, result);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsContact_WhenExists()
        {
            var contact = new Contact { Id = 1, FirstName = "Test" };
            var contactDto = new ContactDto { Id = 1, FirstName = "Test" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(contact);
            _mapperMock.Setup(m => m.Map<ContactDto>(contact)).Returns(contactDto);

            var result = await _service.GetByIdAsync(1);

            Assert.Equal(contactDto, result);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsNull_WhenNotExists()
        {
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Contact)null);

            var result = await _service.GetByIdAsync(1);

            Assert.Null(result);
        }

        [Fact]
        public async Task CreateAsync_CreatesContact()
        {
            var dto = new ContactCreateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var contact = new Contact { Id = 1, FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var contactDto = new ContactDto { Id = 1, FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _mapperMock.Setup(m => m.Map<Contact>(dto)).Returns(contact);
            _repoMock.Setup(r => r.CreateAsync(contact)).ReturnsAsync(contact);
            _mapperMock.Setup(m => m.Map<ContactDto>(contact)).Returns(contactDto);

            var result = await _service.CreateAsync(dto);

            Assert.Equal(contactDto, result);
        }

        [Fact]
        public async Task UpdateAsync_ReturnsTrue_WhenContactExists()
        {
            var dto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var contact = new Contact { Id = 1, FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(contact);
            _repoMock.Setup(r => r.UpdateAsync(contact)).ReturnsAsync(true);
            _mapperMock.Setup(m => m.Map(dto, contact));

            var result = await _service.UpdateAsync(1, dto);

            Assert.True(result);
        }

        [Fact]
        public async Task UpdateAsync_ReturnsFalse_WhenContactNotExists()
        {
            var dto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Contact)null);

            var result = await _service.UpdateAsync(1, dto);

            Assert.False(result);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsTrue_WhenContactExists()
        {
            _repoMock.Setup(r => r.DeleteAsync(1)).ReturnsAsync(true);

            var result = await _service.DeleteAsync(1);

            Assert.True(result);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsFalse_WhenContactNotExists()
        {
            _repoMock.Setup(r => r.DeleteAsync(1)).ReturnsAsync(false);

            var result = await _service.DeleteAsync(1);

            Assert.False(result);
        }

        [Fact]
        public async Task GetAllAsync_ThrowsException_WhenRepositoryFails()
        {
            _repoMock.Setup(r => r.GetAllAsync(null, 1, 10)).ThrowsAsync(new System.Exception("DB error"));
            await Assert.ThrowsAsync<System.Exception>(() => _service.GetAllAsync(null, 1, 10));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public async Task GetByIdAsync_ReturnsNull_WhenIdIsInvalid(int invalidId)
        {
            var result = await _service.GetByIdAsync(invalidId);
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateAsync_ReturnsNull_WhenRepositoryReturnsNull()
        {
            // Arrange
            var contactCreateDto = new ContactCreateDto { FirstName = "Test", LastName = "User", Email = "test@test.com" };
            _repoMock.Setup(r => r.CreateAsync(It.IsAny<Contact>())).ReturnsAsync((Contact?)null);
            _mapperMock.Setup(m => m.Map<Contact>(contactCreateDto)).Returns(new Contact());
            // Act
            var result = await _service.CreateAsync(contactCreateDto);
            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateAsync_ThrowsException_WhenRepositoryFails()
        {
            var dto = new ContactCreateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _mapperMock.Setup(m => m.Map<Contact>(dto)).Returns(new Contact());
            _repoMock.Setup(r => r.CreateAsync(It.IsAny<Contact>())).ThrowsAsync(new System.Exception("DB error"));
            await Assert.ThrowsAsync<System.Exception>(() => _service.CreateAsync(dto));
        }

        [Fact]
        public async Task CreateAsync_ThrowsException_WhenMappingFails()
        {
            // Arrange
            var contactCreateDto = new ContactCreateDto { FirstName = null!, LastName = null!, Email = null! };
            _mapperMock.Setup(m => m.Map<Contact>(contactCreateDto)).Throws<ArgumentNullException>();
            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.CreateAsync(contactCreateDto));
        }

        [Fact]
        public async Task UpdateAsync_ThrowsException_WhenRepositoryFails()
        {
            var dto = new ContactUpdateDto { FirstName = "Test", LastName = "User", Email = "test@a.com" };
            var contact = new Contact { Id = 1, FirstName = "Test", LastName = "User", Email = "test@a.com" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(contact);
            _mapperMock.Setup(m => m.Map(dto, contact));
            _repoMock.Setup(r => r.UpdateAsync(contact)).ThrowsAsync(new System.Exception("DB error"));
            await Assert.ThrowsAsync<System.Exception>(() => _service.UpdateAsync(1, dto));
        }

        [Fact]
        public async Task DeleteAsync_ThrowsException_WhenRepositoryFails()
        {
            _repoMock.Setup(r => r.DeleteAsync(1)).ThrowsAsync(new System.Exception("DB error"));
            await Assert.ThrowsAsync<System.Exception>(() => _service.DeleteAsync(1));
        }
    }
}
