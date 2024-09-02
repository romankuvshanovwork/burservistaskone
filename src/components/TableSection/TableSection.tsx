import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//example data type
type Person = {
  type: string;
  date: string;
  number: string;
  description: string;
  event: string;
//   Проверить согласованность наименований
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    type: "Суточный",
    date: "01.04.2024",
    number: "46",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "01.03.2024",
    number: "45",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "01.02.2024",
    number: "44",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "01.01.2024",
    number: "43",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "12.31.2023",
    number: "42",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "12.30.2023",
    number: "41",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
  {
    type: "Суточный",
    date: "12.29.2023",
    number: "40",
    description: "ВМР. Движка БУ 15м, на скважину 2075",
    event: "ВМР",
  },
];

const TableSection = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "type", //access nested data with dot notation
        header: "Тип",
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "date",
        header: "Дата",
        size: 130,
        accessorFn: (row) => new Date(row.date),
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
      },
      {
        accessorKey: "number", //normal accessorKey
        header: "№",
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: "description",
        header: "Описание",
        size: 200,
        enableSorting: false,
        grow: true,
      },
      {
        accessorKey: "event",
        header: "Мероприятие",
        size: 100,
        enableResizing: false,
        enableSorting: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableTopToolbar: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    initialState: {
        sorting: [
          {
            id: 'date', //sort by age by default on page load
            desc: true,
          },
        ],
      },
  });

  return (
    <Box sx={{ paddingX: "30px", paddingY: "10px", marginBottom: "25px" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#4466aa", marginBottom: "5px" }}
      >
        Отчеты
      </Typography>
      <MaterialReactTable table={table}  />
    </Box>
  );
};

export default TableSection;
