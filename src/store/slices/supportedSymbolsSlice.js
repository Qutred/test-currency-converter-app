import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSymbols } from '../../api/currencyApi';

export const getCurrencySymbols = createAsyncThunk(
  'supportedSymbols/getCurrencySymbols',
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

const initialState = {
  supportedSymbols: {},
  loading: {
    status: 'idle',
    error: null,
  },
};

export const currencySlice = createSlice({
  name: 'supportedSymbols',
  initialState: initialState,
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
  },
});

export const useSupportedSymbolsLoading = store => {
  console.log(store.supportedSymbols.loading);
  return store.supportedSymbols.loading;
};
export const useSupportedSymbols = state =>
  state.supportedSymbols.supportedSymbols;

export default currencySlice.reducer;
