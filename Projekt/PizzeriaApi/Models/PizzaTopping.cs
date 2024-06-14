using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PizzeriaApi.Models;

namespace PizzeriaApi.Models{
public class PizzaTopping
{
    public int PizzaId { get; set; }
    public Pizza Pizza { get; set; }

    public int ToppingId { get; set; }
    public Topping Topping { get; set; }
}
}
