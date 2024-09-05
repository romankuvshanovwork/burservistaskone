import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";

function App() {
  const [wellId, setWellId] = React.useState(0); // Текущая выбранная скважина
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = React.useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = React.useState<String[]>([]); // Массив с фильтрами

  useEffect(() => {
    setEventFilters([]);
    setIsGenPlanFilterOn(false);
  }, [wellId]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/projectId/:projectId"
          element={
            <>
              <Header />
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
