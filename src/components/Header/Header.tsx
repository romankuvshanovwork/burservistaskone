import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

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

const pages = [
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

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>
          <Box
            sx={{ overflowX: "auto", overflowY: "hidden", marginX: "30px", display: "flex" }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                flexShrink: 0,
                flexWrap: "nowrap",
                columnGap: "5px"
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page?.projectId}
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", whiteSpace: "nowrap", textAlign: "center" }}
                >
                  {page?.projectName}
                </Button>
              ))}
            </Box>
          </Box>
          <Search
            sx={{ display: { xs: "none", sm: "block", marginLeft: "20px" } }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
