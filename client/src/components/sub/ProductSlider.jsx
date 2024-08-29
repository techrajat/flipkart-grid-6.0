import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';

const ProductSlider = ({ products }) => {
  return (
    <div className="relative  px-4 py-12 shadow-lg shadow-blue-200 rounded-md z-[50]">

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        slidesPerView={3}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 50,
          stretch: -100,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="shadow-md shadow-yellow-200">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}

        <div className="swiper-controls">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default ProductSlider;
