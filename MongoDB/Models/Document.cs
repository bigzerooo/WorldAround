using MongoDB.Bson;
using MongoDB.Interfaces.Models;
using System;

namespace MongoDB.Models
{
    public abstract class Document : IDocument
    {
        public ObjectId Id { get; set; }
        public DateTime CreatedAt => Id.CreationTime;
    }
}
