import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  // Truncate the description to 100 characters (or adjust as needed)
  const shortDescription = product.description.length > 100 
    ? `${product.description.substring(0, 25)}...` 
    : product.description;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden p-4 m-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={product.image[0]} alt={product.product_name} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold mt-4">{product.product_name}</h2>
      <p className="text-gray-500 mt-2">{shortDescription}</p>
      <p className="text-blue-500 font-bold mt-4">₹{product.discounted_price}</p>
      <p className="text-gray-400 mt-1 line-through">₹{product.retail_price}</p>
    </motion.div>
  );
};

export default ProductCard;
