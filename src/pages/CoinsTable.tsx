import React, { useEffect } from 'react';
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

import {
  finishObservingCoinPrices,
  startObservingCoinPrices,
  fetchCoinsInfoRequest,
  fetchCoinsInfoCanceled,
} from 'modules/coins/actions';
import { getCoinsList, getCoinsFetchingState } from 'modules/coins/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  }),
);

const CoinsTable: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const coinsList = useSelector(getCoinsList);
  const isFetchingCoins = useSelector(getCoinsFetchingState);

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

  if (isFetchingCoins) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Last update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsList.map(coin => (
              <TableRow key={coin.id}>
                <TableCell>{coin.id}</TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell>{coin.symbol}</TableCell>
                <TableCell>{`${coin.price.toFixed(2)} $`}</TableCell>
                <TableCell>{`${coin.marketCap.toFixed(2)} $`}</TableCell>
                <TableCell>
                  {new Date(coin.lastUpdate).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;
