using BusinessAccess.Model;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccess
{
    public interface IBoardGamesRepository
    {
        //visitor controller
        Task<List<GamesRating>> GetGamesRatingDetails();
        //visitor controller
        Task UpdateGameRatinng(GamesRatingDetailsSP gamesRating);

        // admin controller
        Task<List<VisitorRating>> GetVisitorGamesRatingDetails();
        // admin controller
        Task<int> AddGame(Game game);
        // admin controller
        Task<int> DeleteGame(int? gameId);

    }
}
