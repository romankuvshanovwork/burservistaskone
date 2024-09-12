import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { ReactNode } from "react";
import { IReport } from "../../../interfaces/IReport";

export default function TableSectionDialogContent({
  internalEditComponents,
  table,
  row,
}: {
  internalEditComponents: ReactNode;
  table: MRT_TableInstance<IReport>;
  row: MRT_Row<IReport>;
}) {
  return (
    <>
      <DialogTitle>Создать отчет</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        {/* eslint-disable-next-line react/jsx-pascal-case  */}
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}
