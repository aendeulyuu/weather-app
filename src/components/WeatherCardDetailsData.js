import { Grid, Typography } from '@material-ui/core';
import {
  faCloud,
  faEye,
  faTint,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'material-ui-image';
import moment from 'moment';
import { titleCase } from '../utility/utility';

const WeatherCardDetailsData = ({ weathersData }) => {
  const firstHourData = { ...weathersData[0] };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Image
          src={`https://openweathermap.org/img/wn/${firstHourData.weather[0].icon}@2x.png`}
          title={titleCase(firstHourData.weather[0].description)}
          color={'transparent'}
          imageStyle={{
            width: '30%',
            height: '30%',
            position: 'initial',
          }}
          style={{ position: 'initial', paddingTop: '0' }}
        />
        <Typography component="p">
          {moment(firstHourData.dt_txt).format('dddd')}
        </Typography>
        <Typography variant="h5" component="h2">
          {titleCase(firstHourData.weather[0].description)}
        </Typography>
        <Typography variant="h4" component="p">
          <b>{firstHourData.main.temp} &#8451;</b>
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={6}
        justifyContent="space-evenly"
        alignItems="center"
        align="center"
      >
        <Grid item>
          <FontAwesomeIcon icon={faTint} />
          <Typography variant="caption" component="h3">
            Humidity
          </Typography>
          <Typography component="p">
            <b>{firstHourData.main.humidity} %</b>
          </Typography>
        </Grid>
        <Grid item>
          <FontAwesomeIcon icon={faWind} />
          <Typography variant="caption" component="h3">
            Wind Speed
          </Typography>
          <Typography component="p">
            <b>{(firstHourData.wind.speed * 3.6).toFixed(2)} km/h</b>
          </Typography>
        </Grid>

        <Grid item>
          <FontAwesomeIcon icon={faCloud} />
          <Typography variant="caption" component="h3">
            Cloudiness
          </Typography>
          <Typography component="p">
            <b>{firstHourData.clouds.all} %</b>
          </Typography>
        </Grid>
        <Grid item>
          <FontAwesomeIcon icon={faEye} />
          <Typography variant="caption" component="h3">
            Visibility
          </Typography>
          <Typography component="p">
            <b>{firstHourData.visibility / 1000} km</b>
          </Typography>
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default WeatherCardDetailsData;
