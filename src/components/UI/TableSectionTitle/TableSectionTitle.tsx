import Typography from "@mui/material/Typography/Typography";

export default function TableSectionTitle({
  title = "Отчеты",
}: {
  title: string;
}) {
  return (
    <Typography
      variant="h5"
      gutterBottom
      sx={{ color: "#1976d2", marginBottom: "5px" }}
    >
      {title}
    </Typography>
  );
}
