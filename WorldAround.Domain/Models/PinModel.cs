﻿namespace WorldAround.Domain.Models;

public class PinModel
{
    public int SeqNo { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public double Latitude { get; set; }
    public double Longitude { get; set; }
}