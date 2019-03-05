using BusinessAccess.Model;
using DataAccessr;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessAccess
{
    public static class GamesRatingCollection
    {
        public static async Task<List<GamesRating>> GetGamesRatingDetails()
        {
            try
            {
                using (BoardGamesContext _Context = new BoardGamesContext())
                {
                    return await _Context.GamesRatingDetailsSP
                            .FromSql("Exec dbo.[GetGamesAverageRating]")
                            .Select(x => new GamesRating
                            {
                                GameName = x.GameName,
                                AverageRating = x.AverageRating,
                                GameId=x.GameId
                                
                            }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                return new List<GamesRating>();
            }
        }
    }
}
