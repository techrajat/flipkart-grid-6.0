import React from 'react'
import ProductsSlider from '../components/sub/ProductSlider';
import { products } from '../components/ProductsData';


const ProductsPage = () => {
  return (
    <div className='relative top-10'>
      <h1 className='relative text-yellow-200 text-5xl text-center font-bold top-[100px] shadow-md shawdow-white'>Welcome To Flipbuddy shooping app</h1>
      <div className='mt-[100px] relative min-h-screen min-w-screen ' >
      <ProductsSlider products={products} />
    </div>

    </div>
    
  )
}

export default ProductsPage;

