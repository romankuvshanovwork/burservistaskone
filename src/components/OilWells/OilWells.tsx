import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const oilFields = [
  {
    projectId: "2sIZcsJ7vO",
    projectName: "Харасавэйское ГКМ",
  },
  {
    projectId: "fwhEKhXAyx",
    projectName: "ытбю25",
  },
  {
    projectId: "GadwkSKXF1",
    projectName: "ж28эж7",
  },
  {
    projectId: "j8P03Tt0LJ",
    projectName: "Titonskaya",
  },
  {
    projectId: "KoljDdZQjR",
    projectName: "Platform P",
  },
  {
    projectId: "mSl520hysn",
    projectName: "Воронцовское",
  },
  {
    projectId: "NBeV0cKIPk",
    projectName: "Project #1",
  },
  {
    projectId: "ON13eb6Fur",
    projectName: "Field",
  },
  {
    projectId: "rktfcGyavc",
    projectName: "OiL",
  },
  {
    projectId: "TquV8ob4hi",
    projectName: "Train Field",
  },
  {
    projectId: "TuWhJstxXJ",
    projectName: "Уренгойское НГКМ",
  },
  {
    projectId: "zSxooZxvIF",
    projectName: "ODOPTU",
  },
];

let today = new Date().toISOString().slice(0, 10)

export default function OilWells() {
  return (
    <Box sx={{ paddingX: "30px", paddingY: "10px", display: "flex" }}>
      <Typography variant="h6" gutterBottom>
        Харасавэйское месторождение
      </Typography>
      <LocalizationProvider
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterDayjs}
      >
        <DateCalendar sx={{ marginRight: "0" }} defaultValue={dayjs()} />
      </LocalizationProvider>
    </Box>
  );
}
