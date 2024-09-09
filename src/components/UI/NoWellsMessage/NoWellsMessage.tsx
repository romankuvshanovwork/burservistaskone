import Typography from "@mui/material/Typography/Typography";

export default function NoWellsMessage({
  noWellsMessage = "Нет скважин по этому месторождению. Пожалуйста, выберите другое месторождение.",
}: {
  noWellsMessage: string;
}) {
  return (
    <Typography variant="body1" gutterBottom>
      {noWellsMessage}
    </Typography>
  );
}
