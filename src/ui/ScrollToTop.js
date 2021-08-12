import { Fab, Zoom, makeStyles, useScrollTrigger } from '@material-ui/core';

import { ArrowUpward } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const ScrollToTop = () => {
  const classes = useStyles();

  const ScrollTop = ({ children, window }) => {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });

    const scrollToTopHandler = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <Zoom in={trigger}>
        <div
          role="presentation"
          className={classes.fab}
          onClick={scrollToTopHandler}
        >
          {children}
        </div>
      </Zoom>
    );
  };

  return (
    <ScrollTop window={window}>
      <Fab variant="extended" aria-label="scroll back to top">
        <ArrowUpward />
        Back To Top
      </Fab>
    </ScrollTop>
  );
};

export default ScrollToTop;
