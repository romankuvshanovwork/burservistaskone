import { useEffect, useState } from "react";
import "./App.css";
import OilWells from "./components/OilWells/OilWells";
import TableSection from "./components/TableSection/TableSection";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import OilWellsLayout from "./components/OilWells/OilWellsLayout/OilWellsLayout";
import { useAllData } from "./api/useAllData";
import { IReport } from "./interfaces/IReport";

function App() {
  const [currentWellId, setCurrentWellId] = useState<String>(""); // Текущая выбранная скважина
  const [currentSiteId, setCurrentSiteId] = useState<String>(""); // Текущий выбранный куст
  const [isGenPlanFilterOn, setIsGenPlanFilterOn] = useState(false); // Включен ли фильтр по ген. плану
  const [eventFilters, setEventFilters] = useState<String[]>([]); // Массив с фильтрами: БУР, ОСВ, ABN

  const [allReportsData, setAllReportsData] = useState<IReport[]>([]);
  const { allProjects, allSites, allWells, allReports, isLoading, isError } = useAllData();

  useEffect(() => setAllReportsData(allReports), [allReports]);

  console.log('allProjects');
  console.log(allProjects);
  console.log('allSites');
  console.log(allSites);
  console.log('allWells');
  console.log(allWells);
  console.log('allReports');
  console.log(allReports);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="projectId/:projectId"
          element={
            <>
              <OilWellsLayout>
                <OilWells
                  currentWellId={currentWellId}
                  onCurrentWellIdChange={setCurrentWellId}
                  onIsGenPlanFilterOnChange={setIsGenPlanFilterOn}
                  eventFilters={eventFilters}
                  onEventFiltersChange={setEventFilters}
                  onCurrentSiteIdChange={setCurrentSiteId}
                />
              </OilWellsLayout>
              <TableSection
                currentWellId={currentWellId}
                isGenPlanFilterOn={isGenPlanFilterOn}
                eventFilters={eventFilters}
                allReportsData={allReportsData}
                onAllReportsDataChange={setAllReportsData}
                currentSiteId={currentSiteId}
                isLoading={isLoading}
                isError={isError}
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
