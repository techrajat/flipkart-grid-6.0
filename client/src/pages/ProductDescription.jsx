import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../components/ProductsData';

// Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedProductId = localStorage.getItem('selectedProductId');
    console.log(storedProductId);

    const fetchedProduct = products.find((p) => p.uniq_id === storedProductId);
    console.log(fetchedProduct);

    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setImages(Array.isArray(fetchedProduct.image) ? fetchedProduct.image : [fetchedProduct.image]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center text-white items-center min-h-screen text-center text-3xl text-red-500">
        Product not found.
      </div>
    );
  }

  // Handler for Buy Now button click
  const handleBuyNow = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col w-[70%] lg:flex-row gap-10 min-h-screen p-4 bg-gray-100 mt-20 z-[120]">
      {/* Product Image Section with Swiper Slider */}
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

      {/* Product Details Section */}
      <div className="lg:w-[50%] w-full text-richblack-100 flex flex-col justify-center p-6 gap-4">
        <h1 className="text-4xl font-bold mb-4">{product.product_name}</h1>
        <p className="text-2xl text-green-600 mb-4">₹{product.discounted_price}</p>
        <p className="text-gray-700 mb-6">
          {product.description.length > 300 ? `${product.description.substring(0, 200)}...` : product.description}
        </p>
        <button className="bg-blue-500 hover:bg-blue-200 text-white py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          Add to Cart
        </button>
        <button 
          className="bg-yellow-500 hover:bg-yellow-200 text-white py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={handleBuyNow}  // Add onClick handler
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
