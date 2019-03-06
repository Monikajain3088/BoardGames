using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessAccess.Model
{
  public  class GamesRating
    {
        public int GameId { get; set; }
        public string GameName { get; set; }
        public int? AverageRating { get; set; }
        public int? Rating { get; set; }
    }
}
