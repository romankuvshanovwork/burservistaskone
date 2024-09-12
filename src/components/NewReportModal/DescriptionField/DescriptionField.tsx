import { Controller, Control, FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";

export default function DescriptionField({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrors;
}) {
  return (
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
            errors.description ? (errors.description.message as string) : ""
          }
        />
      )}
    />
  );
}
