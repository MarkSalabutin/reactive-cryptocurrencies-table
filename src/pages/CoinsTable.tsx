import React, { useEffect, useState } from 'react';
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

import {
  finishObservingCoinPrices,
  startObservingCoinPrices,
  fetchCoinsInfoRequest,
  fetchCoinsInfoCanceled,
} from 'modules/coins/actions';
import { getCoinsList, getCoinsFetchingState } from 'modules/coins/selectors';

import { Order, CoinKey } from 'types';
import { immutableSort, getComparator } from 'utils';

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
    tableCointainer: {
      maxHeight: `calc(100vh - ${theme.spacing(22)}px)`,
    },
    emptyStateMessage: {
      fontSize: '1.5rem',
    },
  }),
);

const CoinsTable: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const coinsList = useSelector(getCoinsList);
  const isFetchingCoins = useSelector(getCoinsFetchingState);
  const [orderBy, setOrderBy] = useState<CoinKey>('marketCap');
  const [order, setOrder] = useState<Order>(Order.desc);

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

  const handleOrderChange = (nextOrderBy: CoinKey) => {
    setOrderBy(nextOrderBy);
    const nextOrder =
      nextOrderBy === orderBy && order === Order.desc ? Order.asc : Order.desc;
    setOrder(nextOrder);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <TableContainer component={Paper} className={styles.tableCointainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableConfig.map(({ name, label, numeric }) => (
                <TableCell
                  sortDirection={orderBy === name ? order : false}
                  align={numeric ? 'right' : 'left'}
                >
                  <TableSortLabel
                    active={orderBy === name}
                    direction={orderBy === name ? order : Order.desc}
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
              immutableSort(coinsList, getComparator(order, orderBy)).map(
                coin => (
                  <TableRow key={coin.id}>
                    {tableConfig.map(({ name, format, numeric }) => (
                      <TableCell align={numeric ? 'right' : 'left'}>
                        {format ? format(coin[name]) : coin[name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;
