﻿using BusinessAccess.Model;
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
                            .FromSql("Exec dbo.[GetVisitorGameRatingDetails]").GroupBy(x => x.GameId)
                            .Select(y => new VisitorRating()
                            {
                                GameId = y.Key,
                                GameName = y.Select(x => x.GameName).FirstOrDefault(),
                                VisitorCount = y.Select(x => string.IsNullOrEmpty(x.VisitorName)).Count() == 1? 0: y.Select(x => x.VisitorName).Count(),
                                Visitors = y.Select( z=>
                                new VisitorInfo()
                                {
                                    VisitorName = z.VisitorName,
                                    VisitorRating = z.Rating
                                }
                                 ).ToList()
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
                game.IsDeleted = false;
                await _Context.Game.AddAsync(game);
                await _Context.SaveChangesAsync();
                return 1;
            }
            return 0;
        }

        //Admin: Function to Delete the Game
        public async Task<int> DeleteGame(int gameId)
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
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<GamesRating>> SaveUserGameRating (VistorRatingUpdate vistorRatingUpdate)
        {
            try
            {
                int VisitorId = 0;
                int VisitorGameRatingId = 0;
                string successMessage = string.Empty;
                //Check New User exist in Databae ?
                
                IQueryable<Visitor> visitor = _Context.Visitor.Where(x => string.Equals(x.EmailId, vistorRatingUpdate.VisitorInfo.EmailId.Trim())
                && string.Equals(x.Fname, vistorRatingUpdate.VisitorInfo.Fname)
                && string.Equals(x.Lname, vistorRatingUpdate.VisitorInfo.LName));
                if( visitor !=null && visitor.Count()>0)
                {
                    Parallel.ForEach(vistorRatingUpdate.gamesRatings, gameRating =>
                    {
                        IQueryable<VisitorGamesRating> visitorGamesRating = _Context.VisitorGamesRating.Where(x => x.GameId == gameRating.GameId && x.VisitorId == visitor.Select(y => y.VisitorId).FirstOrDefault());
                        if (visitorGamesRating != null && visitorGamesRating.Count() > 0)
                        {
                           /// Visitor already has given rating angaist this game;
                       }
                        else
                        {
                            VisitorGamesRating visitorGamesRatings = new VisitorGamesRating()
                            {
                                VisitorId = visitor.Select(y => y.VisitorId).FirstOrDefault(),
                                GameId = gameRating.GameId,
                                Rating = gameRating.Rating
                            };
                            _Context.VisitorGamesRating.Add(visitorGamesRatings);
                            _Context.SaveChanges();
                        }
                    });

                }
                else
                {
                    var newVisitor = new Visitor()
                    {
                        EmailId = vistorRatingUpdate.VisitorInfo.EmailId,
                        Fname = vistorRatingUpdate.VisitorInfo.Fname,
                        Lname = vistorRatingUpdate.VisitorInfo.LName,
                    };
                    _Context.Visitor.Add(newVisitor);
                    _Context.SaveChanges();
                    VisitorId = newVisitor.VisitorId;

                    if(VisitorId > 0)
                    {
                        List<VisitorGamesRating> visitorGamesRatings = vistorRatingUpdate.gamesRatings.Select(x => new VisitorGamesRating()
                        {
                            VisitorId=VisitorId,
                            GameId=x.GameId,
                            Rating=x.Rating

                        }).ToList();

                        _Context.VisitorGamesRating.AddRange(visitorGamesRatings);
                        _Context.SaveChanges();

                    }
                }

                return  new List<GamesRating>();
            }            
            catch (Exception ex)
            {
                return new List<GamesRating>();
            }
        }


    }
}
