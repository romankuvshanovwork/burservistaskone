import { Controller, Control, FieldErrors } from "react-hook-form";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import { eventTypes } from "../../../constants/eventTypes";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";

export default function EventCodeField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="eventCode"
      control={control}
      rules={{ required: "Мероприятие обязательно" }}
      defaultValue="БУР"
      render={({ field }) => (
        <FormControl margin="normal" fullWidth error={!!errors.eventCode}>
          <InputLabel id="event-code-select-label">Мероприятие</InputLabel>
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
  );
}
