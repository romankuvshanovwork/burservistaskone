import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import OilWellCard from "../OilWellCard/OilWellCard";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IWell } from "../../interfaces/IWell";
import { ISite } from "../../interfaces/ISite";

export default function OilWells({
  wellId,
  onWellIdChange,
  onIsGenPlanFilterOnChange,
  onEventFiltersChange,
  eventFilters,
}: {
  wellId: number;
  onWellIdChange: Function;
  onIsGenPlanFilterOnChange: Function;
  onEventFiltersChange: Function;
  eventFilters: String[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [calendarDate, setCalendarDate] = React.useState<Dayjs | null>(dayjs());
  // TODO: Исправить React.useState на useState во всем проекте

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
      `https://edmrest.emeryone.com/Universal/CdSiteSource/projectId/${projectId}/?fields=projectId,siteId,siteName`
    )
      .then((res) => {
        return res.json();
      })
      .then((sites) => {
        const allSites = sites.map((site: ISite) => site?.siteId).join();

        if (allSites) {
          fetch(
            `https://edmrest.emeryone.com/Universal/CdWellSource/siteId/${allSites}/?fields=siteId,wellCommonName,wellId,spudDate,reason`
          )
            .then((res) => {
              return res.json();
            })
            .then((wells) => {
              onWellIdChange(wells[0]?.wellId);
              setWellsWithSiteData(
                wells.map((well: IWell) => ({
                  ...well,
                  ...sites.find((site: ISite) => site.siteId === well.siteId),
                }))
              );
            });
        } else {
          setWellsWithSiteData([]);
          onWellIdChange(0);
        }
      });
  }, [routeParams?.projectId]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const nextRowsPerPage = width >= 600 ? Math.round((width - 380) / 300) : 1;
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
        <Typography variant="h6" gutterBottom>
          {projectName}
        </Typography>

        {wellsWithSiteData.length > 0 ? (
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
                      wellId={wellId}
                      onWellIdChange={onWellIdChange}
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
          <Typography variant="body1" gutterBottom>
            Нет скважин по этому месторождению. Пожалуйста, выберите другое
            месторождение.
          </Typography>
        )}
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            marginRight: "0",
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
          }}
          value={calendarDate}
          onChange={(newValue) => setCalendarDate(newValue)}
        />
      </LocalizationProvider>
    </Box>
  );
}
