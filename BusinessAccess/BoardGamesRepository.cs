using BusinessAccess.Model;
using DataAccessr;
using DataAccess.DataModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessAccess
{
    public class BoardGamesRepository: IBoardGamesRepository
    {
        BoardGamesContext _Context;
        public BoardGamesRepository(BoardGamesContext _db)
        {
            _Context = _db;
        }
        public async Task<List<GamesRating>> GetGamesRatingDetails()
        {
            try
            {
                    return await _Context.GamesRatingDetailsSP
                            .FromSql("Exec dbo.[GetGamesAverageRating]")
                            .Select(x => new GamesRating
                            {
                                GameId = x.GameId,
                                GameName = x.GameName,
                                AverageRating = x.AverageRating,
                                Rating= x.Rating
                            }).ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<GamesRating>();
            }
        }

        //
        public async Task<List<VisitorRating>> GetVisitorGamesRatingDetails()
        {
            try
            {
                    return await _Context.GameVisitorRaingDetailsSP
                            .FromSql("Exec dbo.[GetVisitorGameRatingDetails]" )
                            .Select(x => new VisitorRating
                            {
                                GameId = x.GameId,
                                GameName = x.GameName,
                                Rating = x.Rating,
                                VisitorName = x.VisitorName

                            }).ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<VisitorRating>();
            }
        }

        public async Task<int> AddGame(Game game)
        {

            if (_Context != null)
            {
                await _Context.Game.AddAsync(game);
                await _Context.SaveChangesAsync();

                return game.GameId;
            }

            return 0;
        }

        public async Task<int> DeleteGame(int? gameId)
        {
            int result = 0;
            if (_Context != null)
            {
                //Find the game for specific game id
                var game = await _Context.Game.FirstOrDefaultAsync(x => x.GameId == gameId);

                if (game != null)
                {
                    //Delete that game
                    _Context.Game.Remove(game);

                    //Commit the transaction
                    result = await _Context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }

        public async Task UpdateGameRatinng(GamesRatingDetailsSP gamesRating)
        {
            if (_Context != null)
            {
                //Delete that post
                _Context.GamesRatingDetailsSP.Update(gamesRating);

                //Commit the transaction
                await _Context.SaveChangesAsync();
            }
        }
    }
}
