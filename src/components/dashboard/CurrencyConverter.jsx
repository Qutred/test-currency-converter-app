import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { styled } from '@material-ui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrencySymbols,
  changeBaseCurrency,
  useBaseCurrency,
  useSupportedSymbols,
  useLoading,
  useRatesLoaded,
  convertCurrency,
  useConvertResult,
} from '../../store/slices/currencySlice';
import CircularProgress from '@mui/material/CircularProgress';

const ContentInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
  alignItems: 'center',
});

const CurrencyConverter = () => {
  const loading = useSelector(useLoading);
  const amount = useRef(null);
  const from = useRef(null);
  const to = useRef(null);
  const baseCurrency = useSelector(useBaseCurrency);
  const result = useSelector(useConvertResult);
  const [formData, setFormData] = useState({
    to: '',
    from: baseCurrency,
    amount: 1,
  });
  const supportedSymbols = useSelector(useSupportedSymbols);

  const dispatch = useDispatch();

  const handleConvert = () => {
    dispatch(
      convertCurrency({
        from: from.current.value,
        to: to.current.value,
        amount: amount.current.value,
      })
    );
  };

  const handleChange = e => {
    debugger;
    setFormData(prevFormData => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const getRandomCurrency = () => {
    let keys = Object.keys(supportedSymbols);
    let randomNumber = Math.floor(Math.random() * keys.length);
    return keys[randomNumber];
  };

  return (
    Object.keys(supportedSymbols).length > 0 && (
      <Card sx={{ padding: '2rem' }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: 'primary.main', fontWeight: '700' }}
        >
          Currency converter
        </Typography>
        <Divider light />
        <ContentInfo>
          <TextField
            id="amount"
            name="amount"
            label="Amount"
            align="center"
            variant="standard"
            type="number"
            inputRef={amount}
            value={formData.amount}
            onChange={handleChange}
            sx={{ mb: '2rem' }}
          />
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="from">From</InputLabel>
              <Select
                labelId="from"
                name="from"
                id="from"
                label="From"
                inputRef={from}
                value={formData.from}
                onChange={handleChange}
              >
                {Object.keys(supportedSymbols).map(currency => {
                  return (
                    <MenuItem
                      key={supportedSymbols[currency].code}
                      value={supportedSymbols[currency].code}
                    >
                      {supportedSymbols[currency].description}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="To">To</InputLabel>
              <Select
                labelId="to"
                name="to"
                id="to"
                label="To"
                inputRef={to}
                value={formData.to}
                onChange={handleChange}
              >
                {Object.keys(supportedSymbols).map(currency => {
                  return (
                    <MenuItem
                      key={supportedSymbols[currency].code}
                      value={supportedSymbols[currency].code}
                    >
                      {supportedSymbols[currency].description}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <Typography sx={{ mt: '2rem' }}>
            {loading.status === 'loading' ? (
              <CircularProgress />
            ) : (
              `Result: ${result === null ? '' : result}`
            )}
          </Typography>
          <Button
            onClick={handleConvert}
            variant="contained"
            sx={{ mt: '2rem' }}
          >
            Convert
          </Button>
        </ContentInfo>
      </Card>
    )
  );
};

export default CurrencyConverter;
