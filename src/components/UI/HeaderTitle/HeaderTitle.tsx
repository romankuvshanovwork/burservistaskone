import Typography from "@mui/material/Typography/Typography";

export default function HeaderTitle({ title = "MUI" }: { title: string }) {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {title}
    </Typography>
  );
}
