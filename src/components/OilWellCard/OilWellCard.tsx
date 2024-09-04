import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip/Chip";
import { useEffect, useState } from "react";
import { IEvent } from "../../interfaces/IEvent";

export default function OilWellCard({
  wellWithSiteData,
  onWellIdChange,
  wellId,
  onIsGenPlanFilterOnChange,
  eventFilters,
  onEventFiltersChange,
}: {
  wellWithSiteData: any;
  onWellIdChange: Function;
  wellId: number;
  onIsGenPlanFilterOnChange: Function;
  eventFilters: any;
  onEventFiltersChange: Function;
}) {
  const [uniqueEvents, setUniqueEvents] = useState([]);

  const spudDateLocal = new Date(wellWithSiteData?.spudDate).toLocaleDateString(
    "ru-RU",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  useEffect(() => {
    fetch(
      `https://edmrest.emeryone.com/Universal/DmEventT/wellId/${wellId}/?fields=wellId,eventId,eventCode`
    )
      .then((res) => {
        return res.json();
      })
      .then((events) => {
        const uniqueEvents = events
          ?.map((event: IEvent) => event?.eventCode)
          .filter((x: any, i: any, a: any) => a.indexOf(x) === i);
        setUniqueEvents(uniqueEvents);
      });
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        sx={{
          border:
            wellId === wellWithSiteData?.wellId ? "1px solid #1976d2" : "",
        }}
        variant="outlined"
      >
        <React.Fragment>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Куст: {wellWithSiteData?.siteName}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              onClick={() => onWellIdChange(wellWithSiteData?.wellId)}
              sx={{
                cursor: "pointer",
                display: "inline-block",
                mb: 1,
                ":hover": {
                  color: "text.primary",
                  textDecoration: "underline",
                },
              }}
            >
              Скважина: {wellWithSiteData?.wellCommonName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
              Проект: <br></br> {wellWithSiteData?.reason || "Нет данных"}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Дата забуривания: <br></br>{" "}
              {wellWithSiteData?.spudDate ? spudDateLocal : "Нет данных"}
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
              {uniqueEvents?.map((uniqueEvent) => (
                <Chip
                  label={uniqueEvent}
                  key={uniqueEvent}
                  color="primary"
                  variant={
                    eventFilters.includes(uniqueEvent) &&
                    wellId === wellWithSiteData?.wellId
                      ? "filled"
                      : "outlined"
                  }
                  sx={{ paddingX: "10px", cursor: "pointer" }}
                  onClick={() => {
                    let nextCurrentFilters = [...eventFilters];
                    if (nextCurrentFilters.includes(uniqueEvent)) {
                      nextCurrentFilters.splice(
                        nextCurrentFilters.indexOf(uniqueEvent),
                        1
                      );
                    } else {
                      nextCurrentFilters.push(uniqueEvent);
                    }

                    onWellIdChange(wellWithSiteData?.wellId);
                    onEventFiltersChange(nextCurrentFilters);
                  }}
                />
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                onWellIdChange(wellWithSiteData?.wellId);
                onIsGenPlanFilterOnChange(true);
              }}
            >
              План
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                onWellIdChange(wellWithSiteData?.wellId);
                onIsGenPlanFilterOnChange(false);
                onEventFiltersChange([]);
              }}
            >
              Все отчеты
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
