import "./App.css";
import Navbar from "./components/Navbar";
import { QuranProvider } from "./context/quranListContext";
import DenemeSayfa from "./pages/DenemeSayfa";
import HomePage from "./pages/HomePage";
import Number1 from "./pages/Number1";
import Number2 from "./pages/Number2";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Number3 from "./pages/Number3";
import { DifferentRefsProvider } from "./context/DifferentRefsContext";
import Number4 from "./pages/Number4";
import BesmeleEtkisi from "./pages/BesmeleEtkisi";
import Number5 from "./pages/Number5";

function App() {
  return (
    <QuranProvider>
      <DifferentRefsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/1" element={<Number1 />} />
          <Route path="/2" element={<Number2 />} />
          <Route path="/3" element={<Number3 />} />
          <Route path="/4" element={<Number4 />} />
          <Route path="/5" element={<Number5/>} />
          <Route path="/basmala" element={<BesmeleEtkisi/>} />
          <Route path="/deneme" element={<DenemeSayfa />} />
        </Routes>
        <ToastContainer autoClose={4000} position="top-center" />
      </DifferentRefsProvider>
    </QuranProvider>
  );
}

export default App;
