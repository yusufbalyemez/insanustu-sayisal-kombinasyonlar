import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Number1 from "./pages/Number1";
import Number2 from "./pages/Number2";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/1" element={<Number1 />} />
        <Route path="/2" element={<Number2 />} />
      </Routes>
    </>
  );
}

export default App;
