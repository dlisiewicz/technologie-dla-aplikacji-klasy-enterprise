// DeleteConfirmationModal.tsx
import axios from 'axios';
import Modal from 'react-modal';

interface DeleteConfirmationModalProps {
  pizzaId: number;
  isOpen: boolean;
  onRequestClose: () => void;
  onPizzaDeleted: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ pizzaId, isOpen, onRequestClose, onPizzaDeleted }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg w-1/2">
      <div className="flex flex-col items-start p-4">
      <div className="flex items-center w-full">
        <div className="text-gray-900 font-medium text-lg">Confirm Delete</div>
        <svg onClick={onRequestClose} className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4l7.7 7.6 1.3-1.3L10.4 9z"/>
        </svg>
      </div>

      <hr className="w-full"/>

      <div className="mt-3 text-gray-700">
        <p>Are you sure you want to delete this pizza?</p>
      </div>

      <div className="ml-auto mt-3 flex">
        <button 
          onClick={async () => {
            try {
              await axios.delete(`https://localhost:7033/api/Pizza/${pizzaId}`);
              onRequestClose();
              onPizzaDeleted();
            } catch (error) {
              console.error("Failed to delete pizza", error);
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          Confirm Delete
        </button>
        </div>
        </div>
        </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;