import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    let data = await fetch(`http://127.0.0.1:5000/fetchcart`, {
      method: "GET",
      headers: { "Authorization": localStorage.getItem('token') }
    });
    if (data.status === 200) {
      data = await data.json();
      setCartItems(data.products);
    }
  };

  // Set initial quantities to 1 when loading products into the cart
  useEffect(() => {
    if(localStorage.getItem('token')) {
      props.setLogged(true);
    }
    fetchCart();
    const initialCartItems = cartItems.map((product) => ({
      ...product,
      quantity: 1,
    }));
    setCartItems(initialCartItems);
  }, []);

  // const handleAddItem = (item) => {
  //   const updatedCart = cartItems.map((cartItem) =>
  //     cartItem.uniq_id === item.uniq_id
  //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //       : cartItem
  //   );
  //   setCartItems(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.uniq_id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed");
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.uniq_id === id ? { ...cartItem, quantity } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item updated");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.discounted_price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    const productIds = cartItems.map((item) => item.uniq_id);
    localStorage.setItem("selectedProductIds", JSON.stringify(productIds));
    navigate("/checkout");
  };

  return (
    <div className=" min-h-screen p-6 flex justify-start items-center bg-transparent z-[200] text-caribbeangreen-25 ">
      <div className=" w-full max-w-3xl bg-transparent p-6 rounded-lg shadow-lg shadow-caribbeangreen-100 relative left-32  ">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="border-t border-gray-300 pt-4 space-y-4 overflow-y-auto max-h-[60vh] pb-[80px]">
              {cartItems.map((item) => (
                <div
                  key={item.uniq_id}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image[0]}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {item.product_name} - ₹{item.discounted_price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.uniq_id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="bg-gray-200 px-2 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.uniq_id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.uniq_id)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Fixed footer for total and checkout button */}
            <div className="  bg-richblack-900 text-caribbeangreen-100 p-4 shadow-md shadow-caribbeangreen-100 border-t flex justify-between items-center max-w-3xl mx-auto z-50">
              <p className="text-lg font-semibold text-gray-700">
                Total: ₹{calculateTotal()}
              </p>
              <button
                onClick={handleProceedToCheckout}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
