import FormControl from "@mui/material/FormControl/FormControl";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { reports } from "../../../constants/reports";

export default function ReportAliasField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="reportAlias"
      control={control}
      defaultValue="DDR"
      rules={{ required: "Тип отчета обязателен" }}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth error={!!errors.reportAlias}>
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
  );
}
