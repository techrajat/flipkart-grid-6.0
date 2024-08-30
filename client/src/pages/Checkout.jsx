import React, { useState, useEffect } from 'react';

const CheckoutPage = (props) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
    // Implement further actions like sending the data to a server or payment gateway
  };

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="relative min-h-screen w-full p-6 flex justify-center items-center bg-transparent z-[500]">
      <div className="w-full max-w-[70%] bg-transparent p-6 rounded-lg shadow-lg text-caribbeangreen-25">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-8 flex flex-row">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Shipping Information */}
            <div className="flex-1 bg-transparent p-6 rounded-lg shadow-lg shadow-yellow-200">
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={handleShippingChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip Code"
                  value={shippingInfo.zip}
                  onChange={handleShippingChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Review Your Order */}
            <div className="flex-1 bg-transparent p-6 rounded-lg shadow-lg shadow-yellow-200">
              <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg font-semibold">Item Summary:</p>
                {/* Here, you would typically map over the cart items and display them */}
                <p className="text-gray-700">1 x Example Product - ₹999</p>
                <p className="text-gray-700 font-semibold">Total: ₹999</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="flex-1 bg-transparent p-6 rounded-lg shadow-lg shadow-blue-200">
              <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                className="p-2 border border-gray-300 rounded-lg mb-4 bg-transparent"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  className="p-2 border border-gray-300 rounded-lg bg-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
