import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { ThemeProvider } from "./components/common/ThemeProvider";
import Root from "./Root";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
);
