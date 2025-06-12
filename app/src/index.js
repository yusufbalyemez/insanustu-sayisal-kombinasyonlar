import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

// Ortama göre doğru router seçimi
const isGithubPages = window.location.hostname.includes("github.io");
const CustomRouter = isGithubPages ? HashRouter : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomRouter>
      <App />
    </CustomRouter>
  </React.StrictMode>
);

reportWebVitals();