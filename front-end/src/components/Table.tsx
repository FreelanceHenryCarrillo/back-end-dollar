/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DolarRange } from "../types.global";
import { Button, Checkbox, Fab, TablePagination, Tooltip } from "@mui/material";
import { Cancel, Edit, Info } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  deleteMultipleDollarById,
  editDollarById,
  loading,
} from "../redux/DollarSlice";

interface TableProps {
  data: DolarRange[];
}

export default function BasicTable({ data }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isCellIndex, setIsCellIndex] = React.useState<number>(0);
  const [isOpenEditCell, setIsOpenEditCell] = React.useState<boolean>(false);
  const [valueCell, setValueCell] = React.useState<number | string | null>(
    null
  );
  const [selectMultiple, setSelectMultiple] = React.useState<number[]>([]);
  const dispatch = useAppDispatch();
  const loadingDollar = useAppSelector(loading);
  const newData = [...data];

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValueCell(value);
  };
  const handleSumbit = (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    const validateRegex = new RegExp("[A-Za-z]");
    console.log(valueCell);
    if (
      valueCell &&
      typeof valueCell === "string" &&
      validateRegex.test(valueCell)
    ) {
      return toast.error("El valor debe ser numerico");
    } else {
      dispatch(editDollarById(id, valueCell));
      toast.success("Se edito el valor de la celda con ID: " + id);
    }
    setIsOpenEditCell(false);
    setValueCell(0);
  };

  const handleChangeSelectMultiple = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectMultiple((prev) => [...prev, id]);
    } else {
      setSelectMultiple((prev) => prev.filter((p) => p !== id));
    }
  };

  const handleDeleteMultiple = async () => {
    if (selectMultiple.length >= 1) {
      await dispatch(deleteMultipleDollarById(selectMultiple));
      setSelectMultiple([]);
      toast.success(
        `Se realizo la eliminacion de los IDS: ${selectMultiple.map(
          (p) => p
        )}  `
      );
    } else {
      toast.warning("Se debe seleccionar para borrar");
    }
  };

  return (
    <>
      {selectMultiple.length >= 1 && (
        <div className="button-delete-multiple">
          <div className="">Rows selected {selectMultiple.length}</div>
          <div className="">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteMultiple}
              disabled={loadingDollar}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="inherit">Selection</TableCell>
              <TableCell align="inherit">Date</TableCell>
              <TableCell align="inherit">
                Values
                <Tooltip title="Doble click para editar las celdas">
                  <Info fontSize={"small"} color="warning" />
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newData
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .sort(
                (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
              )
              .map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      data-indeterminate="false"
                      onChange={(e) => handleChangeSelectMultiple(e, row.id)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="inherit"
                    onDoubleClick={() => {
                      setIsOpenEditCell(true);
                      setIsCellIndex(i);
                    }}
                  >
                    {isOpenEditCell && isCellIndex === i ? (
                      <form
                        className="cell-table"
                        onSubmit={(e) => handleSumbit(e, row.id)}
                      >
                        <input
                          className="cell-table-input"
                          type="text"
                          placeholder={row.value.toString()}
                          onChange={handleInputChange}
                        />
                        <Fab
                          color="primary"
                          aria-label="edit"
                          style={{ width: "40px", height: "40px" }}
                          type="submit"
                        >
                          <Edit style={{ width: "20px", height: "100%" }} />
                        </Fab>
                        <Fab
                          color="error"
                          aria-label="edit"
                          style={{ width: "40px", height: "40px" }}
                          onClick={() => setIsOpenEditCell(false)}
                        >
                          <Cancel style={{ width: "20px", height: "100%" }} />
                        </Fab>
                      </form>
                    ) : (
                      <>{row.value}</>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="container-footer-table">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ width: "100%", marginRight: "20px" }}
        />
      </div>
    </>
  );
}
