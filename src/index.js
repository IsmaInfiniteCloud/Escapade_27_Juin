import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import "./index.css";
import "./styles/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ModalStore from "./components/ModalStore"; // Assurez-vous que le chemin d'accès est correct.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider ModalStore={ModalStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
