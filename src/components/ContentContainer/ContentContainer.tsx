import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey['100'],
      height: '100vh',
      overflow: 'auto',
    },
  }),
);

const ContentContainer: React.FC = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.container}>{children}</div>;
};

export default ContentContainer;
