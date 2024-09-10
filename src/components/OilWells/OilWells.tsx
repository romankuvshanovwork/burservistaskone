import * as React from "react";
import Box from "@mui/material/Box";
import OilWellCard from "../OilWellCard/OilWellCard";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingMessage from "../UI/LoadingMessage/LoadingMessage";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import CurrentWellTitle from "../UI/CurrentWellTitle/CurrentWellTitle";
import Calendar from "../UI/Calendar/Calendar";
import NoWellsMessage from "../UI/NoWellsMessage/NoWellsMessage";
import { useWellsWithSiteData } from "../../api/useWellsWithSiteData";

function calculateRowsPerPage(width: number) {
  return width >= 600 ? Math.round((width - 380) / 300) : 1;
}

export default function OilWells({
  currentWellId,
  onCurrentWellIdChange,
  onIsGenPlanFilterOnChange,
  onEventFiltersChange,
  eventFilters,
}: {
  currentWellId: String;
  onCurrentWellIdChange: Function;
  onIsGenPlanFilterOnChange: Function;
  onEventFiltersChange: Function;
  eventFilters: String[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    calculateRowsPerPage(window.innerWidth)
  );

  const routeParams = useParams();
  const location = useLocation();

  const projectName = location?.state?.projectName;
  const projectId = routeParams?.projectId;

  const { wellsWithSiteData, loading, error } = useWellsWithSiteData(
    onCurrentWellIdChange,
    projectId
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const nextRowsPerPage = calculateRowsPerPage(width);
      setRowsPerPage(nextRowsPerPage);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        paddingX: "30px",
        paddingY: "10px",
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <Box sx={{ maxWidth: "100%", flexShrink: 1, minWidth: "275px" }}>
        <CurrentWellTitle title={projectName} />

        {loading ? (
          <LoadingMessage loadingMessage="Загрузка... Пожалуйста, подождите." />
        ) : error ? (
          <ErrorMessage errorMessage="Произошла сетевая ошибка. Пожалуйста, проверьте сетевое соединение. Или повторите попытку позднее." />
        ) : wellsWithSiteData.length > 0 ? (
          <>
            <Box sx={{ overflowY: "hidden", overflowX: "hidden" }}>
              <Box sx={{ display: "flex", gap: "25px" }}>
                {wellsWithSiteData
                  .map((wellWithSiteData) => (
                    <OilWellCard
                      key={
                        wellWithSiteData?.projectId +
                        wellWithSiteData?.siteId +
                        wellWithSiteData?.wellId
                      }
                      currentWellId={currentWellId}
                      onCurrentWellIdChange={onCurrentWellIdChange}
                      wellWithSiteData={wellWithSiteData}
                      onIsGenPlanFilterOnChange={onIsGenPlanFilterOnChange}
                      eventFilters={eventFilters}
                      onEventFiltersChange={onEventFiltersChange}
                    />
                  ))
                  .slice(page * rowsPerPage)}
              </Box>
            </Box>
            {wellsWithSiteData?.length > 3 && (
              <TablePagination
                component="div"
                count={wellsWithSiteData?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
              />
            )}
          </>
        ) : (
          <NoWellsMessage noWellsMessage="Нет скважин по этому месторождению. Пожалуйста, выберите другое месторождение." />
        )}
      </Box>
      <Calendar />
    </Box>
  );
}
