import React from 'react';
import Modal from 'react-modal';

const CombosAndOffersModal = ({ isOpen, onClose, comboProducts }) => {
  if (comboProducts.length < 2) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Combos and Offers"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Combos and Offers</h2>
        <p>No combo offers available.</p>
        <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={onClose}>
          Close
        </button>
      </Modal>
    );
  }

  const [product1, product2] = comboProducts;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Combos and Offers"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Combo Offer</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center border p-4 rounded">
          <img
            src={product1.image[0]}
            alt={product1.product_name}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold">{product1.name}</h3>
            <p>Price: ₹{product1.retail_price}</p>
          </div>
        </div>
        <div className="flex items-center border p-4 rounded">
          <img
            src={product2.image[0]}
            alt={product2.product_name}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold">{product2.name}</h3>
            <p>Price: ₹{product2.retail_price}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Combo Price: ₹{(product1.retail_price + product2.retail_price) * 0.9}</h4>
        <p>Get both products at a 10% discount!</p>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default CombosAndOffersModal;