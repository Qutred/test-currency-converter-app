import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { useBaseCurrency } from './../../store/slices/baseCurrencySlice';
import {
  useRates,
  useRatesLoading,
  getCurrencyRates,
} from './../../store/slices/rateSlice.js';
import CircularProgress from '@mui/material/CircularProgress';

const ContentInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
});

const ExchangeRates = () => {
  const baseCurrency = useSelector(useBaseCurrency);
  const rates = useSelector(useRates);
  const dispatch = useDispatch();
  const loading = useSelector(useRatesLoading);

  useEffect(() => {
    debugger;
    dispatch(getCurrencyRates());
  }, []);

  if (!(loading.status === 'resolved')) {
    return <CircularProgress sx={{ mx: 'auto' }} />;
  }

  return (
    <>
      <Card sx={{ padding: '2rem' }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: 'primary.main', fontWeight: '700' }}
        >
          Exchange rates
        </Typography>
        <Divider light />
        <ContentInfo>
          <Typography align="center" variant="body1" sx={{ fontWeight: 700 }}>
            Selling 1 {baseCurrency} you will get
          </Typography>
          <TableContainer
            sx={{ mt: '2rem', maxHeight: '350px' }}
            component={Paper}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    }}
                    align="left"
                  >
                    Currency
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    }}
                    align="left"
                  >
                    Sum
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(rates).map(currency => {
                  return (
                    <TableRow key={currency}>
                      <TableCell align="left">{currency}</TableCell>
                      <TableCell align="left">{rates[currency]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentInfo>
      </Card>
      <Typography sx={{ mt: 1 }}>
        <Link to="/settings">Change base currency</Link>
      </Typography>
    </>
  );
};

export default ExchangeRates;
