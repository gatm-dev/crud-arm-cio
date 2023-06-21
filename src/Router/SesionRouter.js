import React, { useContext, useEffect } from "react";
import { SesionContext } from "../Context/SesionContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../Screens/Login";
import Home from "../Screens/Home";

const SesionRouter = () => {
  const { token } = useContext(SesionContext);

  const RouteLogin = () => (token ? <Navigate to="/" replace /> : <Login />);
  const RouteHome = () => (token ? <Home /> : <Navigate to="/login" replace />);

  return (
    <BrowserRouter basename="/cio-armazones">
      <Routes>
        <Route path="/login" element={<RouteLogin />} />
        <Route path="/" element={<RouteHome />} />
        <Route path="*" element={<div>Pagina no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default SesionRouter;
