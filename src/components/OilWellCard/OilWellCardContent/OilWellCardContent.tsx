import Typography from "@mui/material/Typography/Typography";
import CardContent from "@mui/material/CardContent";
import { IWellWithSiteData } from "../../../interfaces/IWellWithSiteData";

export default function OilWellCardContent({
  wellWithSiteData,
}: {
  wellWithSiteData: IWellWithSiteData;
}) {
  const spudDateLocal = new Date(
    wellWithSiteData?.spudDate || ""
  ).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <CardContent sx={{ paddingBottom: 0 }}>
      <Typography
        gutterBottom
        sx={{
          display: "inline-block",
          color: "text.secondary",
          fontSize: 14,
          cursor: "text",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        Куст: {wellWithSiteData?.siteName}
      </Typography>
      <br></br>
      <Typography
        variant="h5"
        component="div"
        onClick={(event) => event.stopPropagation()}
        sx={{
          display: "inline-block",
          mb: 1,
          cursor: "text",
        }}
      >
        Скважина: {wellWithSiteData?.wellCommonName}
      </Typography>
      <br></br>
      <Typography
        sx={{
          display: "inline-block",
          color: "text.secondary",
          mb: 0.5,
          cursor: "text",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        Проект: <br></br> {wellWithSiteData?.reason || "Нет данных"}
      </Typography>
      <br></br>
      <Typography
        sx={{
          display: "inline-block",
          color: "text.secondary",
          mb: 1.5,
          cursor: "text",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        Дата забуривания: <br></br>{" "}
        {wellWithSiteData?.spudDate ? spudDateLocal : "Нет данных"}
      </Typography>
    </CardContent>
  );
}
