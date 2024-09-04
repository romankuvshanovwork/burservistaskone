import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";
import { IWell } from "./interfaces/IWell";

// TODO: Посмотреть race conditions
// TODO: Проверить DRY везде
// TODO: Добавить вопросы в комментарии

function App() {
  // TODO: Удалить перед отправкой
  const [curentWell, setCurrentWell] = React.useState<IWell>(); // Cкважина
  const [wellId, setWellId] = React.useState(0); // Текущая выбранная скважина
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = React.useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = React.useState([]); // Массив с фильтрами

  return (
    <Routes>
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
  );
}

export default App;
