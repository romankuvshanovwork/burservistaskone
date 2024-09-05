import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";

function App() {
  const [wellId, setWellId] = React.useState(0); // Текущая выбранная скважина
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = React.useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = React.useState([]); // Массив с фильтрами

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/projectId/:projectId"
          element={
            <>
              <OilWells
                wellId={wellId}
                onWellIdChange={setWellId}
                onIsGenPlanFilterOnChange={setIsGenPlanFilterOn}
                eventFilters={eventFilters}
                onEventFiltersChange={setEventFilters}
              />
              <TableSection
                wellId={wellId}
                isGenPlanFilterOn={isGenPlanFilterOn}
                eventFilters={eventFilters}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
