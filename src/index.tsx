import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { makeServer } from "./mirage/server";
import { ThemeContextProvider } from "./styles/theme/ThemeContext";

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

// Start Mirage
makeServer({ environment: "development" });

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
