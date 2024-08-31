import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Truncate the description to 100 characters (or adjust as needed)
  const shortDescription = product.description.length > 100 ? `${product.description.substring(0, 25)}...` : product.description;

  const handleClick = () => {
    navigate(`/product/${product.uniq_id}`);
  }

  return (
    <motion.div
      className="bg-white rounded-lg  h-[380px] p-4 m-2 flex flex-col text-black"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <img src={product.image[0] ? product.image[0] : "/images/image-not-found.png"} alt={product.product_name} onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/images/image-not-found.png";
      }} className="h-48 object-cover shadow-md shadow-black  bg-white p-2 transition-transform duration-300 ease-in-out hover:scale-105" />
      <h2 className="text-lg font-semibold mt-4">{product.product_name}</h2>
      <p className=" mt-2">{shortDescription}</p>
      <p className="text-gray-400 font-bold mt-1">₹{product.retail_price}</p>
    </motion.div>
  );
};

export default ProductCard;
