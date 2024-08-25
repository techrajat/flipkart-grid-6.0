import React from 'react';
import './Product.css'; // Import the CSS file

export const Product=()=> {
  return (

    
    <div className="bg-black">
      <div className="product">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" alt="Product 1" />
        <div className="details">
          <div className="name">Product 1</div>
          <div className="price">$29.99</div>
          <div className="description">This is a short description of Product 1.</div>
        </div>
      </div>
      <div className="product">
        <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Product 2" />
        <div className="details">
          <div className="name">Product 2</div>
          <div className="price">$39.99</div>
          <div className="description">This is a short description of Product 2.</div>
        </div>
      </div>
      <div className="product">
        <img src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg" alt="Product 3" />
        <div className="details">
          <div className="name">Product 3</div>
          <div className="price">$49.99</div>
          <div className="description">This is a short description of Product 3.</div>
        </div>
      </div>
      {/* Add more products as needed */}
    </div>
  );
}


