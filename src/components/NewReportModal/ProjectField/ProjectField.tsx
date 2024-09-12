import TextField from "@mui/material/TextField/TextField";
import { Controller, Control } from "react-hook-form";

export default function ProjectField({
  control,
  defaultValue = "",
}: {
  control: Control;
  defaultValue: string;
}) {
  return (
    <Controller
      name="projectId"
      control={control}
      defaultValue={defaultValue}
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
  );
}
