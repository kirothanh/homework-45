/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../../index.css";
import style from "./style.module.css";

export default function FCommonTable({
  rows,
  columns,
  onUpdate,
  onDelete,
  onSort,
  sortConfig,
}) {
  return (
    <>
      <TableContainer sx={{ margin: "20px auto" }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={style["text--red"]}
                  width={column?.width}
                  key={column.name}
                  onClick={() => onSort(column.name)}
                  style={{ cursor: "pointer" }}
                >
                  {column.text}
                  {sortConfig.key === column.name ? (
                    sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => {
                    if (column.name === "action") {
                      return (
                        <TableCell key={`${index}${column.name}`}>
                          <EditIcon
                            sx={{ color: "green", cursor: "pointer" }}
                            onClick={() => onUpdate(row)}
                          >
                            Edit
                          </EditIcon>
                          <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => onDelete(row.id)}
                          >
                            Delete
                          </DeleteIcon>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={`${index}${column.name}`}>
                        {row[column.name]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
