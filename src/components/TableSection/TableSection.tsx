import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
} from "material-react-table";
import Box from "@mui/material/Box";
import { IReport } from "../../interfaces/IReport";
import { reports } from "../../constants/reports";
import TableSectionTitle from "../UI/TableSectionTitle/TableSectionTitle";
import { genPlanFilter } from "../../constants/genPlanFilter";

const TableSection = ({
  currentWellId,
  isGenPlanFilterOn,
  eventFilters,
}: {
  currentWellId: String;
  isGenPlanFilterOn?: boolean;
  eventFilters: String[];
}) => {
  // Data and fetching state
  const [data, setData] = useState<IReport[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const filters = [];
    if (eventFilters?.length) {
      filters.push({
        id: "eventCode",
        value: Array.isArray(eventFilters) ? eventFilters : [eventFilters],
      });
    }
    if (isGenPlanFilterOn) {
      filters.push(genPlanFilter);
    }
    setColumnFilters(filters);
  }, [isGenPlanFilterOn, eventFilters]);

  useEffect(() => {
    const fetchData = async () => {
      if (!data?.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await fetch(
          `https://edmrest.emeryone.com/Universal/DmReportJournal/wellId/${currentWellId}/?fields=eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo`
        );
        const json = (await response.json()) as IReport[];
        setData(json);
        setRowCount(json.length);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, globalFilter, currentWellId]);

  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        accessorKey: "reportAlias",
        header: "Тип",
        size: 100,
        enableSorting: false,
        filterVariant: "text",
        Cell: ({ cell }) =>
          reports.find((report) => report?.alias === cell.getValue())?.type ||
          "Нет данных",
      },
      {
        accessorKey: "dateReport",
        header: "Дата",
        size: 130,
        accessorFn: (row) => new Date(row.dateReport),
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
      },
      {
        accessorKey: "reportNo",
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
        filterVariant: "text",
        Cell: ({ cell }) => cell.getValue<String>() || "Нет данных",
      },
      {
        accessorKey: "eventCode",
        header: "Мероприятие",
        size: 100,
        enableResizing: false,
        enableSorting: false,
        filterVariant: "multi-select",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnActions: false,
    enableTopToolbar: true,
    enableToolbarInternalActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    manualFiltering: false,
    enableColumnFilters: false,
    manualSorting: false,
    enableFacetedValues: true,
    initialState: {
      sorting: [
        {
          id: "dateReport",
          desc: true,
        },
      ],
      showColumnFilters: true,
    },
    positionToolbarDropZone: "none",
    muiTopToolbarProps: {
      sx: {
        minHeight: "5px",
      },
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });

  return (
    <Box sx={{ paddingX: "30px", paddingY: "10px", marginBottom: "25px" }}>
      <TableSectionTitle title="Отчеты" />
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TableSection;
