import {
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { handleImageError, scrollHandler, titleCase } from '../utility/utility';

import CardUI from '../ui/CardUI';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  card_media: {
    display: 'initial',
    width: '30%',
  },
  hash_link: {
    textAlign: 'center',
    textDecoration: 'initial',
    color: 'initial',
  },
}));

const WeatherToday = ({ weatherData, cityData }) => {
  const classes = useStyles();

  const location = useLocation();

  return (
    <Grid container justifyContent="center">
      <CardUI xs={10} sm={8} md={6} lg={4}>
        <HashLink
          smooth
          className={classes.hash_link}
          component={CardActionArea}
          to={`${location.pathname}#today`}
          scroll={scrollHandler}
        >
          <CardHeader
            align="center"
            title={`${cityData.name}, ${cityData.country}`}
          ></CardHeader>
          <CardMedia
            className={classes.card_media}
            component="img"
            image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            title={titleCase(weatherData.weather[0].description)}
            alt={weatherData.weather[0].description}
            onError={e =>
              handleImageError(e, weatherData.weather[0].description)
            }
          ></CardMedia>
          <CardContent>
            <Typography variant="h5" component="h2" align="center">
              {weatherData.main.temp}
              &deg;
            </Typography>
            <Typography variant="body2" component="p" align="center">
              {titleCase(weatherData.weather[0].description)}
            </Typography>
          </CardContent>
        </HashLink>
      </CardUI>
    </Grid>
  );
};

export default WeatherToday;
