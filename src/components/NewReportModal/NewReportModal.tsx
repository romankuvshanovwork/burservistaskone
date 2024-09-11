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

export default function NewReportModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
                defaultValue="Харасавэйское ГКМ"
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
                defaultValue="21"
                render={({ field }) => (
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="site-id-select-label">Куст</InputLabel>
                    <Select
                      {...field}
                      labelId="site-id-select-label"
                      id="site-id-select"
                      label="Куст"
                    >
                      <MenuItem value={"21"}>21</MenuItem>
                      <MenuItem value={"7"}>7</MenuItem>
                      <MenuItem value={"20"}>20</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="wellId"
                control={control}
                defaultValue="3uj7VcguFo"
                render={({ field }) => (
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="well-id-select-label">Скважина</InputLabel>
                    <Select
                      {...field}
                      labelId="well-id-select-label"
                      id="well-id-select"
                      label="Скважина"
                    >
                      <MenuItem value={"3uj7VcguFo"}>Скважина: 2214</MenuItem>
                      <MenuItem value={"AJS9ZGKaWg"}>Скважина: 2212</MenuItem>
                      <MenuItem value={"HAU3vQ3CuY"}>Скважина: 2213</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="entityType"
                control={control}
                defaultValue="DDR"
                render={({ field }) => (
                  <FormControl margin="normal" fullWidth>
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
                  </FormControl>
                )}
              />
              <Controller
                name="dateReport"
                control={control}
                defaultValue={new Date().toISOString().substring(0, 10)}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Дата"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="reportNo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="№"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Описание"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="eventCode"
                control={control}
                defaultValue="БУР"
                render={({ field }) => (
                  <FormControl margin="normal" fullWidth>
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
