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
       <Navbar logged={logged} setLogged={setLogged} logout={logout} setLogoutModal={setLogoutModal}/>
       <StarsCanvas />
      <Routes>
        <Route path="/" element={<Home text={text} setText={setText} animation={animation} setAnimation={setAnimation} logged={logged} setLogged={setLogged} />} />
        <Route path="/login" element={<Login setText={setText} setLogged={setLogged} logoutModal={logoutModal} setLogoutModal={setLogoutModal} setAnimation={setAnimation} />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/recommendated" element={<RecommendedProducts/>} />
        <Route path="/product/:id" element={<ProductDescription/>} />
      </Routes>
    </div>
  );
}
