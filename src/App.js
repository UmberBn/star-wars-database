import React from "react";
import { Layout } from "./components";
import { Home } from "./pages";
import "./App.css";
import GlobalContext from "./context";

function App() {
  return (
    <GlobalContext>
      <Layout>
        <Home />
      </Layout>
    </GlobalContext>
  );
}

export default App;
