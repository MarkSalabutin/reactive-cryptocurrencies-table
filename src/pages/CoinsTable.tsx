import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from '@material-ui/core/TablePagination';

import {
  finishObservingCoinPrices,
  startObservingCoinPrices,
  fetchCoinsInfoRequest,
  fetchCoinsInfoCanceled,
  sortCoins,
  setCoinFilters,
  setCoinsPaginationPage,
  setCoinsPaginationPerPage,
} from 'modules/coins/actions';
import {
  getCoinsFetchingState,
  getCoinsSorting,
  getCoinsFilters,
  getFilteredSortedPaginatedCoinsList,
  getFilteredSortedCoinsListCount,
  getCoinsPagination,
} from 'modules/coins/selectors';

import { Order, CoinKey } from 'types';

import { TableItem } from './types';

const tableConfig: TableItem[] = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'symbol',
    label: 'Symbol',
  },
  {
    name: 'price',
    label: 'Price',
    numeric: true,
    format: (value: number) => `${value.toFixed(2)} $`,
  },
  {
    name: 'marketCap',
    label: 'Market cap',
    numeric: true,
    format: (value: number) => `${Number(value.toFixed(0)).toLocaleString()} $`,
  },
  {
    name: 'lastUpdate',
    label: 'Last update',
    numeric: true,
    format: (value: number) => new Date(value).toLocaleString(),
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
    toolbar: {
      backgroundColor: theme.palette.background.default,
      paddingTop: theme.spacing(2),
    },
    title: {
      flex: '1 1 100%',
    },
    search: {
      minWidth: '250px',
    },
    tableCointainer: {
      maxHeight: `calc(100vh - ${theme.spacing(28.5)}px)`,
    },
    emptyStateMessage: {
      fontSize: '1.5rem',
    },
  }),
);

const rowsPerPageOptions = [5, 10, 15, 20];

const CoinsTable: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const coinsList = useSelector(getFilteredSortedPaginatedCoinsList);
  const totalCoinsCount = useSelector(getFilteredSortedCoinsListCount);
  const pagination = useSelector(getCoinsPagination);
  const isFetchingCoins = useSelector(getCoinsFetchingState);
  const { by: sortBy, order } = useSelector(getCoinsSorting);
  const filters = useSelector(getCoinsFilters);
  const [nameFilter, setNameFilter] = useState(filters.name);

  useEffect(() => {
    dispatch(fetchCoinsInfoRequest());

    return () => {
      dispatch(fetchCoinsInfoCanceled());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isFetchingCoins) {
      dispatch(startObservingCoinPrices());

      return () => {
        dispatch(finishObservingCoinPrices());
      };
    }
  }, [dispatch, isFetchingCoins]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        setCoinFilters({
          name: nameFilter,
        }),
      );
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [nameFilter, dispatch]);

  const handleOrderChange = (name: CoinKey) => {
    dispatch(sortCoins(name));
  };

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameFilter(event.target.value);
    },
    [],
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      dispatch(setCoinsPaginationPage(newPage));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setCoinsPaginationPerPage(parseInt(event.target.value, 10)));
    },
    [dispatch],
  );

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Paper>
        <TableContainer className={styles.tableCointainer}>
          <Toolbar className={styles.toolbar}>
            <Typography variant="h4" className={styles.title}>
              Coins
            </Typography>
            <TextField
              onChange={handleFilterChange}
              name="name"
              value={nameFilter}
              placeholder="Name"
              className={styles.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableConfig.map(({ name, label, numeric }) => (
                  <TableCell
                    key={name}
                    sortDirection={sortBy === name ? order : false}
                    align={numeric ? 'right' : 'left'}
                  >
                    <TableSortLabel
                      active={sortBy === name}
                      direction={sortBy === name ? order : Order.desc}
                      onClick={() => handleOrderChange(name)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetchingCoins ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : coinsList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    className={styles.emptyStateMessage}
                  >
                    No coins have been found.
                  </TableCell>
                </TableRow>
              ) : (
                coinsList.map(coin => (
                  <TableRow key={coin.id}>
                    {tableConfig.map(({ name, format, numeric }) => (
                      <TableCell align={numeric ? 'right' : 'left'} key={name}>
                        {format ? format(coin[name]) : coin[name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalCoinsCount}
          rowsPerPage={pagination.perPage}
          page={pagination.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      </Paper>
    </Container>
  );
};

export default CoinsTable;
