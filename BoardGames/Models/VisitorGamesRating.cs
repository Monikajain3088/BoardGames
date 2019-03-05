﻿using System;
using System.Collections.Generic;

namespace BoardGames.Models
{
    public partial class VisitorGamesRating
    {
        public int VisitorRatingId { get; set; }
        public int VisitorId { get; set; }
        public int GameId { get; set; }
        public int Rating { get; set; }
        public DateTime ModifiedOn { get; set; }

        public virtual Game Game { get; set; }
        public virtual Visitor Visitor { get; set; }
    }
}
