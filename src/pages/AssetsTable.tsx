import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import assets from 'assets.mock';
import {
  startObservingAssets,
  finishObservingAssets,
} from 'modules/assets/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  }),
);

const AssetsTable: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startObservingAssets());

    return () => {
      dispatch(finishObservingAssets());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map(asset => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.price.toFixed(2)}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>
                  {new Date(asset.lastUpdate).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AssetsTable;
