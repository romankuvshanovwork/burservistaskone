import { useEffect, useMemo, useState } from "react";
import {
  createRow,
  MaterialReactTable,
  useMaterialReactTable,
  MRT_TableOptions,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
} from "material-react-table";
import Box from "@mui/material/Box";
import { IReport } from "../../interfaces/IReport";
import { REPORTS } from "../../constants/reports";
import TableSectionTitle from "../UI/TableSectionTitle/TableSectionTitle";
import { GEN_PLAN_FILTER } from "../../constants/genPlanFilter";
import Button from "@mui/material/Button/Button";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { EVENT_TYPES } from "../../constants/eventTypes";
import NewReportModal from "../NewReportModal/NewReportModal";
import TableSectionDialogContent from "./TableSectionDialogContent/TableSectionDialogContent";

const validateRequired = (value: string) => !!value.length;

function validateReport(report: IReport) {
  return {
    dateReport: !validateRequired(report.dateReport) ? "Дата обязательна" : "",
    description: !validateRequired(report.description)
      ? "Описание обязательно"
      : "",
    eventCode: !validateRequired(report.eventCode)
      ? "Выбор мероприятия обязателен"
      : "",
    reportAlias: !validateRequired(report.reportAlias)
      ? "Выбор типа обязателен"
      : "",
    reportNo: !validateRequired(report.reportNo) ? "№ обязателен" : "",
  };
}

const TableSection = ({
  currentWellId,
  isGenPlanFilterOn,
  eventFilters,
  allReportsData,
  onAllReportsDataChange,
  currentSiteId,
  isLoading,
  isError,
}: {
  currentWellId: string;
  isGenPlanFilterOn?: boolean;
  eventFilters: string[];
  allReportsData: IReport[];
  onAllReportsDataChange: Function;
  currentSiteId: string;
  isLoading: boolean;
  isError: boolean;
}) => {
  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [reportsData, setReportsData] = useState<IReport[]>([]);
  const isRefetching = false;

  useEffect(
    () =>
      setReportsData(
        allReportsData.filter((item) => item.wellId === currentWellId)
      ),
    [allReportsData, currentWellId]
  );

  useEffect(() => {
    const filters = [];
    if (eventFilters?.length) {
      filters.push({
        id: "eventCode",
        value: Array.isArray(eventFilters) ? eventFilters : [eventFilters],
      });
    }
    if (isGenPlanFilterOn) {
      filters.push(GEN_PLAN_FILTER);
    }
    setColumnFilters(filters);
  }, [isGenPlanFilterOn, eventFilters]);

  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    // Не могу вынести из функции компонента так как используется хук useMemo
    () => [
      {
        accessorKey: "reportAlias",
        header: "Тип",
        size: 100,
        enableSorting: false,
        filterVariant: "text",
        Cell: ({ cell }) =>
          REPORTS.find((report) => report?.alias === cell.getValue())?.type ||
          "Нет данных",
        editVariant: "select",
        editSelectOptions: REPORTS.map((report) => report.alias),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.reportAlias,
          helperText: validationErrors?.reportAlias,
          SelectProps: {
            renderValue: (value) => {
              const selectedAlias = value as string;
              const report = REPORTS.find(
                (report) => report.alias === selectedAlias
              );
              return report?.type || "Нет данных";
            },
          },
          children: REPORTS.map((report) => (
            <MenuItem key={report.alias} value={report.alias}>
              {report.type}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "dateReport",
        header: "Дата",
        size: 130,
        accessorFn: (row) =>
          new Date(row.dateReport).toISOString().split("T")[0] || "",
        Cell: ({ cell }) =>
          new Date(cell.getValue<Date>())?.toLocaleDateString() || "",
        muiEditTextFieldProps: {
          required: true,
          type: "date",
          error: !!validationErrors?.dateReport,
          helperText: validationErrors?.dateReport,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dateReport: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "reportNo",
        header: "№",
        size: 50,
        enableSorting: false,
        muiEditTextFieldProps: {
          required: true,
          type: "number",
          InputProps: {
            inputProps: {
              min: 0,
              step: 1,
            },
          },
          error: !!validationErrors?.reportNo,
          helperText: validationErrors?.reportNo,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              reportNo: undefined,
            }),
        },
      },
      {
        accessorKey: "description",
        header: "Описание",
        size: 200,
        enableSorting: false,
        grow: true,
        filterVariant: "text",
        Cell: ({ cell }) => cell.getValue<string>() || "Нет данных",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "eventCode",
        header: "Мероприятие",
        size: 100,
        enableResizing: false,
        enableSorting: false,
        filterVariant: "multi-select",
        editVariant: "select",
        editSelectOptions: EVENT_TYPES,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.eventCode,
          helperText: validationErrors?.eventCode,
        },
      },
    ],
    [validationErrors]
  );

  function createUser(values: IReport) {
    setReportsData((prevReportsData) => [values, ...prevReportsData]);
  }

  const handleCreateReport: MRT_TableOptions<IReport>["onCreatingRowSave"] = ({
    values,
    table,
  }) => {
    const newValidationErrors = validateReport(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    createUser(values);

    table.setSorting(table.getState().sorting);
    table.setCreatingRow(null);
  };

  const table = useMaterialReactTable({
    columns,
    data: reportsData,
    enableRowSelection: false,
    enableColumnActions: false,
    enableTopToolbar: true,
    enableToolbarInternalActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableEditing: false,
    positionCreatingRow: "top",
    createDisplayMode: "modal",
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateReport,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(
            createRow(table, {
              dateReport: new Date().toISOString().substring(0, 10),
              description: "",
              eventCode: "БУР",
              reportAlias: "DDR",
              reportNo: "",
              reportJournalId: "",
              wellId: "",
              wellboreId: "",
              eventId: "",
              entityType: "",
            })
          );
        }}
      >
        Создать отчет
      </Button>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <TableSectionDialogContent
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
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
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    rowCount: reportsData.length,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "15px",
          marginBottom: "10px",
        }}
      >
        <TableSectionTitle title="Отчеты" />
        <NewReportModal
          currentSiteId={currentSiteId}
          onAllReportsDataChange={onAllReportsDataChange}
        />
      </Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TableSection;
