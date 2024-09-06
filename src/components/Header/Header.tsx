import { useEffect, useMemo, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IProject } from "../../interfaces/IProject";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

export default function Header() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [serachQuery, setSearchQuery] = useState<string>();
  const routeParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://edmrest.emeryone.com/Universal/CdProjectSource?fields=projectName,projectId"
    )
      .then((res) => {
        return res.json();
      })
      .then((projects) => {
        setProjects(projects);
        const firstProject = projects?.[0];
        if (!routeParams?.projectId)
          navigate(`/projectId/${firstProject?.projectId}`, {
            state: { projectName: firstProject?.projectName },
          });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        serachQuery
          ? project?.projectName
              ?.toLowerCase()
              .includes(serachQuery.toLowerCase())
          : true
      ),
    [projects, serachQuery]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>
          <Box
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              marginX: "30px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                flexShrink: 0,
                flexWrap: "nowrap",
                columnGap: "5px",
              }}
            >
              {filteredProjects
                .map((project) => (
                  <Button
                    component={RouterLink}
                    to={`/projectId/${project?.projectId}`}
                    state={{ projectName: project?.projectName }}
                    key={project?.projectId}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {project?.projectName}
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
