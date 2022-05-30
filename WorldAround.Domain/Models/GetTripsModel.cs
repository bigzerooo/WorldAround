﻿namespace WorldAround.Domain.Models;

public class GetTripsModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<PinModel> Pins { get; set; }
    public List<CommentModel> Comments { get; set; }

    public DateTime CreateDate { get; set; }
}