import React from 'react';
import ProductList from '../components/sub/ProductList';
import { products } from '../components/ProductsData';

const ProductsPage = () => {
  return (
    <div className="relative h-screen w-full overflow-auto mx-auto z-[100] flex flex-col  top-[100px] mt-10">
      {/* Adjust the top spacing to account for the navbar */}
        <div className='relative top-[50px]'>
          <h1 className="text-yellow-200 text-5xl font-bold fixed top-20 left-10 z-[50] pt-10"> Top picks just for you</h1>
       </div>
        <ProductList products={products} />
      
    </div>
  );
};

export default ProductsPage;
