import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip/Chip";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseURL";

export default function OilWellCard({
  wellWithSiteData,
  onCurrentWellIdChange,
  currentWellId,
  onIsGenPlanFilterOnChange,
  eventFilters,
  onEventFiltersChange,
}: {
  wellWithSiteData: any;
  onCurrentWellIdChange: Function;
  currentWellId: String;
  onIsGenPlanFilterOnChange: Function;
  eventFilters: String[];
  onEventFiltersChange: Function;
}) {
  const [uniqueEvents, setUniqueEvents] = useState<string[]>([]);
  const [eventCache, setEventCache] = useState<{ [key: string]: string[] }>({});

  const spudDateLocal = new Date(wellWithSiteData?.spudDate).toLocaleDateString(
    "ru-RU",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  function resetAllFilters() {
    onCurrentWellIdChange(wellWithSiteData?.wellId);
    onIsGenPlanFilterOnChange(false);
    onEventFiltersChange([]);
  }

  function activateGenPlanFilter() {
    if (currentWellId !== wellWithSiteData?.wellId) {
      onEventFiltersChange([]);
      onCurrentWellIdChange(wellWithSiteData?.wellId);
    }
    onIsGenPlanFilterOnChange(true);
  }

  function activateTypeFilter(uniqueEvent: string) {
    let nextCurrentFilters = [...eventFilters];
    if (currentWellId !== wellWithSiteData?.wellId) {
      nextCurrentFilters = [];
      onIsGenPlanFilterOnChange(false);
    }
    if (nextCurrentFilters.includes(uniqueEvent)) {
      nextCurrentFilters.splice(nextCurrentFilters.indexOf(uniqueEvent), 1);
    } else {
      nextCurrentFilters.push(uniqueEvent);
    }

    onCurrentWellIdChange(wellWithSiteData?.wellId);
    onEventFiltersChange(nextCurrentFilters);
  }

  useEffect(() => {
    if (eventCache[wellWithSiteData?.wellId]) {
      setUniqueEvents(eventCache[wellWithSiteData?.wellId]);
    } else {
      fetch(
        `${BASE_URL}/Universal/DmEventT/wellId/${wellWithSiteData?.wellId}/?fields=wellId,eventId,eventCode`
      )
        .then((res) => res.json())
        .then((events) => {
          const uniqueEventCodes = events
            ?.map((event: any) => event?.eventCode)
            ?.filter((x: any, i: any, a: any) => a.indexOf(x) === i)
            ?.filter((event: string) => event);
          // Cache the data
          setEventCache((prevCache) => ({
            ...prevCache,
            [wellWithSiteData?.wellId]: uniqueEventCodes,
          }));
          setUniqueEvents(uniqueEventCodes);
        })
        .catch(() => {});
    }
  }, [wellWithSiteData?.wellId, eventCache]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        onClick={() => onCurrentWellIdChange(wellWithSiteData?.wellId)}
        sx={{
          border:
            currentWellId === wellWithSiteData?.wellId
              ? "1px solid #1976d2"
              : "",
          cursor: "pointer",
        }}
        variant="outlined"
      >
        <React.Fragment>
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                display: "inline-block",
                color: "text.secondary",
                fontSize: 14,
                cursor: "text",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              Куст: {wellWithSiteData?.siteName}
            </Typography>
            <br></br>
            <Typography
              variant="h5"
              component="div"
              onClick={(event) => event.stopPropagation()}
              sx={{
                display: "inline-block",
                mb: 1,
                cursor: "text",
              }}
            >
              Скважина: {wellWithSiteData?.wellCommonName}
            </Typography>
            <br></br>
            <Typography
              sx={{
                display: "inline-block",
                color: "text.secondary",
                mb: 0.5,
                cursor: "text",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              Проект: <br></br> {wellWithSiteData?.reason || "Нет данных"}
            </Typography>
            <br></br>
            <Typography
              sx={{
                display: "inline-block",
                color: "text.secondary",
                mb: 1.5,
                cursor: "text",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              Дата забуривания: <br></br>{" "}
              {wellWithSiteData?.spudDate ? spudDateLocal : "Нет данных"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginBottom: "5px",
                minHeight: "32px",
                cursor: "text",
              }}
            >
              {uniqueEvents?.map((uniqueEvent: string) => (
                <Chip
                  label={uniqueEvent}
                  key={uniqueEvent}
                  color="primary"
                  variant={
                    eventFilters.includes(uniqueEvent) &&
                    currentWellId === wellWithSiteData?.wellId
                      ? "filled"
                      : "outlined"
                  }
                  sx={{ paddingX: "10px", cursor: "pointer" }}
                  onClick={() => activateTypeFilter(uniqueEvent)}
                />
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => activateGenPlanFilter()}
            >
              План
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => resetAllFilters()}
            >
              Все отчеты
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
