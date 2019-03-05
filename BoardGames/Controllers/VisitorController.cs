using BusinessAccess;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {

        //protected BoardGamesContext _Context { get; set; }

        //public VisitorController(BoardGamesContext boardGamesContext)
        //{
        //    this._Context = boardGamesContext;
        //}

        // GET: api/Visitor
        [HttpGet]
        [Route("GetGamesRatings")]
        public async Task<IActionResult> GetGamesRatingDetails()
        {
            try
            {
                return Ok(await GamesRatingCollection.GetGamesRatingDetails());

            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: api/Visitor
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }
    }
}
