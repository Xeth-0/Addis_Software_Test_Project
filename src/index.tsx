import { createRoot } from "react-dom/client";
import App from "./App";
import React, { StrictMode } from "react";
import { makeServer } from "./mirage/server";

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

// Start Mirage
makeServer({ environment: "development" });

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
