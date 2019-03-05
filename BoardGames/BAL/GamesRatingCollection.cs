using BoardGames.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoardGames.BAL
{
    public static class GamesRatingCollection
    {
        public static async Task<List<GamesRatingDetailsSP>> GetGamesRatingDetails()
        {
            BoardGamesContext _Context = new BoardGamesContext();
            List<GamesRatingDetailsSP> obj = new List<GamesRatingDetailsSP>();
            try
            {
                obj = await _Context.GamesRatingDetailsSP
                        .FromSql("Exec dbo.[GetGamesAverageRating]")
                        .Select(x => new GamesRatingDetailsSP
                        {
                            GameName = x.GameName,
                            AverageRating = x.AverageRating
                        }).ToListAsync();
                return obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static async Task<List<Game>> GetGamesDetails()
        {

            BoardGamesContext _Context = new BoardGamesContext();
            List<Game> obj = new List<Game>();
            try
            {
                obj = await _Context.Game.ToListAsync();
                return obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
