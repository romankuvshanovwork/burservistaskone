import { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderTitle from "../UI/HeaderTitle/HeaderTitle";
import HeaderSearch from "../UI/HeaderSearch/HeaderSearch";
import { useProjects } from "../../api/useProjects";
import ProjectButtons from "./ProjectButtons/ProjectButtons";

export default function Header() {
  const [serachQuery, setSearchQuery] = useState<string>("");
  const routeParams = useParams();
  const navigate = useNavigate();
  const projects = useProjects();

  useEffect(() => {
    const firstProject = projects?.[0];
    if (!routeParams?.projectId && firstProject?.projectId)
      navigate(`/projectId/${firstProject?.projectId}`, {
        state: { projectName: firstProject?.projectName },
      });
  }, [navigate, projects, routeParams?.projectId]);

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
          <HeaderTitle title="MUI" />
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
              <ProjectButtons filteredProjects={filteredProjects} />
            </Box>
          </Box>
          <HeaderSearch onChange={(e: any) => setSearchQuery(e.target.value)} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
