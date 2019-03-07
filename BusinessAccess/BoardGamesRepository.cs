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
        private readonly BoardGamesContext _Context;
        public BoardGamesRepository(BoardGamesContext _db)
        {
            _Context = _db;
        }

        // Visitor: Function Get Games and its Average Ratings given by each visitor
        public async Task<List<GamesRating>> GetGamesAverageRatings()
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
                                Rating = x.Rating
                            }).ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<GamesRating>();
            }
        }

        // Visitor: Function to Update the Visitot Rating 
        public async Task UpdateVisitorRatinngs(Visitor visitorRating)
        {
            if (_Context != null)
            {
                _Context.Visitor.Update(visitorRating);
                await _Context.SaveChangesAsync();
            }
        }

        //Admin: Function to Get Game and its visitor count. Also on click of visitor it gives, Visitor Name and individual rating against each Game.
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

        //Admin: Function to add the Game 
        public async Task<int> AddGame(Game game)
        {

            if (_Context != null)
            {
                
                await _Context.Game.AddAsync(game);
                await _Context.SaveChangesAsync();
                return 1;
            }
            return 0;
        }

        //Admin: Function to Delete the Game
        public async Task<int> DeleteGame(int? gameId)
        {
            int result = 0;
            if (_Context != null)
            {
                //Find the game for specific game id
                var game = await _Context.Game.FirstOrDefaultAsync(x => x.GameId == gameId);
                if (game != null)
                {
                    //Delete that game // _Context.Game.Remove(game); (Hard Delete - not fesable)
                    game.IsDeleted = true;
                    _Context.Game.Update(game);
                    result = await _Context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }

        // Auth: Function to check login details is valid or not
        public bool IsValidUser(LoginView userCredetials)
        {
            try
            {
               // if (_Context != null)
                    return _Context.User.Any(x => (string.Equals(x.LoginId, userCredetials.LoginId) && (string.Equals(x.Password, userCredetials.Password))));
 
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


    }
}
