namespace MongoDB.Interfaces.Infrastructure.Settings
{
    public interface IMongoDBSettings
    {
        string TestsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
