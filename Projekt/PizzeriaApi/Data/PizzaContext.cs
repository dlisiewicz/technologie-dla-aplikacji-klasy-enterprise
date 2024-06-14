using Microsoft.EntityFrameworkCore;
using PizzeriaApi.Models;

public class PizzaContext : DbContext
{
        public PizzaContext(DbContextOptions<PizzaContext> options)
        : base(options)
    {
    }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=mydatabase.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PizzaTopping>()
            .HasKey(pt => new { pt.PizzaId, pt.ToppingId });

        modelBuilder.Entity<PizzaTopping>()
            .HasOne(pt => pt.Topping)
            .WithMany(t => t.PizzaToppings)
            .HasForeignKey(pt => pt.ToppingId)
            .IsRequired(false);

        modelBuilder.Entity<PizzaTopping>()
            .HasOne(pt => pt.Pizza)
            .WithMany(p => p.PizzaToppings)
            .HasForeignKey(pt => pt.PizzaId)
            .IsRequired(false);
    }
}