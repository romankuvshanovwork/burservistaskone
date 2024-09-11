import { useState, useEffect } from "react";
import { IProject } from "../interfaces/IProject";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { ISite } from "../interfaces/ISite";
import { IWell } from "../interfaces/IWell";
import { IReport } from "../interfaces/IReport";

export function useWells(siteId: string | undefined) {
  const [wells, setWells] = useState<IWell[]>([]);

  useEffect(() => {
    if (siteId) {
      axios
        .get(
          `${BASE_URL}/Universal/CdWellSource/siteId/${siteId}/?fields=siteId,wellCommonName,wellId,spudDate,reason`
        )
        .then((response) => {
          setWells(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wells:", error);
        });
    }
  }, [siteId]);

  return { wells };
}
