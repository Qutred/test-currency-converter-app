import { configureStore } from '@reduxjs/toolkit';
import base from './slices/baseCurrencySlice';
import rates from './slices/rateSlice';
import supportedSymbols from './slices/supportedSymbolsSlice';

export default configureStore({
  reducer: {
    base: base,
    rates: rates,
    supportedSymbols: supportedSymbols,
  },
});
