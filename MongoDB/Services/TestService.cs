using MongoDB.Interfaces.Repositories;
using MongoDB.Interfaces.Services;
using MongoDB.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoDB.Services
{
    public class TestService : ITestService
    {
        private readonly IMongoRepository<Test> _testRepository;

        public TestService(IMongoRepository<Test> testRepository)
        {
            _testRepository = testRepository;
        }

        public async Task CreateTestAsync(Test test)
        {
            await _testRepository.InsertOneAsync(test);
        }

        public async Task DeleteTestByIdAsync(string id)
        {
            await _testRepository.DeleteByIdAsync(id);
        }

        public async Task<IEnumerable<Test>> GetAllTests()
        {
            return await _testRepository.FilterByAsync(_ => true);
        }

        public async Task<Test> GetTestByIdAsync(string id)
        {
            return await _testRepository.FindByIdAsync(id);
        }

        public async Task UpdateTestAsync(Test test)
        {
            await _testRepository.ReplaceOneAsync(test);
        }
    }
}
