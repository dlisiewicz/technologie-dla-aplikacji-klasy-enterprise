import React, { useState } from 'react';
import axios from 'axios';

interface Pizza {
    pizzaId: any;
    name: string;
    priceSmall: number;
    priceMedium: number;
    priceLarge: number;
    doughType: string;
    toppings: Topping[];
  }
  
  interface Topping {
    toppingId: number;
    name: string;
  }

  
const EditPizzaForm = ({ pizza, toppings, onFormSubmit}: { pizza: Pizza, toppings: Topping[], onFormSubmit: () => void }) => {
  const [name, setName] = useState(pizza.name);
  const [priceSmall, setPriceSmall] = useState(pizza.priceSmall);
  const [priceMedium, setPriceMedium] = useState(pizza.priceMedium);
  const [priceLarge, setPriceLarge] = useState(pizza.priceLarge);
  const [doughType, setDoughType] = useState(pizza.doughType);
  const [selectedToppings, setSelectedToppings] = useState(pizza.toppings.map(t => t.toppingId));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedPizza = {
      name,
      priceSmall,
      priceMedium,
      priceLarge,
      doughType,
      toppings: pizza.toppings,
    };

    axios.put(`https://localhost:7033/api/Pizza/${pizza.pizzaId}`, updatedPizza)
      .then(response => {
        console.log(response);
        onFormSubmit();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToppingChange = (toppingId: number) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter(id => id !== toppingId));
      axios.delete(`https://localhost:7033/api/PizzaTopping/${pizza.pizzaId}/${toppingId}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
      axios.post('https://localhost:7033/api/PizzaTopping', { PizzaId: pizza.pizzaId, ToppingId: toppingId })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <form className="space-y-4"onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Small Price</label>
        <input
          type="number"
          value={priceSmall}
          onChange={(e) => setPriceSmall(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Medium Price</label>
        <input
          type="number"
          value={priceMedium}
          onChange={(e) => setPriceMedium(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Large Price</label>
        <input
          type="number"
          value={priceLarge}
          onChange={(e) => setPriceLarge(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dough Type</label>
        <input
          type="text"
          value={doughType}
          onChange={(e) => setDoughType(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Toppings</label>
        {toppings.map(topping => (
          <div key={topping.toppingId} className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedToppings.includes(topping.toppingId)}
                onChange={() => handleToppingChange(topping.toppingId)}
                className="form-checkbox rounded text-indigo-600"
              />
              <span className="ml-2">{topping.name}</span>
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500">Submit</button>
    </form>
  );
};

export default EditPizzaForm;