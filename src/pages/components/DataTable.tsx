import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import IosShareIcon from "@mui/icons-material/IosShare";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";

interface Data {
  date: string;
  lot: string;
  version: string;
  temp: string;
  timein: string;
  timeout: string;
  color: string;
  result: string;
}

function createData(
  date: string,
  lot: string,
  version: string,
  temp: string,
  timein: string,
  timeout: string,
  color: string,
  result: string
): Data {
  return {
    date,
    lot,
    version,
    temp,
    timein,
    timeout,
    color,
    result,
  };
}

const rows = [
  createData(
    "May 25, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 24, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 23, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 22, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 21, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 20, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 19, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 18, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 17, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 16, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 15, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 14, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 13, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 12, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 11, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 10, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 09, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 08, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
  createData(
    "May 07, 2022",
    "BE345",
    "test",
    "70",
    "May 25, 2022 07:30",
    "May 25, 2022 18:54",
    "Black",
    "Pass"
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "lot",
    numeric: true,
    disablePadding: false,
    label: "BI Lot Number",
  },
  {
    id: "version",
    numeric: true,
    disablePadding: false,
    label: "Version",
  },
  {
    id: "temp",
    numeric: true,
    disablePadding: false,
    label: "Temp(Celcius)",
  },
  {
    id: "timein",
    numeric: true,
    disablePadding: false,
    label: "Time in",
  },
  {
    id: "timeout",
    numeric: true,
    disablePadding: false,
    label: "Time Out",
  },
  {
    id: "color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "result",
    numeric: true,
    disablePadding: false,
    label: "Result",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          All Records
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title='Export'>
            <IconButton>
              <IosShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function DataTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.date);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.date);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.date)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.date}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.date}
                      </TableCell>
                      <TableCell align='right'>{row.lot}</TableCell>
                      <TableCell align='right'>{row.version}</TableCell>
                      <TableCell align='right'>{row.temp}</TableCell>
                      <TableCell align='right'>{row.timein}</TableCell>
                      <TableCell align='right'>{row.timeout}</TableCell>
                      <TableCell align='right'>{row.color}</TableCell>
                      <TableCell align='right'>{row.result}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
