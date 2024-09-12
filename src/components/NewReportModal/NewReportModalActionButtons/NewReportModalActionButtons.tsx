import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";

export default function NewReportModalActionButtons({
  handleClose,
}: {
  handleClose: Function;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
        marginTop: "25px",
      }}
    >
      <Button onClick={() => handleClose()} variant="text">
        Отмена
      </Button>
      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </Box>
  );
}
