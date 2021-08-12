import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { Autocomplete } from '@material-ui/lab';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const CityInput = ({
  onSearch,
  selectedCity,
  setSelectedCity,
  cityOptions,
  setCityOptions,
  isCityOptionsDisabled,
  selectedCountry,
}) => {
  const [open, setOpen] = useState(false);
  const loading = open && cityOptions.length === 0;

  const onOpenHandler = () => {
    setOpen(true);
  };
  const onCloseHandler = () => {
    setOpen(false);
  };
  const renderInputHandler = params => (
    <TextField
      {...params}
      label="Search your city"
      placeholder="ex. Manila"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <LocationCityIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
  const onChangeHandler = (event, value, reason) => {
    switch (reason) {
      case 'select-option':
        setSelectedCity(value);
        onSearch(value);
        break;
      case 'clear':
        if (event.type === 'click') {
          setSelectedCity(null);
          onSearch(null);
        }
        break;
      default:
        break;
    }
  };
  const compareSelectedToParam = (option, value) =>
    option.toString().toLowerCase() === value.toString().toLowerCase();

  useEffect(() => {
    if (loading) {
      (async () => {
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries/cities',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              country: selectedCountry,
            }),
          }
        );

        const results = await response.json();

        setCityOptions(results.data);
      })();
    }
  }, [loading, selectedCountry, setCityOptions]);

  useEffect(() => {
    if (selectedCity) onSearch(selectedCity);
  }, [selectedCity, onSearch]);

  return (
    <Autocomplete
      autoHighlight
      open={open}
      loading={loading}
      options={cityOptions}
      value={selectedCity}
      disabled={isCityOptionsDisabled}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
      renderInput={renderInputHandler}
      onChange={onChangeHandler}
      getOptionSelected={compareSelectedToParam}
    />
  );
};

export default CityInput;
