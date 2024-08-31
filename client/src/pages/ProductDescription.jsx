import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDescription = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const getProduct = async () => {
    const response = await fetch("http://127.0.0.1:5000/getproduct", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `uniq_id=${encodeURIComponent(id)}`
    });
    if (response.status === 200) {
      const res = await response.json();
      setProduct(res.product);
      setImages(Array.isArray(res.product.image) ? res.product.image : [res.product.image]);
      props.setCurrProduct(id);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    getProduct();
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (props.negotiatedPrice !== 0 && props.negotiatedPrice !== product.retail_price) {
      document.getElementById('retailPrice').innerHTML = `<del>₹${product.retail_price}</del> ₹${props.negotiatedPrice}`;
    }
    //eslint-disable-next-line
  }, [props.negotiatedPrice]);

  const handleBuyNow = () => {
    const buyProduct = product;
    buyProduct.quantity = 1;
    if (props.negotiatedPrice !== 0 && props.negotiatedPrice !== buyProduct.retail_price) {
      buyProduct.retail_price = props.negotiatedPrice;
    }
    props.setCart([buyProduct]);
    navigate('/checkout');
  };

  const handleAddToCart = async () => {
    let price = product.retail_price;
    if (props.negotiatedPrice !== 0 && props.negotiatedPrice !== product.retail_price) {
      price = props.negotiatedPrice;
    }
    let data = await fetch(`http://127.0.0.1:5000/addtocart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `price=${encodeURIComponent(price)}`
    });
    if (data.status === 200) {
      toast.success('Item added to cart');
    }
  };

  
  useEffect(()=>{
    if(props.intent === "checkout") {
      handleBuyNow();
      props.setIntent("");
    }
    else if(props.intent === "add_to_cart") {
      handleAddToCart();
      const addToCartResonses = ["Item added to your cart!",
                                 "Successfully added to cart!",
                                 "Item added to cart.",
                                 "Successfully added to your cart!",
                                 "Your item is in the cart!",
                                 "Item has been added to the cart.",
                                 "Added to your cart!",
                                 "Item successfully placed in your cart!",
                                 "Added to cart!",
                                 "Your item is now in the cart!"]
      const response = addToCartResonses[Math.floor(Math.random() * addToCartResonses.length)];
      props.setText(response);
      props.setIntent("");
    }
    //eslint-disable-next-line
  }, [props.intent]);
  
  if (!product) {
    return (
      <div className="flex justify-center text-white items-center min-h-screen text-center text-3xl text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[70%] lg:flex-row gap-10 min-h-screen p-4 bg-gray-100 mt-20 z-[120]">
      <div className="lg:w-[50%] w-full flex justify-center items-center bg-transparent rounded-lg shadow-lg shadow-yellow-25 border-2 z-[120]">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="h-[400px] w-full"
        >
          {product != null && images != null && images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="h-[300px] lg:w-full relative  transition-transform transform hover:scale-105 border-2 p-2 border-t-yellow-200 shadow-md shadow-blue-400"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="lg:w-[50%] w-full text-richblack-100 flex flex-col justify-center p-6 gap-4">
        <h1 className="text-4xl font-bold mb-4">{product.product_name}</h1>
        <p id="retailPrice" className="text-2xl text-green-600 mb-4">₹{product.retail_price}</p>
        <p className="text-gray-700 mb-6">
          {product.description.length > 300 ? `${product.description.substring(0, 200)}...` : product.description}
        </p>
        <button className="bg-blue-500 hover:bg-blue-200 text-white py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-200 text-white py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;