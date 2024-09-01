import React, { useState, useEffect } from "react";
// import { products } from "../components/ProductsData";

const OrderPage = (props) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    let data = await fetch(`http://127.0.0.1:5000/getorders`, {
      method: "GET",
      headers: { "Authorization": localStorage.getItem('token') }
    });
    if (data.status === 200) {
      data = await data.json();
      setOrders(data.orders);
    }
  }

  const getRandomDeliveryDate = () => {
    const minDays = 3;
    const maxDays = 7;
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + randomDays);
    if (deliveryDate.getMonth() !== new Date().getMonth()) {
      const lastDayOfMonth = new Date(deliveryDate.getFullYear(), new Date().getMonth() + 1, 0).getDate();
      deliveryDate.setDate(lastDayOfMonth);
    }
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const year = deliveryDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    getOrders();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center items-center bg-transparent z-[120] text-richblack-950">
      <div className="relative w-full max-w-3xl pt-4  right-20 top-18">
        <h1 className=" text-4xl font-bold mb-6 text-center text-yellow-25">
          Your Orders
        </h1>
      </div>
      <div className="border-t-4 relative top-18 w-full max-w-3xl  right-20  border-richblack-100 pt-4 space-y-4 overflow-y-auto max-h-[80vh] no-scrollbar">
        {orders.map((product, index) => {
          if (product !== null) {
            return (
              <div
                key={index}
                className="flex shadow-md shadow-caribbeangreen-25 h-[200px] w-full p-4 items-center bg-white rounded-md"
              >
                <div className="w-1/3 flex items-center gap-4">
                  <img
                    src={
                      product.image[0]
                        ? product.image[0]
                        : "/images/image-not-found.png"
                    }
                    alt={product.product_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/image-not-found.png";
                    }}
                    className="h-20 object-cover shadow-md shadow-black bg-white p-2 transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                  <h2 className="text-lg font-semibold">
                    {product.product_name}
                  </h2>
                </div>

                {/* Price Column */}
                <div className="w-1/3 flex  justify-center">
                  <p className="text-xl text-gray-700 font-bold">
                    ₹{product.retail_price}
                  </p>
                </div>

                {/* Product Address Column */}
                <div className="w-1/3 flex flex-col justify-center items-start px-4">
                  <h1 className="text-sm text-gray-600 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-caribbeangreen-200 mr-2"></div>
                    Delivery on {getRandomDeliveryDate()}
                  </h1>
                  <h2 className="text-sm text-gray-600">
                    {product.product_name}
                  </h2>
                </div>
              </div>
            );
          }
          return <></>
        })}
      </div>
    </div>
  );
};

export default OrderPage;
