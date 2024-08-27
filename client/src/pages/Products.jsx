

import React from 'react'
import ProductsList from '../components/sub/ProductList';
import { products } from '../components/ProductsData';


const ProductsPage = () => {
  return (
    <div>
      <h1 className='relative text-yellow-200 text-5xl text-center font-bold top-[100px] shadow-md shawdow-white'>Welcome To Flipbuddy shooping app</h1>
      <div className='mt-[200px] relative min-h-screen min-w-screen ' >
      <ProductsList products={products} />
    </div>

    </div>
    
  )
}

export default ProductsPage;

