using System;
using System.Collections.Generic;

namespace BoardGames.Models
{
    public partial class Game
    {
        public Game()
        {

            VisitorGamesRating = new HashSet<VisitorGamesRating>();
        }

        public int GameId { get; set; }
        public string GameName { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }

        public virtual ICollection<VisitorGamesRating> VisitorGamesRating { get; set; }
    }
}
