namespace PizzeriaApi.Models
{
public class PizzaDTO
{
     public int PizzaId { get; set; }
    public string Name { get; set; }
    public decimal PriceSmall { get; set; }
    public decimal PriceMedium { get; set; }
    public decimal PriceLarge { get; set; }
    public string DoughType { get; set; }
    public List<ToppingDTO> Toppings { get; set; }
}
}