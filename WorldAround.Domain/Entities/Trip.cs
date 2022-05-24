﻿namespace WorldAround.Domain.Entities;

public class Trip
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public DateTime CreateDate { get; set; }

    public List<Pin> Pins { get; set; }
}