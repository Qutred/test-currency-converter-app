import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  changeBaseCurrency,
  useBaseCurrency,
} from './../../store/slices/baseCurrencySlice';
import { useSupportedSymbols } from '../../store/slices/supportedSymbolsSlice';
import Title from './Title';

const ContentInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '2rem',
  justifyContent: 'center',
});

const CurrencySettings = () => {
  const baseCurrency = useSelector(useBaseCurrency);
  const supportedSymbols = useSelector(useSupportedSymbols);
  const dispatch = useDispatch();

  const changeCurrency = e => {
    dispatch(changeBaseCurrency(e.target.value));
  };

  return (
    <Card sx={{ padding: '2rem' }}>
      <Title>Your current base currency is: {baseCurrency}</Title>
      <ContentInfo
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '2rem',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">Change base currency</Typography>
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <Select
            autoWidth
            displayEmpty
            value={baseCurrency}
            onChange={changeCurrency}
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
          {/*   <FormHelperText>Without label</FormHelperText> */}
        </FormControl>
      </ContentInfo>
    </Card>
  );
};

export default CurrencySettings;
