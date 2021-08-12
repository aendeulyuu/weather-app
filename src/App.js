import { API_BASE_URL, API_KEY } from './api/config';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Slide,
  Snackbar,
  Typography,
  makeStyles,
} from '@material-ui/core';

import CityInput from './components/CityInput';
import CountryInput from './components/CountryInput';
import ScrollToTop from './ui/ScrollToTop';
import WeatherList from './components/WeatherList';
import useFetch from './hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  snackbar: {
    textAlign: 'initial',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();

  const { country: countryParam, city: cityParam } = useParams();

  const [selectedCountry, setSelectedCountry] = useState(countryParam ?? null);

  const [selectedCity, setSelectedCity] = useState(cityParam ?? null);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityOptionsDisabled, setIsCityOptionsDisabled] = useState(
    !cityParam ?? true
  );

  const { data, error, isLoading, setUrl, setData, setError } = useFetch(
    selectedCountry,
    selectedCity
  );

  const searchCityHandler = city => {
    if (city) {
      setUrl(
        `${API_BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
    } else {
      setUrl(null);
      setData(null);
      setError(null);
    }
  };
  const onCloseHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const getContent = () => {
    if (error) {
      return (
        <Snackbar
          className={classes.snackbar}
          open
          autoHideDuration={10000}
          TransitionComponent={Slide}
          onClose={onCloseHandler}
        >
          <Alert severity="error" onClose={onCloseHandler}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      );
    }

    if (!data && isLoading) {
      return (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    if (!data) {
      return null;
    }

    return <WeatherList weathersData={data.list} cityData={data.city} />;
  };

  return (
    <Box marginTop={2} marginBottom={2}>
      <Container>
        <Typography variant="h4" component="h2" align="center">
          Check Your Weather
        </Typography>

        <Box marginTop={2} marginBottom={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <CountryInput
                onSearch={searchCityHandler}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
                setCityOptions={setCityOptions}
                setIsCityOptionsDisabled={setIsCityOptionsDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CityInput
                onSearch={searchCityHandler}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                cityOptions={cityOptions}
                setCityOptions={setCityOptions}
                isCityOptionsDisabled={isCityOptionsDisabled}
                selectedCountry={selectedCountry}
              />
            </Grid>
          </Grid>
        </Box>

        {getContent()}
        <ScrollToTop />
      </Container>
    </Box>
  );
};

export default App;
