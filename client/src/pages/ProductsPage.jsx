import React, { useEffect, useState } from 'react'
import ProductsSlider from '../components/sub/ProductSlider';



const ProductsPage = (props) => {
  const [products, setProducts] = useState([]);

  const updateSearchString = async () => {
    const response = await fetch("http://127.0.0.1:5000/setstring", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `str=${encodeURIComponent(props.audioTranscript)}`
    });
    if (response.status === 200) {
      console.log("Search string updated successfully.");
    }
  };

  const getProducts = async () => {
    const response = await fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `query=${encodeURIComponent(props.audioTranscript)}`
    });
    if (response.status === 200) {
      const res = await response.json();
      setProducts(res.products);
      props.setText(res.response);
      updateSearchString();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    getProducts();
    //eslint-disable-next-line
  }, [props.audioTranscript]);

  return (
    <div className='relative top-10 w-[70%]'>
      <h1 className='relative text-yellow-200 text-5xl text-center font-bold top-[100px] shadow-md shawdow-white'>Welcome To FlipBuddy shopping app</h1>
      <div className='mt-[100px] relative min-h-screen min-w-screen'>
        <ProductsSlider products={products} />
      </div>

    </div>

  )
}

export default ProductsPage;

