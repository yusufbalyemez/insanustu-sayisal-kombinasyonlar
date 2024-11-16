import "./App.css";
import Navbar from "./components/Navbar";
import DenemeSayfa from "./pages/DenemeSayfa";
import HomePage from "./pages/HomePage";
import Number1 from "./pages/Number1";
import Number2 from "./pages/Number2";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/1" element={<Number1 />} />
        <Route path="/2" element={<Number2 />} />
        <Route path="/deneme" element={<DenemeSayfa/>} />
      </Routes>
      <ToastContainer autoClose={4000} position="top-center"/>
    </>
  );
}

export default App;
