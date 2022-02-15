import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRates } from '../../api/currencyApi';

export const getCurrencyRates = createAsyncThunk(
  'rates/getCurrencyRates',
  async (_, { rejectWithValue, getState }) => {
    try {
      let baseCurrency = getState().base.baseCurrency;
      let response = await getRates(baseCurrency);
      if (!response.status === 200) {
        throw new Error('Server Error');
      }
      return response.data.rates;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  rates: {},
  loading: {
    status: 'idle',
    error: null,
  },
};

export const currencySlice = createSlice({
  name: 'rates',
  initialState: initialState,

  extraReducers: {
    /* RATES */
    [getCurrencyRates.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [getCurrencyRates.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.rates = action.payload;
    },
    [getCurrencyRates.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

export const useRates = store => store.rates.rates;
export const useRatesLoading = store => store.rates.loading;

export default currencySlice.reducer;
