using BusinessAccess;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
       IBoardGamesRepository boardGamesRepository;
        public VisitorController(IBoardGamesRepository _boardGamesRepository)
        {
            boardGamesRepository = _boardGamesRepository;
        }

        // GET: api/Visitor
        [HttpGet]
        [Route("GetGamesRatings")]
        public async Task<IActionResult> GetGamesRatingDetails()
        {
            try
            {
                return Ok(await boardGamesRepository.GetGamesRatingDetails());

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
