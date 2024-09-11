import { useState, useEffect } from "react";
import { IProject } from "../interfaces/IProject";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { ISite } from "../interfaces/ISite";
import { IWell } from "../interfaces/IWell";
import { IReport } from "../interfaces/IReport";

export function useSites(  projectId: string | undefined ) {
  const [sites, setSites] = useState<ISite[]>([]);

  useEffect(() => {
    if (projectId) {
      axios
        .get(
          `${BASE_URL}/Universal/CdSiteSource/projectId/${projectId}/?fields=projectId,siteId,siteName`
        )
        .then((response) => {
          setSites(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sites:", error);
        });
    }
  }, [projectId]);

  return { sites };
}
