using BusinessAccess;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IBoardGamesRepository boardGamesRepository;
        public AdminController(IBoardGamesRepository _boardGamesRepository)
        {
            boardGamesRepository = _boardGamesRepository;
        }
        // GET: api/Admin
        [HttpGet]
        [Route("GamesVisitorRatings")]
        public async Task<IActionResult> GetVisitorGamesRatingDetails()
        {
            try
            {
                return Ok(await boardGamesRepository.GetVisitorGamesRatingDetails());

            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: api/Admin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
