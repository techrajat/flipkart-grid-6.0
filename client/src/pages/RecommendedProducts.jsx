import React, { useEffect, useState } from 'react';
import ProductList from '../components/sub/ProductList';
// import { products } from '../components/ProductsData';

const RecommendProducts = (props) => {
  const [products, setProducts] = useState([]);

  const getRecommendedProducts = async () => {
    const response = await fetch("http://127.0.0.1:5000/recommend", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      const res = await response.json();
      setProducts(res.products);
    }
  };

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    getRecommendedProducts();
    //eslint-disable-next-line
  }, []);


  return (
    <div className="relative h-screen w-[70%] overflow-hidden z-[100] flex flex-col  top-[150px] mt-5 left-14">
        <div className='relative top-[50px]'>
          <h1 className="text-richblack-50 text-3xl font-bold fixed top-20 z-[50] pt-10">Top picks just for you</h1>
       </div>
       <div className='overflow-y-scroll no-scrollbar'>
        <ProductList products={products} />
       </div>
      
    </div>
  );
};

export default RecommendProducts;
