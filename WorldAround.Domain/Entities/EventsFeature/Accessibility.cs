﻿using WorldAround.Domain.Enums;

namespace WorldAround.Domain.Entities;

public class Accessibility
{
    public AccessibilityProfile Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<Event> Events { get; set; }
}
