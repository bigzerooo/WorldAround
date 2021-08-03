using MongoDB.Interfaces.Infrastructure.Settings;

namespace MongoDB.Infrastructure.Settings
{
    public class MongoDBSettings : IMongoDBSettings
    {
        public string TestsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
