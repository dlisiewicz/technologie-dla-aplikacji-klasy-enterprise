import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Topping = {
  toppingId: number;
  name: string;
};

const EditToppingForm: React.FC<{ topping: Topping, onFormSubmit: () => void }> = ({ topping, onFormSubmit }) => {
    const [name, setName] = useState(topping.name);

  useEffect(() => {
    setName(topping.name);
  }, [topping]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.put(`https://localhost:7033/api/Topping/${topping.toppingId}`, { name });
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Name:
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Update Topping
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditToppingForm;