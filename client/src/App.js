import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StarsCanvas from "./components/StarBackground";
import background from "../src/assets/banner-bg.png";
import ProductsPage from "./pages/Products";
import Navbar from "./components/Navbar";
import RecommendedProducts from "./pages/RecommendedProducts";


export default function App() {
  return (
    <div className="max-h-screen min-w-screen flex flex-col font-inter bg-[#030014] overflow-y-hidden overflow-x-hidden">
       <Navbar/>
       <StarsCanvas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/recommendated" element={<RecommendedProducts/>} />
      </Routes>
    </div>
  );
}
