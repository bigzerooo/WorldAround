﻿using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class Message : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime CreateDate { get; set; }
    public bool IsRead { get; set; }

    public int EventId { get; set; }
    public int AuthorId { get; set; }
    public int? ReplyMessageId { get; set; }
    public int? ChatId { get; set; }

    public Event Event { get; set; }
    public Chat Chat { get; set; }
    public Message ReplyMessage { get; set; }

    public IEnumerable<Message> ReplyMessages { get; set; }
}