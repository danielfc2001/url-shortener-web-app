import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ShortenerProvider } from "./context/ShortenerContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <ShortenerProvider>
              <App />
            </ShortenerProvider>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
