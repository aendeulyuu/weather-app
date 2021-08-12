import { Divider, makeStyles } from '@material-ui/core';

import WeatherCardDetails from './WeatherCardDetails';
import WeatherCardList from './WeatherCardList';
import WeatherToday from './WeatherToday';
import moment from 'moment';

const useStyles = makeStyles({
  divider: {
    marginTop: '20px',
    marginBottom: '20px',
    height: '4px',
    borderRadius: '5px',
  },
});

const WeatherList = props => {
  const classes = useStyles();

  const transformWeathersData = (exceptFirstDay = true) => {
    let weathersData = props.weathersData.slice();
    weathersData = exceptFirstDay
      ? weathersData.filter(
          weatherData => !moment(weatherData.dt_txt).isSame(moment(), 'day')
        )
      : weathersData;
    const newWeathersData = [];

    for (let i = 0; i < weathersData.length; i++) {
      const dateCompare = moment().add(
        exceptFirstDay ? newWeathersData.length + 1 : newWeathersData.length,
        'days'
      );

      const firstWeatherofDayData = weathersData.filter(weatherData =>
        moment(weatherData.dt_txt).isSame(dateCompare, 'day')
      )[0];

      if (
        newWeathersData.find(newWeatherData =>
          moment(newWeatherData.dt_txt).isSame(
            moment(weathersData[i].dt_txt),
            'day'
          )
        ) === undefined
      ) {
        newWeathersData.push(firstWeatherofDayData);
      }
    }

    return newWeathersData;
  };

  return (
    <>
      <WeatherToday
        weatherData={props.weathersData[0]}
        cityData={props.cityData}
      />
      <br />
      <WeatherCardList weathersData={transformWeathersData()} />
      <Divider className={classes.divider} />
      <WeatherCardDetails
        weathersData={props.weathersData.slice()}
        transformedWeathersData={transformWeathersData(false)}
      />
    </>
  );
};

export default WeatherList;
