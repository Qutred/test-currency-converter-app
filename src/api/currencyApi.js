import axios from 'axios';
import apiUrl from './../apiUrl';

export const getSymbols = () => {
  return axios.get(`${apiUrl}/symbols`);
};

export const getRates = baseCurrency => {
  return axios.get(`${apiUrl}/latest`, {
    params: {
      amount: 1,
      base: baseCurrency,
      places: 2,
    },
  });
};

export const convert = ({ from, to, amount }) => {
  return axios.get(`${apiUrl}/convert`, {
    params: {
      from,
      to,
      amount: amount,
      places: 2,
    },
  });
};
