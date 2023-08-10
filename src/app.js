import React from "react";
import { HashRouter } from "react-router-dom";
import NavbarComp from "Components/NavbarComp";
import AppRouter from "Components/AppRouter";

const App = () => {
  return (
    <HashRouter>
      <NavbarComp />
      <AppRouter />
    </HashRouter>
  );
};

export default App;
