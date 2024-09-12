import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { IReport } from "../../interfaces/IReport";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSites } from "../../api/useSites";
import { useWells } from "../../api/useWells";
import NewReportModalTitle from "../UI/NewReportModalTitle/NewReportModalTitle";
import ProjectField from "./ProjectField/ProjectField";
import SiteField from "./SiteField/SiteField";
import WellField from "./WellField/WellField";
import ReportAliasField from "./ReportAliasField/ReportAliasField";
import DateReportField from "./DateReportField/DateReportField";
import ReportNoField from "./ReportNoField/ReportNoField";
import DescriptionField from "./DescriptionField/DescriptionField";
import EventCodeField from "./EventCodeField/EventCodeField";
import NewReportModalActionButtons from "./NewReportModalActionButtons/NewReportModalActionButtons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "scroll",
  overflowX: "hidden",
  maxHeight: "80%",
  p: 4,
};

export default function NewReportModal({
  onAllReportsDataChange,
  currentSiteId,
}: {
  onAllReportsDataChange: Function;
  currentSiteId: String;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const projectName = location?.state?.projectName;

  const routeParams = useParams();
  const projectId = routeParams?.projectId;

  const { sites } = useSites(projectId);
  const currentFormSiteId = watch("siteId");

  const { wells } = useWells(currentFormSiteId || currentSiteId);

  const onSubmit = (data: any) => {
    console.log(data);
    onAllReportsDataChange((reports: IReport[]) => [
      {
        reportJournalId: window?.crypto?.randomUUID()?.substring(0, 8) || "",
        wellId: data?.wellId,
        dateReport: data?.dateReport,
        reportNo: data?.reportNo,
        description: data?.description,
        // TODO: Исправить наименование констант, чтобы избежать конфликтов в наимнованиях
        // entityType:  reports.find(report => report?.alias === 'CASING')?.type,
        eventCode: data?.eventCode,
        reportAlias: data?.reportAlias,
      },
      ...reports,
    ]);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Создать отчет
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <NewReportModalTitle title="Создать отчет" id="modal-modal-title" />
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProjectField control={control} defaultValue={projectName} />
              <SiteField
                control={control}
                defaultValue={currentSiteId}
                errors={errors}
                sites={sites}
              />
              <WellField control={control} errors={errors} wells={wells} />
              <ReportAliasField control={control} errors={errors} />
              <DateReportField control={control} errors={errors} />
              <ReportNoField control={control} errors={errors} />
              <DescriptionField control={control} errors={errors} />
              <EventCodeField control={control} errors={errors} />

              <NewReportModalActionButtons handleClose={handleClose} />
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
