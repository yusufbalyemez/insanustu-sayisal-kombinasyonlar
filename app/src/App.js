import "./App.css";
import Navbar from "./components/Navbar";
import { QuranProvider } from "./context/quranListContext";
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
import Number6 from "./pages/Number6";
import Number7 from "./pages/Number7";
import Number8 from "./pages/Number8";
import Number9 from "./pages/Number9";
import Number10 from "./pages/Number10";
import Number11 from "./pages/Number11";
import Number12 from "./pages/Number12";
import Number13 from "./pages/Number13";
import Number14 from "./pages/Number14";
import Number15 from "./pages/Number15";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
    <QuranProvider>
      <DifferentRefsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/insanustu-sayisal-kombinasyonlar" element={<HomePage />} />
          <Route path="/1" element={<Number1 />} />
          <Route path="/2" element={<Number2 />} />
          <Route path="/3" element={<Number3 />} />
          <Route path="/4" element={<Number4 />} />
          <Route path="/5" element={<Number5/>} />
          <Route path="/6" element={<Number6/>} />
          <Route path="/7" element={<Number7/>} />
          <Route path="/8" element={<Number8/>} />
          <Route path="/9" element={<Number9/>} />
          <Route path="/10" element={<Number10/>} />
          <Route path="/11" element={<Number11/>} />
          <Route path="/12" element={<Number12/>} />
          <Route path="/13" element={<Number13/>} />
          <Route path="/14" element={<Number14/>} />
          <Route path="/15" element={<Number15/>} />
          <Route path="/basmala" element={<BesmeleEtkisi/>} />
        </Routes>
        <ToastContainer autoClose={4000} position="top-center" />
      </DifferentRefsProvider>
    </QuranProvider>
    </LanguageProvider>
  );
}

export default App;
