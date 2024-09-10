import * as React from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import CurrentWellTitle from "../../UI/CurrentWellTitle/CurrentWellTitle";
import Calendar from "../../UI/Calendar/Calendar";

export default function OilWellsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const projectName = location?.state?.projectName;

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
        {children}
      </Box>
      <Calendar />
    </Box>
  );
}
