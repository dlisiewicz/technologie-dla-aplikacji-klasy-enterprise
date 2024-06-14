import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import EditToppingForm from './EditToppingForm.tsx';
import DeleteConfirmationModal from './DeleteConfirmationToppingModal.tsx';
import AddToppingForm from './AddToppingForm.tsx';

type Topping = {
  toppingId: number;
  name: string;
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

const ToppingList: React.FC = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openModalToppingId, setOpenModalToppingId] = useState<number | null>(null);

  const fetchToppings = async () => {
    const result = await axios('https://localhost:7033/api/Topping');
    setToppings(result.data);
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  const openEditModal = (topping: Topping) => {
    setSelectedTopping(topping);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (topping: Topping) => {
    setSelectedTopping(topping);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setIsAddModalOpen(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Topping
      </button>
      <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)}>
        <button onClick={() => setIsAddModalOpen(false)}>Close</button>
        <AddToppingForm 
          onToppingAdded={() => {
            fetchToppings();
            setIsAddModalOpen(false);
          }} 
        />
      </Modal>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {toppings.map((topping) => (
            <tr key={topping.toppingId}>
              <td className="border px-4 py-2">{topping.name}</td>
              <td className="border px-4 py-2">
              <button onClick={() => openEditModal(topping)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Edit
                </button>
                <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} style={modalStyles}>
                <button onClick={() => setIsEditModalOpen(false)}>Close</button>
                {selectedTopping && <EditToppingForm topping={selectedTopping} onFormSubmit={() => {
                    setIsEditModalOpen(false);
                    fetchToppings();
                }} />}
                </Modal>
                <button onClick={() => setOpenModalToppingId(topping.toppingId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
                <DeleteConfirmationModal 
                    toppingId={topping.toppingId} 
                    isOpen={openModalToppingId === topping.toppingId} 
                    onRequestClose={() => setOpenModalToppingId(null)} 
                    onToppingDeleted={fetchToppings}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToppingList;