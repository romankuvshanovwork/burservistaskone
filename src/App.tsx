import { useState } from "react";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  const [currentWellId, setCurrentWellId] = useState(0); // Текущая выбранная скважина
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = useState<String[]>([]); // Массив с фильтрами: БУР, ОСВ, ABN

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="projectId/:projectId"
          element={
            <>
              <OilWells
                currentWellId={currentWellId}
                onCurrentWellIdChange={setCurrentWellId}
                onIsGenPlanFilterOnChange={setIsGenPlanFilterOn}
                eventFilters={eventFilters}
                onEventFiltersChange={setEventFilters}
              />
              <TableSection
                currentWellId={currentWellId}
                isGenPlanFilterOn={isGenPlanFilterOn}
                eventFilters={eventFilters}
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
