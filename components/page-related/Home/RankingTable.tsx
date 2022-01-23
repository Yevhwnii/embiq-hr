import * as React from "react";
import { CircularProgress as Spinner } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

import { Ranking } from "@api/types";
import { Data, headCells } from "./constants";

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

interface RankingTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const RankingTableHead: React.FC<RankingTableHeadProps> = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const RankingTableToolbar: React.FC = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Rankings
      </Typography>
    </Toolbar>
  );
};

interface RankingTableProps {
  data: Ranking[];
  loading: boolean;
  onSelectDriver: (driverId: number) => void;
}

const RankingTable: React.FC<RankingTableProps> = ({
  data,
  loading,
  onSelectDriver,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("position");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rankings = data
    .filter((e) => !!e.position)
    .map((i) => ({
      driverId: i.driver.id,
      driver: i.driver.name,
      position: i.position,
      team: i.team.name,
      time: i.time,
    }));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (driverId: number) => {
    onSelectDriver(driverId);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rankings.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, minHeight: 700 }}>
        <RankingTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, minHeight: 600 }}
            aria-labelledby="ranking table"
            size="medium"
          >
            <RankingTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rankings.length}
            />
            <TableBody className="relative">
              {rankings.length === 0 && !loading && (
                <div
                  style={{ transform: "translate(-50%,-50%)" }}
                  className="absolute top-1/2 left-1/2 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={"/images/no-results.png"}
                      className="w-24 h-24"
                      alt="No results"
                    />
                  </div>
                  <span className="text-center text-sm text-gray-500">
                    No results for given combination of curcuit and season
                  </span>
                </div>
              )}
              {loading && (
                <div
                  style={{ transform: "translate(-50%,-50%)" }}
                  className="absolute top-1/2 left-1/2 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-center">
                    <Spinner className="w-8 h-8 text-teal-400" />
                  </div>
                  <span className="text-center text-sm text-gray-500">
                    Loading...
                  </span>
                </div>
              )}
              {!loading &&
                stableSort(rankings, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => handleClick(row.driverId)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.driver}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.driver}
                        </TableCell>
                        <TableCell align="center">{row.position}</TableCell>
                        <TableCell align="left">{row.team}</TableCell>
                        <TableCell align="left">{row.time}</TableCell>
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
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rankings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default RankingTable;
