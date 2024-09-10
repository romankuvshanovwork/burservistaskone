import Typography from "@mui/material/Typography/Typography";

export default function CurrentWellTitle({ title = "" }: { title: string }) {
  return (
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
  );
}
