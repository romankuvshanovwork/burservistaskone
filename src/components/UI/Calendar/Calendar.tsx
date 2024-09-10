import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function Calendar() {
  const [calendarDate, setCalendarDate] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          marginRight: "0",
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
        }}
        value={calendarDate}
        onChange={(newValue) => setCalendarDate(newValue)}
      />
    </LocalizationProvider>
  );
}
