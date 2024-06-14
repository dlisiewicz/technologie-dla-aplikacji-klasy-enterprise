using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzeriaApi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace PizzeriaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaToppingController : ControllerBase
    {
        private readonly PizzaContext _context;

        public PizzaToppingController(PizzaContext context)
        {
            _context = context;
        }

        // GET: api/PizzaTopping/5
        [HttpGet("{pizzaId}/{toppingId}")]
        public async Task<ActionResult<PizzaToppingDTO>> GetPizzaTopping(int pizzaId, int toppingId)
        {
            var pizzaTopping = await _context.PizzaToppings
                .Where(pt => pt.PizzaId == pizzaId && pt.ToppingId == toppingId)
                .Select(pt => new PizzaToppingDTO
                {
                    PizzaId = pt.PizzaId,
                    ToppingId = pt.ToppingId
                })
                .FirstOrDefaultAsync();

            if (pizzaTopping == null)
            {
                return NotFound();
            }

            return pizzaTopping;
        }

        // POST: api/PizzaTopping
        [HttpPost]
        public async Task<ActionResult<PizzaToppingDTO>> PostPizzaTopping(PizzaToppingDTO pizzaToppingDto)
        {
            var pizzaTopping = new PizzaTopping
            {
                PizzaId = pizzaToppingDto.PizzaId,
                ToppingId = pizzaToppingDto.ToppingId
            };

            _context.PizzaToppings.Add(pizzaTopping);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPizzaTopping), new { pizzaId = pizzaTopping.PizzaId, toppingId = pizzaTopping.ToppingId }, pizzaToppingDto);
        }

        // DELETE: api/PizzaTopping/5
        [HttpDelete("{pizzaId}/{toppingId}")]
        public async Task<ActionResult<PizzaToppingDTO>> DeletePizzaTopping(int pizzaId, int toppingId)
        {
            var pizzaTopping = await _context.PizzaToppings.FindAsync(pizzaId, toppingId);
            if (pizzaTopping == null)
            {
                return NotFound();
            }

            var pizzaToppingDto = new PizzaToppingDTO
            {
                PizzaId = pizzaTopping.PizzaId,
                ToppingId = pizzaTopping.ToppingId
            };

            _context.PizzaToppings.Remove(pizzaTopping);
            await _context.SaveChangesAsync();

            return pizzaToppingDto;
        }
    }
}