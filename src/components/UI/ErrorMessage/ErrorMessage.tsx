import Typography from "@mui/material/Typography/Typography";

export default function ErrorMessage({
  errorMessage = "Произошла сетевая ошибка. Пожалуйста, проверьте сетевое соединение. Или повторите попытку позднее.",
}: {
  errorMessage: string;
}) {
  return (
    <Typography variant="body1" gutterBottom>
      {errorMessage}
    </Typography>
  );
}
