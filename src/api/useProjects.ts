import { useState, useEffect } from "react";
import { IProject } from "../interfaces/IProject";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";

export function useProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Universal/CdProjectSource?fields=projectName,projectId`)
      .then(function (response) {
        setProjects(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching projects:", error);
      });
  }, []);
  return projects;
}
