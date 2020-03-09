import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Reactive Cryptocurrencies App</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  );
};

export default Header;
