import Typography from "@mui/material/Typography/Typography";

export default function NewReportModalTitle({
  title = "Создать отчет",
  id = "modal-modal-title",
}: {
  title?: string;
  id?: string;
}) {
  return (
    <Typography id={id} variant="h6" component="h2">
      {title}
    </Typography>
  );
}
