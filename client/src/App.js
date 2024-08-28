import { React, useState } from 'react';
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StarsCanvas from "./components/StarBackground";
import ProductsPage from "./pages/Products";
import Navbar from "./components/Navbar";
import RecommendedProducts from "./pages/RecommendedProducts";


export default function App() {
  const [logged, setLogged] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [script, setScript] = useState("nothing");

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
        <Route path="/" element={<Home playAudio={playAudio} setPlayAudio={setPlayAudio} script={script} setScript={setScript}  />} />
        <Route path="/login" element={<Login setLogged={setLogged} logoutModal={logoutModal} setLogoutModal={setLogoutModal} setPlayAudio={setPlayAudio} setScript={setScript} />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/recommendated" element={<RecommendedProducts/>} />
      </Routes>
    </div>
  );
}
