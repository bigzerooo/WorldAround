﻿using WorldAround.Domain.Models.Paging;

namespace WorldAround.Domain.Models.Events;

public class GetEventsPageModel
{
    public IEnumerable<GetEventModel> Events { get; set; }

    public PagingModel PageInfo { get; set; }
}
