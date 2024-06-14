using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace PizzeriaApi.Models
{
public class Topping
{
    public int ToppingId { get; set; }
    public string Name { get; set; }
    public ICollection<PizzaTopping> PizzaToppings { get; set; }
}
}