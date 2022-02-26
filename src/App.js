import React from "react";
import { Layout } from "./components";
import { Home } from "./pages";
import GlobalContext from "./context";
import "./App.css"

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
