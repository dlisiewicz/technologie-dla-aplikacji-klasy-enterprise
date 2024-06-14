import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PizzaDetailsProps {
  pizzaId: number;
}

interface Topping {
    toppingId: number;
    name: string;
  }

interface Pizza {
  pizzaId: number;
  name: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  doughType: string;
  toppings: Topping[];
}

const PizzaDetails: React.FC<PizzaDetailsProps> = ({ pizzaId }) => {
  const [pizza, setPizza] = useState<Pizza | null>(null);


  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(`https://localhost:7033/api/Pizza/${pizzaId}`);
        setPizza(response.data);
      } catch (error) {
        console.error('Failed to fetch pizza', error);
      }
    };

    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">{pizza.name}</h2>
      <p className="mb-2"><strong>Dough Type:</strong> {pizza.doughType}</p>
      <p className="mb-2"><strong>Small:</strong> ${pizza.priceSmall.toFixed(2)}</p>
      <p className="mb-2"><strong>Medium:</strong> ${pizza.priceMedium.toFixed(2)}</p>
      <p className="mb-2"><strong>Large:</strong> ${pizza.priceLarge.toFixed(2)}</p>
      <div>
        <strong>Toppings:</strong>
        <ul className="list-disc list-inside">
          {pizza.toppings.map((topping, index) => (
            <li key={index}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PizzaDetails;