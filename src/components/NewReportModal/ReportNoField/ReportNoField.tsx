import { Controller, Control, FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";

export default function ReportNoField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
    <Controller
      name="reportNo"
      control={control}
      rules={{
        required: "№ обязателен",
        min: {
          value: 1,
          message: "№ должен быть целым числом больше нуля",
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
          helperText={errors.reportNo ? String(errors.reportNo.message) : ""}
          slotProps={{
            htmlInput: {
              min: 1,
            },
          }}
        />
      )}
    />
  );
}
