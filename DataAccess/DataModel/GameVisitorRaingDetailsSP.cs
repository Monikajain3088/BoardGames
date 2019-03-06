using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccess.DataModel
{
    public class GameVisitorRaingDetailsSP
    {
        [Key]
        public int GameId { get; set; }
        public string GameName { get; set; }
        public int? Rating { get; set; }
        public string VisitorName { get; set; }
    }
}
