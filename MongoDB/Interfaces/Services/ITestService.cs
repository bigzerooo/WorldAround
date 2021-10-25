using MongoDB.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoDB.Interfaces.Services
{
    public interface ITestService
    {
        Task<Test> GetTestByIdAsync(string id);
        Task<IEnumerable<Test>> GetAllTests();
        Task CreateTestAsync(Test test);
        Task UpdateTestAsync(Test test);
        Task DeleteTestByIdAsync(string id);
    }
}
