import React from 'react';
import './IntroPage.css'; // Import the CSS file
import heroImage from '../assets/hero-image.png';


export default function IntroPage() {
  return (
    <div className="intro-container">
      
        <h1 className="intro-title" >Welcome to FlipBuddy, Your virtual salesPerson</h1>
        {/* <p className="intro-text">
          Meet your new shopping companion! Our Virtual Salesman is here to help you find exactly what you need, 
          providing personalized recommendations, real-time assistance, and expert advice to enhance your shopping experience.
        </p> */}
        <p className="intro-text">
          Simply ask for any product, and our Virtual Salesman will showcase options tailored just for you. 
          Get ready to experience a smarter way to shop!
        </p>
      <div className="salesman-container">
        <div className="salesman-image-container">
          <img src={heroImage} alt="Virtual Salesman" height={200} widht={1000} className="salesman-image" />
        </div>
      </div>
    </div>
  );
}
