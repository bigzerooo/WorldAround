using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace MongoDB.Interfaces.Models
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(Bson.BsonType.String)]
        ObjectId Id { get; set; }

        DateTime CreatedAt { get; }
    }
}
