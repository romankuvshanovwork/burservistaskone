import { useEffect, useState } from "react";
import { ISite } from "../interfaces/ISite";
import { IWell } from "../interfaces/IWell";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { IWellWithSiteData } from "../interfaces/IWellWithSiteData";

export function useWellsWithSiteData(
  onCurrentWellIdChange: Function,
  projectId?: string
) {
  const [wellsWithSiteData, setWellsWithSiteData] = useState<IWellWithSiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!wellsWithSiteData?.length) {
      setWellsWithSiteData([]);
      setLoading(true);
    }

    axios
      .get(
        `${BASE_URL}/Universal/CdSiteSource/projectId/${projectId}/?fields=projectId,siteId,siteName`
      )

      .then((response) => {
        const sites = response.data;
        const allSites = sites.map((site: ISite) => site?.siteId).join();

        if (allSites) {
          axios
            .get(
              `${BASE_URL}/Universal/CdWellSource/siteId/${allSites}/?fields=siteId,wellCommonName,wellId,spudDate,reason`
            )

            .then((response) => {
              const wells = response.data;
              onCurrentWellIdChange(wells[0]?.wellId);
              setWellsWithSiteData(
                wells.map((well: IWell) => ({
                  ...well,
                  ...sites.find((site: ISite) => site.siteId === well.siteId),
                }))
              );
            });
        } else {
          setWellsWithSiteData([]);
          onCurrentWellIdChange(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [onCurrentWellIdChange, projectId, wellsWithSiteData?.length]);

  return { wellsWithSiteData, loading, error };
}
