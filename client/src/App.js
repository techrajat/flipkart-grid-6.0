import { React, useEffect, useState } from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StarsCanvas from "./components/StarBackground";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import RecommendedProducts from "./pages/RecommendedProducts";
import ProductDescription from "./pages/ProductDescription";
import AvatarContainer from './components/sub/AvatarContainer';
import DescPage from './pages/DescPage';
import CheckoutPage from './pages/Checkout';
import CartPage from './pages/CartPage';


export default function App() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [animation, setAnimation] = useState("Idle");
  const [text, setText] = useState("");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [intent, setIntent] = useState("");

  const logout = () => {
    setLogged(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  useEffect(()=>{
    if(intent === "show_products") {
      navigate('/products');
    }
    //eslint-disable-next-line
  }, [intent, audioTranscript]);

  return (
    <div className="max-h-screen min-w-screen flex flex-col font-inter bg-[#030014] overflow-y-hidden overflow-x-hidden">
      <Navbar logged={logged} setLogged={setLogged} logout={logout} setLogoutModal={setLogoutModal} />
      <div className="absolute flex w-full lg:w-[30%] max-w-full h-auto lg:h-[87%] justify-center z-[200] top-24 right-0">
        <AvatarContainer text={text} setText={setText} setAudioTranscript={setAudioTranscript} intent={intent} setIntent={setIntent} animation={animation} setAnimation={setAnimation} />
      </div>
      <StarsCanvas />
      <Routes>
        <Route path="/" element={<DescPage setLogged={setLogged} />} />
        <Route path="/recommend" element={<RecommendedProducts setLogged={setLogged} />} />
        <Route path="/products" element={<ProductsPage setLogged={setLogged} audioTranscript={audioTranscript} setText={setText} />} />
        <Route path="/login" element={<Login setText={setText} setLogged={setLogged} logoutModal={logoutModal} setLogoutModal={setLogoutModal} setAnimation={setAnimation} />} />
        <Route path="/product/:id" element={<ProductDescription setLogged={setLogged} />} />
        <Route path="/checkout" element={<CheckoutPage setLogged={setLogged} />} />
        <Route path="/cartitems" element={<CartPage />} />
      </Routes>
    </div>
  );
}
