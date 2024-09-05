import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";

function App() {
  // TODO: Поменять wellId на currentWellId
  const [wellId, setWellId] = useState(0); // Текущая выбранная скважина
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = useState<String[]>([]); // Массив с фильтрами: БУР, ОСВ, ABN

  useEffect(() => {
    setEventFilters([]);
    setIsGenPlanFilterOn(false);
  }, [wellId]);

  return (
    <>
      <Routes>
        {/* TODO: Избавиться от дубляжа Header */}
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
