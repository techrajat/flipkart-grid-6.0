import React from 'react';
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromTop } from '../../utils/motion';
import { SparklesIcon } from "@heroicons/react/24/solid";
import HeroContent from './HeroContent';
import ProductsPage from '../../pages/Products';
import RecommendedProduct from '../../pages/RecommendedProducts';
import ProductDescription from '../../pages/ProductDescription';

const SubContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-10 mt-10 lg:mt-20 w-full z-[20] overflow-hidden"
    >
      {/* <div className="flex flex-col gap-5 justify-center text-center lg:text-start w-full lg:w-[50%] max-w-full">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center justify-center lg:justify-start"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Fullstack Developer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl lg:text-6xl font-bold text-white max-w-full"
        >
          <span>
            Providing
            <span className="text-transparent bg-clip-text bg-blue-100">
              {" "}
              the best{" "}
            </span>
            project experience
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg lg:text-xl text-yellow-300 my-5 max-w-full"
        >
          I&apos;m your Virtual Salesman. I can help you find the best products and assist you 
          throughout your online shopping experience.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] w-full"
        >
          Learn More!
        </motion.a>
      </div> */}

      <div className='lg:w-[70%]'>
        <ProductsPage/>
        {/* <RecommendedProduct/> */}
        {/* <ProductDescription/> */}


      </div>

      <div className="relative flex w-full lg:w-[30%] max-w-full h-auto lg:h-full justify-center mt-10 lg:mt-0">
        <HeroContent />
      </div>
    </motion.div>
  );
};

export default SubContent;
