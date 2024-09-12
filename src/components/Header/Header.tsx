import { useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderTitle from "../UI/HeaderTitle/HeaderTitle";
import HeaderSearch from "../UI/HeaderSearch/HeaderSearch";
import { useProjects } from "../../api/useProjects";

export default function Header() {
  const [serachQuery, setSearchQuery] = useState<string>();
  const routeParams = useParams();
  const navigate = useNavigate();
  const projects = useProjects();

  const firstProject = projects?.[0];
  if (!routeParams?.projectId)
    navigate(`/projectId/${firstProject?.projectId}`, {
      state: { projectName: firstProject?.projectName },
    });

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
              {/* TODO: Подумать, посмотреть стоит ли выносить в отдельный компонент */}
              {filteredProjects.map((project) => (
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
          <HeaderSearch onChange={(e: any) => setSearchQuery(e.target.value)} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
