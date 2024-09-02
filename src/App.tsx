import React, { Fragment } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";

function App() {
  return (
    <Fragment>
      <Header />
      <OilWells />
      <TableSection />
    </Fragment>
  );
}

export default App;
