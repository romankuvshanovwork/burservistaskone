import { IProject } from "../../../interfaces/IProject";
import Button from "@mui/material/Button/Button";
import { Link as RouterLink } from "react-router-dom";

export default function ProjectButtons({
  filteredProjects,
}: {
  filteredProjects: IProject[];
}) {
  return (
    <>
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
    </>
  );
}
