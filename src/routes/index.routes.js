import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Planets } from "../pages";

// import { Container } from './styles';

function routes() {
  return (
    <Routes>
      <Route path="/planets/:id" element={<Home />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default routes;
