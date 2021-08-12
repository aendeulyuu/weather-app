import {
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { handleImageError, scrollHandler, titleCase } from '../utility/utility';

import CardUI from '../ui/CardUI';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  card: {
    width: '200px',
  },
  card_media: {
    display: 'initial',
    width: '50%',
  },
  hash_link: {
    textAlign: 'center',
    textDecoration: 'initial',
    color: 'initial',
  },
}));

const WeatherCard = ({ weatherData }) => {
  const classes = useStyles();

  const location = useLocation();

  return (
    <CardUI className={classes.card}>
      <HashLink
        smooth
        className={classes.hash_link}
        component={CardActionArea}
        to={`${location.pathname}#${moment(weatherData.dt_txt)
          .format('dddd')
          .toLowerCase()}`}
        scroll={scrollHandler}
      >
        <CardHeader
          align="center"
          title={moment(weatherData.dt_txt).format('dddd')}
        ></CardHeader>
        <CardMedia
          className={classes.card_media}
          component="img"
          image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          title={titleCase(weatherData.weather[0].description)}
          alt={weatherData.weather[0].description}
          onError={e => handleImageError(e, weatherData.weather[0].description)}
        ></CardMedia>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {weatherData.main.temp}
            &deg;
          </Typography>
        </CardContent>
      </HashLink>
    </CardUI>
  );
};

export default WeatherCard;
