using MongoDB.Infrastructure.Attributes;

namespace MongoDB.Models
{
    [BsonCollection("Test")]
    public class Test : Document
    {
        public string TestText { get; set; }
    }
}
