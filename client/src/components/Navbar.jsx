// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className= "relative text-white z-[100] w-full bg-richblack-300">
//       <div className="container mx-auto flex justify-between items-centere shadow-lg shadow-yellow-50">
//         <div className="text-2xl font-bold">
//           <Link to="/">Shopping with Flipbuddy</Link>
//         </div>
//         <div className="space-x-4">
//           <Link to="/" className="hover:text-yellow-300">
//             Home
//           </Link>
//           <Link to="/products" className="hover:text-yellow-300">
//             Products
//           </Link>
//           <Link to="/cart" className="hover:text-yellow-300">
//             Cart
//           </Link>
//           <Link to="/contact" className="hover:text-yellow-300">
//             Contact Us
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="relative bottom-8 text-white py-3 h-2 z-[100] w-full">
      <div className="container mx-auto flex justify-between items-center h-full  shadow-lg shadow-blue-100">
        <div className="text-3xl font-bold text-white">
          <Link to="/">FlipBuddy Shopping App</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-100">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-100">
            Products
          </Link>
          <Link to="/cart" className="hover:text-yellow-100">
            Cart
          </Link>
          <Link to="/contact" className="hover:text-yellow-100">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

