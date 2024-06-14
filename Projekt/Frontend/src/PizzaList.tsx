import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import EditPizzaForm from './components/editPizzaForm.tsx';
import DeleteConfirmationModal from './components/DeleteConfirmationPizzaModal.tsx';
import AddPizzaForm from './components/AddPizzaForm.tsx';
import PizzaDetails from './components/PizzaDetails.tsx';

type Topping = {
  toppingId: number;
  name: string;
};

type Pizza = {
  pizzaId: number;
  name: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  doughType: string;
  toppings: Topping[];
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
  },
};

const PizzaList: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPizzaId, setSelectedPizzaId] = useState<number | null>(null)

  const fetchPizzas = async () => {
    const result = await axios('https://localhost:7033/api/Pizza');
    setPizzas(result.data);
  };

  useEffect(() => {
    const fetchToppings = async () => {
      const result = await axios('https://localhost:7033/api/Topping');
      setToppings(result.data);
    };

    fetchPizzas();
    fetchToppings();
  }, []);

  const openEditModal = async (pizza: Pizza) => {
    setSelectedPizza(pizza);
    const result = await axios('https://localhost:7033/api/Topping');
    setToppings(result.data);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsDeleteModalOpen(true);
  };

  const selectPizza = (pizzaId: number) => {
    setSelectedPizzaId(pizzaId);
  };

  const closePizzaDetails = () => {
    setSelectedPizzaId(null);
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setIsAddModalOpen(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Pizza
      </button>
      <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)}>
        <button onClick={() => setIsAddModalOpen(false)}>Close</button>
        <AddPizzaForm 
          toppings={toppings} 
          onPizzaAdded={() => {
            fetchPizzas();
            setIsAddModalOpen(false);
          }} 
        />
      </Modal>
      <div className="flex space-x-4">
      <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Small Price</th>
            <th className="px-4 py-2">Medium Price</th>
            <th className="px-4 py-2">Large Price</th>
            <th className="px-4 py-2">Dough Type</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => (
            <tr key={pizza.pizzaId}>
              <td className="border px-4 py-2">{pizza.name}</td>
              <td className="border px-4 py-2">{pizza.priceSmall}</td>
              <td className="border px-4 py-2">{pizza.priceMedium}</td>
              <td className="border px-4 py-2">{pizza.priceLarge}</td>
              <td className="border px-4 py-2">{pizza.doughType}</td>
              <td className="border px-4 py-2">
              <button onClick={() => openEditModal(pizza)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} style={modalStyles}>
                <button onClick={() => setIsEditModalOpen(false)}>Close</button>
                {selectedPizza && <EditPizzaForm pizza={selectedPizza} toppings={toppings} onFormSubmit={() => {
                  setIsEditModalOpen(false);
                  fetchPizzas();
                }} />}
              </Modal>
                <button onClick={() => openDeleteModal(pizza)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
                <DeleteConfirmationModal 
                  pizzaId={pizza.pizzaId} 
                  isOpen={isDeleteModalOpen} 
                  onRequestClose={() => setIsDeleteModalOpen(false)} 
                  onPizzaDeleted={fetchPizzas}
                />
                <button onClick={() => selectPizza(pizza.pizzaId)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Select
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedPizzaId && (
        <div>
          <PizzaDetails pizzaId={selectedPizzaId} />
          <button onClick={closePizzaDetails} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Close
          </button>
        </div>
      )}
    </div> 
    </div>
  );
};

export default PizzaList;