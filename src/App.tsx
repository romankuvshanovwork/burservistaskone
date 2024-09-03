import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import TableSectionSecond from "./components/TableSectionSecond/TableSectionSecond";
import { IProject } from "./interfaces/IProject";

// TODO: Посмотреть race conditions

function App() {
  const [project, setProject] = React.useState<IProject>(); // Месторождение
  const [siteId, setSiteId] = React.useState(0); // Куст
  const [wellId, setWellId] = React.useState(0); // Cкважина
  const [wellboreId, setWellboreId] = React.useState(0); // Cтвол
  const [eventId, setEventId] = React.useState(0); // Мероприятия

  return (
    <Fragment>
      <p>{wellId}</p>
      <Header project={project} onProjectChange={setProject} />
      <OilWells project={project} wellId={wellId} onWellIdChange={setWellId} />
      <TableSection wellId={wellId} />
      <TableSectionSecond wellId={wellId} />
    </Fragment>
  );
}

export default App;
