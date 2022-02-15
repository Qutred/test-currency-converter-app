import { configureStore } from '@reduxjs/toolkit';
import currency from './slices/currencySlice';
import base from './slices/baseCurrencySlice';
import rates from './slices/rateSlice';
import supportedSymbols from './slices/supportedSymbolsSlice';

export default configureStore({
  reducer: {
    // currency: currency,
    base: base,
    rates: rates,
    supportedSymbols: supportedSymbols,
  },
});
