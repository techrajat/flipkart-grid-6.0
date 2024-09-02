import React from 'react';
import Modal from 'react-modal';

const CombosAndOffersModal = ({ isOpen, onClose, selectedProduct, products }) => {
  // Find products of the same type
  const sameTypeProducts = products.filter(product => product.type === selectedProduct.type && product.id !== selectedProduct.id);

  // Randomly select one product of the same type
  const randomProduct = sameTypeProducts[Math.floor(Math.random() * sameTypeProducts.length)];

  // Calculate the discount price for the combo
  const discountPrice = selectedProduct.price + randomProduct.price - 0.1 * (selectedProduct.price + randomProduct.price); // 10% discount

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Combos and Offers"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Combo Offer</h2>
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <div className="text-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-32 w-32 object-cover" />
            <p>{selectedProduct.name}</p>
            <p>Price: ₹{selectedProduct.price}</p>
          </div>
          <div className="text-center">
            <img src={randomProduct.image} alt={randomProduct.name} className="h-32 w-32 object-cover" />
            <p>{randomProduct.name}</p>
            <p>Price: ₹{randomProduct.price}</p>
          </div>
        </div>
        <p className="text-xl font-bold text-green-500">Combo Price: ₹{discountPrice.toFixed(2)}</p>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default CombosAndOffersModal;
