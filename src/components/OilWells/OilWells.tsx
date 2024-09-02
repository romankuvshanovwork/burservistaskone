import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Padding } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ruRU } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import OilWellCard from "../OilWellCard/OilWellCard";
import TablePagination from "@mui/material/TablePagination/TablePagination";

export default function OilWells() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ paddingX: "30px", paddingY: "10px", display: "flex", flexWrap: 'wrap' }}>
      <Box sx={{ maxWidth: "100%",  flexShrink: 1 }}>
        <Typography variant="h6" gutterBottom>
          Харасавэйское месторождение
        </Typography>
        <Box sx={{overflowY: "hidden", overflowX: "scroll",}}>
          <Box sx={{ display: "flex", gap: "25px" }}>
            {[0, 1, 2, 3, 4,]
              .map(() => <OilWellCard />)
              .slice(page, rowsPerPage)}
          </Box>
        </Box>
        <TablePagination
          component="div"
          count={5}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>

      <LocalizationProvider
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterDayjs}
      >
        <DateCalendar
          sx={{ marginRight: "0", flexShrink: 0 }}
          defaultValue={dayjs()}
        />
      </LocalizationProvider>
    </Box>
  );
}
