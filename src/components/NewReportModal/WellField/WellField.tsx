import FormControl from "@mui/material/FormControl/FormControl";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { IWell } from "../../../interfaces/IWell";

export default function WellField({
  control,
  errors,
  wells = [],
}: {
  control: Control;
  errors: FieldErrors;
  wells: IWell[];
}) {
  return (
    <Controller
      name="wellId"
      control={control}
      defaultValue=""
      rules={{ required: "Скважина обязательна" }}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth error={!!errors.wellId}>
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
  );
}
