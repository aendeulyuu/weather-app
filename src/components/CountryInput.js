import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { Autocomplete } from '@material-ui/lab';
import PublicIcon from '@material-ui/icons/Public';

const CountryInput = ({
  onSearch,
  selectedCountry,
  setSelectedCountry,
  setSelectedCity,
  setCityOptions,
  setIsCityOptionsDisabled,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const onOpenHandler = () => {
    setOpen(true);
  };
  const onCloseHandler = () => {
    setOpen(false);
  };
  const renderInputHandler = params => (
    <TextField
      {...params}
      label="Search your country"
      placeholder="ex. Philippines"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <PublicIcon />
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
        setIsCityOptionsDisabled(false);
        setSelectedCountry(value);
        break;
      case 'clear':
        if (event.type === 'click') {
          setSelectedCity(null);
          setIsCityOptionsDisabled(true);
          setSelectedCountry(null);
          setCityOptions([]);
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
          'https://countriesnow.space/api/v0.1/countries'
        );

        const results = await response.json();

        setOptions(results.data.map(data => data.country));
      })();
    }
  }, [loading]);

  return (
    <Autocomplete
      autoHighlight
      open={open}
      loading={loading}
      options={options}
      value={selectedCountry}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
      renderInput={renderInputHandler}
      onChange={onChangeHandler}
      getOptionSelected={compareSelectedToParam}
    />
  );
};

export default CountryInput;
