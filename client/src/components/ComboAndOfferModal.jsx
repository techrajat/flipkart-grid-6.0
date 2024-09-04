import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

Modal.setAppElement('#root');

const CombosAndOffersModal = (props) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    props.comboProducts[0].quantity = 1;
    props.comboProducts[1].quantity = 1;
    props.setCart(props.comboProducts);
    props.setIntent("final_checkout");
    document.getElementById('navBar').style.zIndex = '260';
    navigate('/checkout');
  }

  const handleReject = () => {
    props.comboProducts[0].quantity = 1;
    props.setCart([props.comboProducts[0]]);
    props.setIntent("final_checkout");
    document.getElementById('navBar').style.zIndex = '260';
    navigate('/checkout');
  }

  useEffect(()=>{
    if(props.intent === "accept_offer") {
      handleAccept();
    }
    else if(props.intent === "reject_offer") {
      handleReject();
    }
    //eslint-disable-next-line
  }, [props.intent]);

  if (props.comboProducts.length < 2) {
    return (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        contentLabel="Combos and Offers"
        className="modal-content"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <h2 className="text-2xl font-bold mb-4">Combos and Offers</h2>
        <p>No combo offers available.</p>
        <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={props.onClose}>
          Close
        </button>
      </Modal>
    );
  }

  const [product1, product2] = props.comboProducts;

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      contentLabel="Combos and Offers"
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className='flex items-end justify-end' onClick={props.onClose} >
      <IoCloseSharp size={32} className='text-black hover:cursor-pointer hover:text-pink-300 hover:scale-110 z-[250]'/>
      </div>
      <h2 className="text-4xl font-bold relative bottom-10 text-yellow-100 text-center">Combo Offer</h2>
      <div className="flex flex-col gap-4 px-5">
        <div className='flex flex-row gap-10 justify-center'>

          <div className="flex flex-col items-center border-2 p-4 rounded shadow-lg shadow-black">
            <img
              src={product1.image[0]}
              alt={product1.product_name}
              className="w-40 h-40 object-cover rounded shadow-md shadow-black hover:scale-105 transition-all duration-300"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">{product1.product_name}</h3>
              <p className="mt-2">Price: ₹{product1.retail_price}</p>
            </div>
          </div>

          <div className="flex items-center">
            <FaPlusCircle size={32} />
          </div>

          <div className="flex flex-col items-center border-2  p-4 rounded shadow-lg shadow-black">
            <img
              src={product2.image[0]}
              alt={product2.product_name}
              className="w-40 h-40 object-cover rounded hover:scale-105 transition-all duration-300 shadow-md shadow-black"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">{product2.product_name}</h3>
              <p className="mt-2">Price: ₹{product2.retail_price}</p>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-6 text-center">
        <h4 className="text-lg font-bold">Combo Price: ₹{((product1.retail_price + product2.retail_price) * 0.9).toFixed(2)}</h4>
        <p className='text-caribbeangreen-200'>Get both products at a 10% discount! Hurry up</p>
      </div>
      <div className='flex gap-20'>
      <button className="bg-caribbeangreen-200 w-full text-white py-2 px-4 rounded mt-4 mx-auto hover:bg-caribbeangreen-600" onClick={props.onClose}>
        Accept
      </button>
      <button className="bg-pink-300 w-full text-white py-2 px-4 rounded mt-4 mx-auto  hover:bg-pink-600" onClick={props.onClose}>
        Reject
      </button>

      </div>
    </Modal>
  );
};

export default CombosAndOffersModal;