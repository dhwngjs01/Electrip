// frontend/src/App.js
import "swiper/css";
import "swiper/css/pagination";
import "./App.css";

import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./_layout/Header";
import Main from "./pages/Main/Main";

import Reserve from "./pages/Public/Reserve";

import Login from "./pages/User/Login";
import Join from "./pages/User/Join";
import NotFound from "./_layout/NotFound";

const App = () => {
  return (
    <div className="App" style={{ marginTop: "110px" }}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/public/reserve" element={<Reserve />} />

          <Route path="/member/login" element={<Login />} />
          <Route path="/member/join" element={<Join />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
