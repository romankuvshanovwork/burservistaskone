import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import useUniqueEvents from "../../api/useUniqueEvents";
import OilWellCardContent from "./OilWellCardContent/OilWellCardContent";
import OilWellCardActions from "./OilWellCardActions/OilWellCardActions";

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
  const { uniqueEvents } = useUniqueEvents(wellWithSiteData?.wellId);

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
        <OilWellCardContent wellWithSiteData={wellWithSiteData} />
        <OilWellCardActions
          uniqueEvents={uniqueEvents}
          eventFilters={eventFilters}
          currentWellId={currentWellId}
          wellWithSiteData={wellWithSiteData}
          activateTypeFilter={activateTypeFilter}
          activateGenPlanFilter={activateGenPlanFilter}
          resetAllFilters={resetAllFilters}
        />
      </Card>
    </Box>
  );
}
