import React, { useState } from 'react';
import axios from 'axios';

interface Topping {
  toppingId: number;
  name: string;
}

interface AddPizzaFormProps {
  toppings: Topping[];
  onPizzaAdded: () => void;
}

const AddPizzaForm: React.FC<AddPizzaFormProps> = ({ toppings, onPizzaAdded }) => {
  const [name, setName] = useState('');
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceMedium, setPriceMedium] = useState(0);
  const [priceLarge, setPriceLarge] = useState(0);
  const [doughType, setDoughType] = useState('');
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);

  const handleToppingChange = (toppingId: number) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter(id => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://localhost:7033/api/Pizza', { 
        name, 
        priceSmall, 
        priceMedium, 
        priceLarge, 
        doughType, 
        toppings: [] 
      });
  
      console.log(response.data);

      const pizzaId = response.data.pizzaId; 
  
      for (const toppingId of selectedToppings) {
        try {
            await axios.post('https://localhost:7033/api/PizzaTopping', {
                pizzaId: pizzaId,
                toppingId: toppingId
                });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to add topping:', error.response?.data);
              } else {
                console.error('An unknown error occurred:', error);
              }
        }
      }
  
      onPizzaAdded();
    } catch (error) {
      console.error("Failed to add pizza", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Pizza Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block">Small Pizza Price:</label>
        <input type="number" value={priceSmall} onChange={(e) => setPriceSmall(Number(e.target.value))} className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block">Medium Pizza Price:</label>
        <input type="number" value={priceMedium} onChange={(e) => setPriceMedium(Number(e.target.value))} className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block">Large Pizza Price:</label>
        <input type="number" value={priceLarge} onChange={(e) => setPriceLarge(Number(e.target.value))} className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block">Dough Type:</label>
        <input type="text" value={doughType} onChange={(e) => setDoughType(e.target.value)} className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block">Toppings:</label>
        {toppings.map(topping => (
          <div key={topping.toppingId}>
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                value={topping.toppingId} 
                checked={selectedToppings.includes(topping.toppingId)} 
                onChange={() => handleToppingChange(topping.toppingId)} 
                className="mr-2"
                required={selectedToppings.length === 0}
              />
              {topping.name}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">Add Pizza</button>
    </form>
  );
};

export default AddPizzaForm;