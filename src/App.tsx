import React, { Fragment } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";

function App() {
  return (
    <Fragment>
      <Header />
      <OilWells />
    </Fragment>
  );
}

export default App;
