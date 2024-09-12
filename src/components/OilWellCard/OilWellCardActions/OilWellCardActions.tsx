import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip/Chip";
import { IWellWithSiteData } from "../../../interfaces/IWellWithSiteData";

export default function OilWellCardActions({
  uniqueEvents,
  eventFilters,
  currentWellId,
  wellWithSiteData,
  activateTypeFilter,
  activateGenPlanFilter,
  resetAllFilters,
}: {
  uniqueEvents: string[];
  eventFilters: String[];
  currentWellId: String;
  wellWithSiteData: IWellWithSiteData;
  activateTypeFilter: Function;
  activateGenPlanFilter: Function;
  resetAllFilters: Function;
}) {
  return (
    <CardActions
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: "25px",
        paddingTop: "2px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBottom: "5px",
          minHeight: "32px",
          cursor: "text",
          marginLeft: "8px",
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
      <Box sx={{ marginLeft: "0!important" }}>
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
      </Box>
    </CardActions>
  );
}
