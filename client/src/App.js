import { React, useState } from 'react';
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StarsCanvas from "./components/StarBackground";
import ProductsPage from "./pages/Products";
import Navbar from "./components/Navbar";
import RecommendedProducts from "./pages/RecommendedProducts";
import ProductDescription from "./pages/ProductDescription";
import AvatarContainer from './components/sub/AvatarContainer';
import DescPage from './components/sub/DescPage';


export default function App() {
  const [logged, setLogged] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [animation, setAnimation] = useState("Idle");
  const [text, setText] = useState("");

  const logout = () => {
    setLogged(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <div className="max-h-screen min-w-screen flex flex-col font-inter bg-[#030014] overflow-y-hidden overflow-x-hidden">
      <Navbar logged={logged} setLogged={setLogged} logout={logout} setLogoutModal={setLogoutModal} />
      <div className="absolute flex w-full lg:w-[30%] max-w-full h-auto lg:h-full justify-center z-[200] top-20 right-0">
        <AvatarContainer text={text} setText={setText} animation={animation} setAnimation={setAnimation} />
      </div>
      <StarsCanvas />
      <Routes>
        {/* <Route path="/" element={<Home text={text} setText={setText} animation={animation} setAnimation={setAnimation} logged={logged} setLogged={setLogged} />} /> */}
        <Route path="/" element={<DescPage />} />
        <Route path="/recommend" element={<RecommendedProducts />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login setText={setText} setLogged={setLogged} logoutModal={logoutModal} setLogoutModal={setLogoutModal} setAnimation={setAnimation} />} />
        <Route path="/product/:id" element={<ProductDescription />} />
      </Routes>
    </div>
  );
}
