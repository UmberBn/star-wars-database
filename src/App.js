import React from "react";
import { Layout } from "./components";
import GlobalContext from "./context";
import "./App.css"
import Routes from "./routes/index.routes";

function App() {
  return (
    <GlobalContext>
      <Layout>
        <Routes />
      </Layout>
    </GlobalContext>
  );
}

export default App;
