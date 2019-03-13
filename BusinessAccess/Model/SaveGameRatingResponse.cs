using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessAccess.Model
{
    public class SaveGameRatingResponse
    {
        public string GameName { get; set; }
        public int UserGameRating { get; set; }
        public string Message { get; set; }
    }
   
}
