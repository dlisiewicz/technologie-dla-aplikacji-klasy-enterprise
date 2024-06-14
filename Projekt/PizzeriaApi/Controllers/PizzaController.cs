using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzeriaApi.Models;

namespace PizzeriaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaContext _context;

        public PizzaController(PizzaContext context)
        {
            _context = context;
        }

        // GET: api/Pizza
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PizzaDTO>>> GetPizzas()
        {
            return await _context.Pizzas
                .Include(p => p.PizzaToppings)
                    .ThenInclude(pt => pt.Topping)
                .Select(p => new PizzaDTO
                {
                    PizzaId = p.PizzaId,
                    Name = p.Name,
                    PriceSmall = p.PriceSmall,
                    PriceMedium = p.PriceMedium,
                    PriceLarge = p.PriceLarge,
                    DoughType = p.DoughType,
                    Toppings = p.PizzaToppings.Select(pt => new ToppingDTO
                    {
                        ToppingId = pt.Topping.ToppingId,
                        Name = pt.Topping.Name
                    }).ToList()
                })
                .ToListAsync();
        }

        // GET: api/Pizza/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PizzaDTO>> GetPizza(int id)
        {
            var pizza = await _context.Pizzas
                .Include(p => p.PizzaToppings)
                    .ThenInclude(pt => pt.Topping)
                .Select(p => new PizzaDTO
                {
                    PizzaId = p.PizzaId,
                    Name = p.Name,
                    PriceSmall = p.PriceSmall,
                    PriceMedium = p.PriceMedium,
                    PriceLarge = p.PriceLarge,
                    DoughType = p.DoughType,
                    Toppings = p.PizzaToppings.Select(pt => new ToppingDTO
                    {
                        ToppingId = pt.Topping.ToppingId,
                        Name = pt.Topping.Name
                    }).ToList()
                })
                .FirstOrDefaultAsync(p => p.PizzaId == id);

            if (pizza == null)
            {
                return NotFound();
            }

            return pizza;
        }

        // POST: api/Pizza
        [HttpPost]
        public async Task<ActionResult<PizzaDTO>> PostPizza(PizzaDTO pizzaDTO)
        {
            var pizza = new Pizza
            {
                Name = pizzaDTO.Name,
                PriceSmall = pizzaDTO.PriceSmall,
                PriceMedium = pizzaDTO.PriceMedium,
                PriceLarge = pizzaDTO.PriceLarge,
                DoughType = pizzaDTO.DoughType
            };

            _context.Pizzas.Add(pizza);
            await _context.SaveChangesAsync();

            // Handle the Toppings field
            if (pizzaDTO.Toppings != null)
            {
                foreach (var toppingDTO in pizzaDTO.Toppings)
                {
                    var pizzaTopping = new PizzaTopping
                    {
                        PizzaId = pizza.PizzaId,
                        ToppingId = toppingDTO.ToppingId
                    };

                    _context.PizzaToppings.Add(pizzaTopping);
                }

                await _context.SaveChangesAsync();
            }
            var createdPizzaDTO = new PizzaDTO
            {
                PizzaId = pizza.PizzaId,
                Name = pizza.Name,
                PriceSmall = pizza.PriceSmall,
                PriceMedium = pizza.PriceMedium,
                PriceLarge = pizza.PriceLarge,
                DoughType = pizza.DoughType,
                Toppings = pizzaDTO.Toppings
            };

            return CreatedAtAction(nameof(GetPizza), new { id = pizza.PizzaId }, createdPizzaDTO);
        }
        // PUT: api/Pizza/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPizza(int id, PizzaDTO pizzaDTO)
        {
            var pizza = await _context.Pizzas.FindAsync(id);
            if (pizza == null)
            {
                return NotFound();
            }

            pizza.Name = pizzaDTO.Name;
            pizza.PriceSmall = pizzaDTO.PriceSmall;
            pizza.PriceMedium = pizzaDTO.PriceMedium;
            pizza.PriceLarge = pizzaDTO.PriceLarge;
            pizza.DoughType = pizzaDTO.DoughType;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PizzaExists(id))
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

        // DELETE: api/Pizza/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var pizza = await _context.Pizzas.FindAsync(id);
            if (pizza == null)
            {
                return NotFound();
            }

            var pizzaToppings = _context.PizzaToppings.Where(pt => pt.PizzaId == id);
            _context.PizzaToppings.RemoveRange(pizzaToppings);

            _context.Pizzas.Remove(pizza);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool PizzaExists(int id)
        {
            return _context.Pizzas.Any(e => e.PizzaId == id);
        }
    }
}