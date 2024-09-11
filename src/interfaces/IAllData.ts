import { IReport } from "./IReport";

export interface IAllData {
  projects: [
    {
      projectId: string;
      projectName: string;
      sites: [
        {
          siteId: string;
          projectId: string;
          siteName: string;
          wells: [
            {
              wellId: string;
              siteId: string;
              spudDate: string | null;
              reason: string;
              wellCommonName: string;
              report: IReport;
            }
          ];
        }
      ];
    }
  ];
}
