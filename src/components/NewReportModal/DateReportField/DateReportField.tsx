import { Controller, Control, FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";

export default function DateReportField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
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
            errors.dateReport ? (errors.dateReport.message as string) : ""
          }
        />
      )}
    />
  );
}
