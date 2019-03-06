using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessAccess.Model
{
   public class VisitorRating: GamesRating
    {
        public int? Rating { get; set; }
       // public int VisitorCount { get; set; }
        public string VisitorName { get; set; }
    }
}
