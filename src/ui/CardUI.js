import { Card, Grid } from '@material-ui/core';

import classes from './CardUI.module.css';

const CardUI = props => {
  return (
    <Grid
      item
      component={Card}
      className={`${classes.card} ${props.className}`}
      elevation={props.elevation}
      xs={props.xs}
      sm={props.sm}
      md={props.md}
      id={props.id}
    >
      {props.children}
    </Grid>
  );
};

export default CardUI;
