import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Planets } from "../pages";

function routes() {
  return (
    <Routes>
      <Route path="/planets" element={<Planets />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default routes;
