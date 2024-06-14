using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzeriaApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzeriaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToppingController : ControllerBase
    {
        private readonly PizzaContext _context;

        public ToppingController(PizzaContext context)
        {
            _context = context;
        }

        // GET: api/Topping
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToppingDTO>>> GetToppings()
        {
            return await _context.Toppings
                .Select(t => new ToppingDTO
                {
                    ToppingId = t.ToppingId,
                    Name = t.Name
                })
                .ToListAsync();
        }

        // GET: api/Topping/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToppingDTO>> GetTopping(int id)
        {
            var topping = await _context.Toppings
                .Select(t => new ToppingDTO
                {
                    ToppingId = t.ToppingId,
                    Name = t.Name
                })
                .FirstOrDefaultAsync(t => t.ToppingId == id);

            if (topping == null)
            {
                return NotFound();
            }

            return topping;
        }

        // POST: api/Topping
        [HttpPost]
        public async Task<ActionResult<ToppingDTO>> PostTopping(ToppingDTO toppingDTO)
        {
            var topping = new Topping
            {
                Name = toppingDTO.Name
            };

            _context.Toppings.Add(topping);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTopping), new { id = topping.ToppingId }, toppingDTO);
        }

        // DELETE: api/Toppings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopping(int id)
        {
            var topping = await _context.Toppings.FindAsync(id);
            if (topping == null)
            {
                return NotFound();
            }

            _context.Toppings.Remove(topping);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Toppings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopping(int id, ToppingDTO toppingDTO)
        {
            var topping = await _context.Toppings.FindAsync(id);
            if (topping == null)
            {
                return NotFound();
            }

            topping.Name = toppingDTO.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToppingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ToppingExists(int id)
        {
            return _context.Toppings.Any(e => e.ToppingId == id);
        }
    }
}