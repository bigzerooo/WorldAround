using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldAround.Domain.Entities
{
    public class Pin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Trip Trip { get; set; }
        public int TripId { get; set; }
        public int SequenceNo { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
