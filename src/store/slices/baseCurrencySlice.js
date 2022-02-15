import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseCurrency: 'USD',
  loading: {
    status: 'idle',
    error: null,
  },
};

export const currencySlice = createSlice({
  name: 'base',
  initialState: initialState,
  reducers: {
    changeBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const useBaseCurrency = store => store.base.baseCurrency;
export const useBaseLoading = store => store.base.loading;
export const { changeBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;
