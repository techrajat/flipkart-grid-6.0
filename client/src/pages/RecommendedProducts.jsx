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
    <div className="min-h-screen p-6 flex justify-start items-center bg-transparent z-[120] text-caribbeangreen-25 ">
       <h1 className="text-richblack-50 text-3xl font-bold fixed top-[120px] z-[50] border-b-2 border-caribbeangreen-25 ">Top picks just for you</h1>
      <div className='relative max-w-4xl border-gray-300 overflow-y-auto max-h-[80vh] top-20 no-scrollbar'>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default RecommendProducts;
