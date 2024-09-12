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
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/Universal/CdProjectSource?fields=projectName,projectId`)
      .then(function (response) {
        setAllProjects(response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(function (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching sites:", error);
      });
  }, [allProjects]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching wells:", error);
      });
  }, [allSites]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching reports:", error);
      });
  }, [allWells]);

  return { allProjects, allSites, allWells, allReports, isLoading, isError };
}
