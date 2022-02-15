import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSymbols, getRates, convert } from '../../api/currencyApi';

export const getCurrencySymbols = createAsyncThunk(
  'currency/getCurrencySymbols',
  async (_, { rejectWithValue }) => {
    try {
      let response = await getSymbols();
      if (!response.status === 200) {
        throw new Error('Server Error');
      }
      return response.data.symbols;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrencyRates = createAsyncThunk(
  'currency/getCurrencyRates',
  async (_, { rejectWithValue, getState }) => {
    try {
      let baseCurrency = getState().currency.baseCurrency;
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

export const convertCurrency = createAsyncThunk(
  'currency/convertCurrency',
  async (data, { rejectWithValue, getState }) => {
    try {
      let response = await convert(data);
      if (!response.status === 200) {
        throw new Error('Server Error');
      }
      return response.data.info.rate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  baseCurrency: 'USD',
  rates: {},
  supportedSymbols: {},
  loading: {
    status: 'idle',
    error: null,
  },
  convertResult: null,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState: initialState,
  reducers: {
    changeBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: {
    /* SYMBOLS */
    [getCurrencySymbols.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [getCurrencySymbols.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.supportedSymbols = action.payload;
    },
    [getCurrencySymbols.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },

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

    /* CONVERT */
    [convertCurrency.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [convertCurrency.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.convertResult = action.payload;
    },
    [convertCurrency.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

export const useSupportedSymbols = state => state.currency.supportedSymbols;
export const useBaseCurrency = store => store.currency.baseCurrency;
export const useRates = store => store.currency.rates;
export const useLoading = store => store.currency.loading;
export const useConvertResult = store => store.currency.convertResult;

export const { changeBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;
