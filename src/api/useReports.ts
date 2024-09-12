import { useState, useEffect } from "react";
import { IReport } from "../interfaces/IReport";
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";

const useReports = (currentWellId: string) => {
  const [data, setData] = useState<IReport[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!data?.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        if (!currentWellId) {
          setData([]);
          setRowCount(0);
        } else {
          const response = await axios.get(
            `${BASE_URL}/Universal/DmReportJournal/wellId/${currentWellId}/?fields=eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo`
          );
          setData(response.data);
          setRowCount(response.data.length);
        }
        setIsError(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsRefetching(false);
      }

      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();
  }, [currentWellId, data?.length]);

  return { data, isError, isLoading, isRefetching, rowCount };
};

export default useReports;
