import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./contexts/UserContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Map } from "./pages/Map";
import "./global.css";

const firebaseConfig = {
  apiKey: "AIzaSyCUXYG-B46rpv2iKzOlYC06qqEnelh9_uI",
  authDomain: "modsen-f93e9.firebaseapp.com",
  databaseURL:
    "https://modsen-f93e9-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "modsen-f93e9",
  storageBucket: "modsen-f93e9.appspot.com",
  messagingSenderId: "114123321729",
  appId: "1:114123321729:web:b62ac7f6296466985a3880",
  measurementId: "G-8Q3121JYCD",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
