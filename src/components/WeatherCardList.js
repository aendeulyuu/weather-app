import { Box, makeStyles, useMediaQuery } from '@material-ui/core';

import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import WeatherCard from './WeatherCard';
import { useState } from 'react';

const useStyles = makeStyles({
  scroll_menu: {
    '& div:nth-child(1)': {
      justifyContent: 'center',
    },
  },
});

const WeatherCardList = ({ weathersData }) => {
  const classes = useStyles();
  const screenMatchesMin1024 = useMediaQuery('(min-width:1024px)');

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

  return (
    <ScrollMenu wrapperClassName={screenMatchesMin1024 && classes.scroll_menu}>
      {weathersData.map((weatherData, index) => {
        return (
          <Box
            itemId={index}
            key={index}
            onClick={clickHandler(index)}
            selected={isItemSelected(index)}
            margin={1}
          >
            <WeatherCard weatherData={weatherData} />
          </Box>
        );
      })}
    </ScrollMenu>
  );
};

export default WeatherCardList;
