import * as React from "react";
import Box from "@mui/material/Box";
import OilWellCard from "../OilWellCard/OilWellCard";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IWell } from "../../interfaces/IWell";
import { ISite } from "../../interfaces/ISite";
import LoadingMessage from "../UI/LoadingMessage/LoadingMessage";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import CurrentWellTitle from "../UI/CurrentWellTitle/CurrentWellTitle";
import Calendar from "../UI/Calendar/Calendar";
import NoWellsMessage from "../UI/NoWellsMessage/NoWellsMessage";
import { BASE_URL } from "../../constants/baseURL";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [wellsWithSiteData, setWellsWithSiteData] = useState<any[]>([]);

  const routeParams = useParams();
  const location = useLocation();

  const projectName = location?.state?.projectName;
  const projectId = routeParams?.projectId;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch(
      `${BASE_URL}/Universal/CdSiteSource/projectId/${projectId}/?fields=projectId,siteId,siteName`
    )
      .then((res) => {
        return res.json();
      })
      .then((sites) => {
        const allSites = sites.map((site: ISite) => site?.siteId).join();

        if (allSites) {
          fetch(
            `${BASE_URL}/Universal/CdWellSource/siteId/${allSites}/?fields=siteId,wellCommonName,wellId,spudDate,reason`
          )
            .then((res) => {
              return res.json();
            })
            .then((wells) => {
              onCurrentWellIdChange(wells[0]?.wellId);
              setWellsWithSiteData(
                wells.map((well: IWell) => ({
                  ...well,
                  ...sites.find((site: ISite) => site.siteId === well.siteId),
                }))
              );
            });
        } else {
          setWellsWithSiteData([]);
          onCurrentWellIdChange(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [projectId]);

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
