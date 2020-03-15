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

import { Coin, Order, CoinKey } from 'types';
import { immutableSort, getComparator } from 'utils';

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
              <TableCell sortDirection={orderBy === 'id' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : Order.desc}
                  onClick={() => handleOrderChange('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : Order.desc}
                  onClick={() => handleOrderChange('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'symbol' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'symbol'}
                  direction={orderBy === 'symbol' ? order : Order.desc}
                  onClick={() => handleOrderChange('symbol')}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === 'price' ? order : false}
                align="right"
              >
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : Order.desc}
                  onClick={() => handleOrderChange('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === 'marketCap' ? order : false}
                align="right"
              >
                <TableSortLabel
                  active={orderBy === 'marketCap'}
                  direction={orderBy === 'marketCap' ? order : Order.desc}
                  onClick={() => handleOrderChange('marketCap')}
                >
                  Market Cap
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === 'lastUpdate' ? order : false}
                align="right"
              >
                <TableSortLabel
                  active={orderBy === 'lastUpdate'}
                  direction={orderBy === 'lastUpdate' ? order : Order.desc}
                  onClick={() => handleOrderChange('lastUpdate')}
                >
                  Last update
                </TableSortLabel>
              </TableCell>
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
                    <TableCell>{coin.id}</TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>{coin.symbol}</TableCell>
                    <TableCell align="right">
                      {`${coin.price.toFixed(2)} $`}
                    </TableCell>
                    <TableCell align="right">
                      {`${coin.marketCap.toFixed(2)} $`}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(coin.lastUpdate).toLocaleString()}
                    </TableCell>
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
