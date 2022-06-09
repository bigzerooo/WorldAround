﻿using WorldAround.Domain.Models.Trips;

namespace WorldAround.Domain.Models.Events;

public class EventDetailsModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public GetTripsModel Trips { get; set; }
}
