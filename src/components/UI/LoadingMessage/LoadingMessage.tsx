import Typography from "@mui/material/Typography/Typography";

export default function LoadingMessage({
  loadingMessage = "Загрузка... Пожалуйста, подождите.",
}: {
  loadingMessage: string;
}) {
  return (
    <Typography variant="body1" gutterBottom>
      {loadingMessage}
    </Typography>
  );
}
