import { React, useState } from 'react';
import "./App.css";
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
import Profile from './pages/Profile';
import OrderPage from './pages/OrderPage';

export default function App() {
  const [logged, setLogged] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [animation, setAnimation] = useState("Idle");
  const [text, setText] = useState("");
  const [audioTranscript, setAudioTranscript] = useState("");
  const [intent, setIntent] = useState("");
  const [negotiatedPrice, setNegotiatedPrice] = useState(0);
  const [currProduct, setCurrProduct] = useState(null);
  const [currPrice, setCurrPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const logout = () => {
    setLogged(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <div className="max-h-screen min-w-screen flex flex-col font-inter bg-black overflow-y-hidden overflow-x-hidden">
      <Navbar logged={logged} setLogged={setLogged} logout={logout} setLogoutModal={setLogoutModal} cart={cart}/>
      <div className="absolute flex w-full lg:w-[30%] max-w-full h-auto lg:h-[78%] justify-center z-[250] top-24 right-0">
        <AvatarContainer text={text} setText={setText} setAudioTranscript={setAudioTranscript} intent={intent} setIntent={setIntent} animation={animation} setAnimation={setAnimation} currProduct={currProduct} negotiatedPrice={negotiatedPrice} setNegotiatedPrice={setNegotiatedPrice} currPrice={currPrice} setCurrPrice={setCurrPrice} />
      </div>
      <StarsCanvas />
      <Routes>
        <Route path="/" element={<DescPage setLogged={setLogged} />} />
        <Route path="/recommend" element={<RecommendedProducts setLogged={setLogged} />} />
        <Route path="/products" element={<ProductsPage setLogged={setLogged} audioTranscript={audioTranscript} setText={setText} />} />
        <Route path="/login" element={<Login setText={setText} setLogged={setLogged} logoutModal={logoutModal} setLogoutModal={setLogoutModal} setAnimation={setAnimation} />} />
        <Route path="/product/:id" element={<ProductDescription setLogged={setLogged} setCurrProduct={setCurrProduct} setCurrPrice={setCurrPrice} negotiatedPrice={negotiatedPrice} setNegotiatedPrice={setNegotiatedPrice} intent={intent} setIntent={setIntent} setCart={setCart} setText={setText} setAnimation={setAnimation} />} />
        <Route path="/checkout" element={<CheckoutPage setLogged={setLogged} cart={cart} setCart={setCart} intent={intent} setIntent={setIntent} setText={setText} setAnimation={setAnimation} />} />
        <Route path="/cartitems" element={<CartPage setLogged={setLogged} setCart={setCart} intent={intent} setIntent={setIntent} />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/order" element={<OrderPage setLogged={setLogged}/>}/>
      </Routes>
    </div>
  );
}
