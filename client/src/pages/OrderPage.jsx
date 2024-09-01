import React, { useState, useEffect } from "react";
import { products } from "../components/ProductsData";

const OrderPage = () => {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  // const fetchOrders = async () => {
  //   const userId = localStorage.getItem("user");
  //   try {
  //     const response = await fetch(``);
  //     const data = await response.json();
  //     setOrders(data);
  //   } catch (err) {
  //     console.error('Failed to fetch orders:', err);
  //   }
  // };

  // fetchOrders();
  // setOrders(products);
  //   }, []);

  // console.log(orders);

  const getRandomDeliveryDate = () => {
    const minDays = 2;
    const maxDays = 10;
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + randomDays);
    return deliveryDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center items-center bg-transparent z-[120] text-richblack-950">
      <div className="relative w-full max-w-3xl pt-4  right-20 top-18">
        <h1 className=" text-4xl font-bold mb-6 text-center text-yellow-25">
          Your Orders
        </h1>
      </div>
      <div className="border-t-4 relative top-18 w-full max-w-3xl  right-20  border-richblack-100 pt-4 space-y-4 overflow-y-auto max-h-[80vh] no-scrollbar">
        {products.map((product, index) => {
          if (product !== null)
            return (
              <div
                key={index}
                className="flex shadow-md shadow-caribbeangreen-25 h-[200px] w-full p-4 items-center bg-transparent text-white rounded-md"
              >
                {/* Image and Product Name Column */}
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
        })}
      </div>
    </div>
  );
};

export default OrderPage;
