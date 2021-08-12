import {
  Box,
  CardContent,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useContext, useState } from 'react';

import CardUI from '../ui/CardUI';
import moment from 'moment';

const useStyles = makeStyles({
  card: {
    background: 'transparent !important',
    whiteSpace: 'nowrap',
  },
  card_others: {
    border: 'none',
    boxShadow: 'none',
  },
});

const WeatherCardDetailsList = ({ weathersData }) => {
  const classes = useStyles();

  const [selected, setSelected] = useState([]);

  const isItemSelected = id => !!selected.find(el => el === id);

  const clickHandler = id => () => {
    const itemSelected = isItemSelected(id);

    setSelected(currentSelected =>
      itemSelected
        ? currentSelected.filter(el => el !== id)
        : currentSelected.concat(id)
    );
  };

  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
      <Box margin="auto" marginRight={2}>
        <IconButton
          aria-label="left"
          disabled={isFirstItemVisible}
          onClick={() => scrollPrev()}
        >
          <KeyboardArrowLeft fontSize="large" />
        </IconButton>
      </Box>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <Box margin="auto" marginLeft={2}>
        <IconButton
          aria-label="right"
          disabled={isLastItemVisible}
          onClick={() => scrollNext()}
        >
          <KeyboardArrowRight fontSize="large" />
        </IconButton>
      </Box>
    );
  };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {weathersData.map((weatherData, index) => {
        return (
          <Box
            itemId={index}
            key={index}
            onClick={clickHandler(index)}
            selected={isItemSelected(index)}
            margin={2}
          >
            <CardUI
              className={`${classes.card} ${
                index !== 0 ? classes.card_others : ''
              }`}
              elevation={index === 0 ? 5 : 0}
            >
              <CardContent>
                <Grid container direction="column">
                  <Grid item>
                    <Box marginBottom={3}>
                      <Typography variant="caption" component="h3">
                        {moment(weatherData.dt_txt).format('h A')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" component="p">
                      <b>{weatherData.main.temp} &#8451;</b>
                    </Typography>
                    {index === 0 && (
                      <Typography variant="caption" component="h4">
                        Feels like {weatherData.main.feels_like} &#8451;
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </CardUI>
          </Box>
        );
      })}
    </ScrollMenu>
  );
};

export default WeatherCardDetailsList;
