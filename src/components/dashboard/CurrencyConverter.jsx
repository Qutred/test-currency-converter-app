import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { styled } from '@material-ui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useBaseCurrency } from './../../store/slices/baseCurrencySlice';
import { useSupportedSymbols } from './../../store/slices/supportedSymbolsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { convert } from './../../api/currencyApi';
import Title from './Title';

const ContentInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
  alignItems: 'center',
});

const CurrencyConverter = () => {
  const baseCurrency = useSelector(useBaseCurrency);
  const supportedSymbols = useSelector(useSupportedSymbols);
  const [formData, setFormData] = useState({
    amount: { value: 1, errorMessage: '' },
    from: { value: baseCurrency, errorMessage: '' },
    to: { value: 'EUR', errorMessage: '' },
  });

  const [loading, setLoading] = useState({
    status: 'idle',
    error: '',
  });
  const [convertResult, setConvertResult] = useState(null);

  const handleConvert = async () => {
    if (
      formData.amount.errorMessage ||
      formData.from.errorMessage ||
      formData.to.errorMessage
    ) {
      return;
    }

    try {
      setLoading(prevState => ({
        ...prevState,
        status: 'loading',
      }));

      let response = await convert({
        amount: formData.amount.value,
        to: formData.to.value,
        from: formData.from.value,
      });
      if (!(response.status === 200)) {
        new Error('Server error');
      }

      setConvertResult(response.data.result);

      setLoading(prevState => ({
        ...prevState,
        status: 'resolved',
      }));
    } catch (error) {
      setLoading(prevState => ({
        ...prevState,
        status: 'rejected',
        error: error.message,
      }));
    }
  };

  const handleChange = e => {
    let errorMessage;
    let { name, value } = e.target;

    if (name === 'amount') {
      errorMessage =
        Number(value) >= 1 ? '' : 'Amount must be bigger or equal 1';
    }

    if (name === 'from' || name === 'to') {
      errorMessage = value === '' ? 'Please Choose some currency' : '';
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: {
        ...prevFormData[e.target.name],
        value: e.target.value,
        errorMessage: errorMessage,
      },
    }));
  };

  return (
    Object.keys(supportedSymbols).length > 0 && (
      <Card sx={{ padding: '2rem' }}>
        <Title>Currency converter</Title>
        <ContentInfo>
          <FormControl>
            <TextField
              error={Boolean(formData.amount.errorMessage)}
              sx={{ mb: '2rem' }}
              id="amount"
              name="amount"
              label="Amount"
              align="center"
              variant="standard"
              type="number"
              value={formData.amount.value}
              onChange={handleChange}
              helperText={
                Boolean(formData.amount.errorMessage) &&
                formData.amount.errorMessage
              }
            />
          </FormControl>

          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="from">From</InputLabel>
              <Select
                labelId="from"
                name="from"
                id="from"
                label="From"
                value={formData.from.value}
                onChange={handleChange}
                error={Boolean(formData.from.errorMessage)}
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
              <FormHelperText>{formData.from.errorMessage}</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="To">To</InputLabel>
              <Select
                labelId="to"
                name="to"
                id="to"
                label="To"
                value={formData.to.value}
                onChange={handleChange}
                error={Boolean(formData.to.errorMessage)}
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
              <FormHelperText>{formData.to.errorMessage}</FormHelperText>
            </FormControl>
          </div>
          <Typography sx={{ mt: '2rem' }}>
            {loading.status === 'rejected' && `<p>${loading.error}</p>`}
            {loading.status === 'loading' ? (
              <CircularProgress sx={{ max: 'auto' }} />
            ) : (
              convertResult !== null && `Result ${convertResult}`
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
