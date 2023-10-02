import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFilterInitialValues = createAsyncThunk(
  'chartFilters/getValues',
  async (_, { rejectWithValue }) =>
    fetch('http://demo8449112.mockable.io/filters')
      .then(res =>
        res.ok ? res.json() : rejectWithValue([], 'error while fetching data')
      )
      .catch(error => rejectWithValue([], error))
);

const filters = {
  demographic: '',
  location: '',
  demoCut: '',
  topic: '',
  action: '',
  time: ''
};

const sliceChartFilters = createSlice({
  name: 'chartFilters',

  initialState: {
    filters,
    values: {},
    status: 'loading'
  },

  reducers: {
    resetFilters: ({ values, status }) => ({
      status,
      values,
      filters
    }),

    setFilter: (state, { payload }) => {
      const { name, value } = payload;

      state.filters[name] = value;

      if (
        name === 'topic' &&
        !state.values.action[value]?.includes(state.filters.action)
      ) {
        state.filters.action = '';
      }
    }
  },

  extraReducers: {
    [getFilterInitialValues.pending]: state => {
      state.status = 'loading';
    },

    [getFilterInitialValues.fulfilled]: (state, { payload }) => {
      state.values = payload;

      state.status = 'success';
    },

    [getFilterInitialValues.rejected]: state => {
      state.status = 'failed';
    }
  }
});

export const { setFilter, resetFilters } = sliceChartFilters.actions;

export default sliceChartFilters.reducer;
