import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip/Chip";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        Куст: 2023
      </Typography>
      <Typography variant="h5" component="div">
        Скважина: 2072
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        Проект: 3
      </Typography>
      {/* Заменить на Grid? Спросить про dry здесь? */}
      <Box sx={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
        <Chip
          label="БУР"
          color="primary"
          variant="outlined"
          sx={{ paddingX: "10px" }}
        />
        <Chip
          label="ВМР"
          color="primary"
          variant="outlined"
          sx={{ paddingX: "10px" }}
        />
        <Chip
          label="ОСВ"
          color="primary"
          variant="outlined"
          sx={{ paddingX: "10px" }}
        />
      </Box>
    </CardContent>
    <CardActions>
      <Button variant="text" sx={{ fontWeight: "bold" }}>
        План
      </Button>
      <Button variant="text" sx={{ fontWeight: "bold" }}>
        Все отчеты
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OilWellCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
