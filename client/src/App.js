import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StarsCanvas from "./components/StarBackground";
import background from "../src/assets/banner-bg.png";


export default function App() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col font-inter bg-[#030014] overflow-y-scroll overflow-x-hidden" >
      <StarsCanvas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
