import { Box, CardContent } from '@material-ui/core';

import CardUI from '../ui/CardUI';
import { Fragment } from 'react';
import WeatherCardDetailsData from './WeatherCardDetailsData';
import WeatherCardDetailsList from './WeatherCardDetailsList';
import moment from 'moment';

const WeatherCardDetails = ({ weathersData, transformedWeathersData }) => {
  const getSameDayWeathersData = dayCompare => {
    const newWeathersData = weathersData
      .slice()
      .filter(weatherData =>
        moment(weatherData.dt_txt).isSame(moment(dayCompare), 'day')
      );

    return newWeathersData;
  };

  return transformedWeathersData.map((weatherData, index) => {
    const id =
      index === 0
        ? 'today'
        : moment(weatherData.dt_txt).format('dddd').toLowerCase();

    return (
      <Fragment key={weatherData.dt_txt}>
        <Box component={'section'} id={id}>
          <CardUI>
            <CardContent>
              <WeatherCardDetailsData
                weathersData={getSameDayWeathersData(weatherData.dt_txt)}
              />
              <br />
              <WeatherCardDetailsList
                weathersData={getSameDayWeathersData(weatherData.dt_txt)}
              />
            </CardContent>
          </CardUI>
        </Box>
        <br />
      </Fragment>
    );
  });
};

export default WeatherCardDetails;
