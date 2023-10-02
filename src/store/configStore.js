import { configureStore } from '@reduxjs/toolkit';
import chartFiltersReducer from './sliceChartFilters';

const store = configureStore({
  reducer: {
    chartFilters: chartFiltersReducer
  }
});

export default store;
