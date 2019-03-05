using System;
using System.Collections.Generic;

namespace BoardGames.Models
{
    public partial class Visitor
    {
        public Visitor()
        {
            VisitorGamesRating = new HashSet<VisitorGamesRating>();
        }

        public int VisitorId { get; set; }
        public string Fname { get; set; }
        public string EmailId { get; set; }
        public string Lname { get; set; }

        public virtual ICollection<VisitorGamesRating> VisitorGamesRating { get; set; }
    }
}
