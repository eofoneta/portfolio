import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SmoothScroll from "./Components/SmoothScroll.tsx";
import { BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";

inject();

// The build-time HTML is for crawlers; it stays hidden (see index.html) and React replaces it
const root = document.getElementById("root")!;
root.removeAttribute("data-prerendered");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>
);
