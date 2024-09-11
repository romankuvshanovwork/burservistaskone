import { useState, useEffect } from "react";
import { IProject } from "../interfaces/IProject";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { ISite } from "../interfaces/ISite";
import { IWell } from "../interfaces/IWell";
import { IReport } from "../interfaces/IReport";

export function useAllData() {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [allSites, setAllSites] = useState<ISite[]>([]);
  const [allWells, setAllWells] = useState<IWell[]>([]);
  const [allReports, setAllReports] = useState<IReport[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Universal/CdProjectSource?fields=projectName,projectId`)
      .then(function (response) {
        setAllProjects(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    const allProjectsAsString = allProjects
      .map((project: IProject) => project?.projectId)
      .filter((x, i, a) => a.indexOf(x) === i) // Filter: unique only
      .join();

    axios
      .get(
        `${BASE_URL}/Universal/CdSiteSource/projectId/${allProjectsAsString}/?fields=projectId,siteId,siteName`
      )
      .then((response) => {
        setAllSites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
      });
  }, [allProjects]);

  useEffect(() => {
    const allSitesAsString = allSites
      .map((site: ISite) => site?.siteId)
      .filter((x, i, a) => a.indexOf(x) === i) // Filter: unique only
      .join();

    axios
      .get(
        `${BASE_URL}/Universal/CdWellSource/siteId/${allSitesAsString}/?fields=siteId,wellCommonName,wellId,spudDate,reason`
      )
      .then((response) => {
        setAllWells(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wells:", error);
      });
  }, [allSites]);

  useEffect(() => {
    const allWellsAsString = allWells
      .map((well: IWell) => well?.wellId)
      .filter((x, i, a) => a.indexOf(x) === i) // Filter: unique only
      .join();

    axios
      .get(
        `${BASE_URL}/Universal/DmReportJournal/wellId/${allWellsAsString}/?fields=eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo`
      )
      .then((response) => {
        setAllReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, [allWells]);

  return { allProjects, allSites, allWells, allReports };
}
