using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PizzeriaApi.Models;

namespace PizzeriaApi.Models{
public class Pizza
{
    public int PizzaId { get; set; }
    public string Name { get; set; }
    public decimal PriceSmall { get; set; }
    public decimal PriceMedium { get; set; }
    public decimal PriceLarge { get; set; }
    public string DoughType { get; set; }
    public ICollection<PizzaTopping> PizzaToppings { get; set; }
}
}