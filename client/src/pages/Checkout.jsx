import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { products } from "../components/ProductsData";

const CheckoutPage = (props) => {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    setSelectedProducts(props.cart);
    const user = JSON.parse(localStorage.getItem('user'));
    setShippingInfo({name: user.name, address: user.address, city: user.city, state: user.state, zip: user.zip});
    //eslint-disable-next-line
  }, []);

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
    console.log("Shipping Info:", shippingInfo);
    console.log("Payment Info:", paymentInfo);
    console.log("Selected Products:", selectedProducts);
  };

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    //eslint-disable-next-line
  }, []);

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.retail_price * product.quantity, 0);
  };

  const handleCompletePurchase = async()=>{
    let data = await fetch(`http://127.0.0.1:5000/addtoorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `orders=${encodeURIComponent(JSON.stringify(props.cart))}`
    });
    if (data.status === 200) {
      if(props.cart.length > 1) {
        data = await fetch(`http://127.0.0.1:5000/emptycart`, {
          method: "GET",
          headers: {"Authorization": localStorage.getItem('token')}
        });
      }
      props.setCart([]);
      navigate("/order");
    }
  }

  useEffect(()=>{
    if(props.intent === "complete_purchase") {
      const responses = ["Thanks for shopping with us! We hope you love your purchase. Have a great day!",
                        "We appreciate your order! Thanks for choosing us and enjoy your new items!",
                        "Thank you for your purchase! We're glad to have you as a customer. See you soon!",
                        "Thanks for your order! We hope you're happy with your purchase. Have a wonderful day!",
                        "Your purchase is complete! Thanks for shopping with us. Enjoy your day!"]
      const response = responses[Math.floor(Math.random() * responses.length)];
      props.setText(response);
      props.setAnimation("Thankful");
      handleCompletePurchase();
      props.setIntent("");
    }
    //eslint-disable-next-line
  }, [props.intent]);
  
  return (
    <div className="min-h-screen p-6 flex justify-start items-center bg-transparent z-[120] text-richblack-25 ">
      <div className=" w-full max-w-5xl bg-transparent p-6 rounded-lg shadow-lg shadow-richblack-100 relative ">
        <h1 className="text-5xl font-bold mb-6 text-center">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="relative space-y-8 flex flex-row w-full gap-10"
        >
          <div className="flex lg:flex-col gap-10 w-[60%]">
            <div className="flex-1 bg-transparent p-6 rounded-lg shadow-lg shadow-yellow-200 text-white">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Information
              </h2>
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

            <div className="flex-1 bg-transparent p-6 rounded-lg shadow-lg shadow-blue-200">
              <h2 className="text-2xl font-semibold mb-4">
                Payment Information
              </h2>
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

          <div className="flex items-center justify-between w-[40%] h-full">
            <div className="border-t border-gray-300 pt-4 space-y-4 overflow-y-auto max-h-[60vh] no-scrollbar">
              <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-lg font-semibold">Item Summary:</p>
                {selectedProducts.map((product) => (
                  <div key={product.uniq_id} className="flex items-center gap-4 mb-4">
                    <img
                      src={product.image[0]}
                      alt={product.product_name}
                      className="w-24 h-24 object-cover rounded-md shadow-md"
                    />
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {product.product_name}
                      </p>
                      <p className="text-gray-500">Quantity: {product.quantity}</p>
                      <p className="text-gray-700">₹{product.retail_price * product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            <div/>
            <div className=" bg-richblack-900 text-caribbeangreen-100 p-4 shadow-md shadow-caribbeangreen-100 border-t flex justify-between items-center max-w-3xl mx-auto z-50">
              <p className="text-lg font-semibold text-gray-700"> Total: ₹{calculateTotal()}</p>
              <button
                type="submit"
                onClick={handleCompletePurchase}
                className="bg-blue-500 text-white py-3 px-6 mt-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Complete Purchase
              </button> 
              
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;