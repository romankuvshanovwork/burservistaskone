import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import FormControl from "@mui/material/FormControl/FormControl";
import { eventTypes } from "../../constants/eventTypes";
import { reports } from "../../constants/reports";
import { IReport } from "../../interfaces/IReport";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSites } from "../../api/useSites";
import { useWells } from "../../api/useWells";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";

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
  allReportsData,
  onAllReportsDataChange,
  currentSiteId,
}: {
  allReportsData: IReport[];
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
  const siteId = watch("siteId");

  const { wells } = useWells(siteId || currentSiteId);
  console.log("wells");
  console.log(wells);

  console.log("sites");
  console.log(sites);

  React.useEffect(() => {
    console.log("siteId");
    console.log(siteId);
    console.log("currentSiteId");
    console.log(currentSiteId);
  });

  const onSubmit = (data: any) => {
    console.log(data);
    onAllReportsDataChange((reports: IReport[]) => [data, ...reports]);
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
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* TODO: Выделить в отдельный headline (заголовок) */}
            Создать отчет
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* TODO: Выделить каждый Controller в отдельный компонент? */}
              <Controller
                name="projectId"
                control={control}
                defaultValue={projectName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Месторождение"
                    variant="outlined"
                    fullWidth
                    disabled
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="siteId"
                control={control}
                defaultValue={currentSiteId}
                rules={{ required: "Куст обязателен" }}
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    fullWidth
                    error={!!errors.siteId}
                  >
                    <InputLabel id="site-id-select-label">Куст</InputLabel>
                    <Select
                      {...field}
                      labelId="site-id-select-label"
                      id="site-id-select"
                      label="Куст"
                    >
                      {sites.map((site) => (
                        <MenuItem key={site.siteId} value={site.siteId}>
                          {site.siteName}
                        </MenuItem>
                      ))}
                    </Select>

                    {errors.siteId && (
                      <FormHelperText error>
                        {typeof errors.siteId.message === "string"
                          ? errors.siteId.message
                          : "Invalid selection"}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="wellId"
                control={control}
                defaultValue=""
                rules={{ required: "Скважина обязательна" }}
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    fullWidth
                    error={!!errors.wellId}
                  >
                    <InputLabel id="well-id-select-label">Скважина</InputLabel>
                    <Select
                      {...field}
                      labelId="well-id-select-label"
                      id="well-id-select"
                      label="Скважина"
                    >
                      {wells.map((well) => (
                        <MenuItem key={well.wellId} value={well.wellId}>
                          Скважина: {well.wellCommonName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.wellId && (
                      <FormHelperText error>
                        {typeof errors.wellId.message === "string"
                          ? errors.wellId.message
                          : "Invalid selection"}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="reportAlias"
                control={control}
                defaultValue="DDR"
                rules={{ required: "Тип отчета обязателен" }}
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    fullWidth
                    error={!!errors.reportAlias}
                  >
                    <InputLabel id="entity-type-select-label">Тип</InputLabel>
                    <Select
                      {...field}
                      labelId="entity-type-select-label"
                      id="entity-type-select"
                      label="Тип"
                    >
                      {reports.map((report) => (
                        <MenuItem key={report.alias} value={report.alias}>
                          {report.type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.reportAlias && (
                      <FormHelperText error>
                        {typeof errors.reportAlias?.message === "string"
                          ? errors.reportAlias?.message
                          : "Invalid selection"}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="dateReport"
                control={control}
                rules={{ required: "Дата обязательна" }}
                defaultValue={new Date().toISOString().substring(0, 10)}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Дата"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.dateReport}
                    helperText={
                      errors.dateReport ? String(errors.dateReport.message) : ""
                    }
                  />
                )}
              />
              <Controller
                name="reportNo"
                control={control}
                rules={{
                  required: "№ обязателен",
                  min: {
                    value: 0,
                    message: "№ должен быть целым числом не меньше нуля",
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="№"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.reportNo}
                    helperText={
                      errors.reportNo ? String(errors.reportNo.message) : ""
                    }
                    slotProps={{
                      htmlInput: {
                        min: 0,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Описание обязательно" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Описание"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    margin="normal"
                    error={!!errors.description}
                    helperText={
                      errors.description
                        ? String(errors.description.message)
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="eventCode"
                control={control}
                rules={{ required: "Мероприятие обязательно" }}
                defaultValue="БУР"
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    fullWidth
                    error={!!errors.eventCode}
                  >
                    <InputLabel id="event-code-select-label">
                      Мероприятие
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="event-code-select-label"
                      id="event-code-select"
                      label="Мероприятие"
                    >
                      {eventTypes.map((eventType) => (
                        <MenuItem key={eventType} value={eventType}>
                          {eventType}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.eventCode && (
                      <FormHelperText error>
                        {typeof errors.eventCode?.message === "string"
                          ? errors.eventCode?.message
                          : "Invalid selection"}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <Button onClick={handleClose} variant="text">
                  Отмена
                </Button>
                <Button type="submit" variant="contained">
                  Сохранить
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
