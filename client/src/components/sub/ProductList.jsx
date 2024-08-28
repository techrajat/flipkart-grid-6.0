import React from 'react';
import ProductCard from './ProductCard'; // Import your ProductCard component

const ProductList = ({ products }) => {
  return (
    <div className="relative px-4 py-12 shadow-lg shadow-blue-200 rounded-md z-[50]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="shadow-md shadow-yellow-200 w-full h-[400px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
