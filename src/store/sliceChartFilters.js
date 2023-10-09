import { createSlice } from '@reduxjs/toolkit';

const extractValues = (data = [], key, label = key) =>
  data.map(item => ({
    id: item.id,
    value: item[key],
    label: item[label] === 'Sample' ? 'All' : item[label]
  }));

const reducePayload = (payload, accessKey, valueKey, labelKey = valueKey) =>
  payload.reduce((acc, item) => {
    const { id, [valueKey]: value, [accessKey]: key, [labelKey]: label } = item;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push({
      id,
      value,
      label
    });

    return acc;
  }, {});

const getFilterValues = payload => ({
  demo: extractValues(payload.demo, 'demo', 'demo_fantasy'),
  topic: extractValues(payload.topic, 'topic'),
  location: extractValues(payload.location, 'location'),
  timeframe: extractValues(payload.timeframe, 'timeframe'),
  action: reducePayload(payload.action, 'topic', 'action'),
  demo_cut: reducePayload(payload.demo_cut, 'demo', 'demo_cut')
});

const getDefaultFilters = ({ filters, values }) => ({
  ...filters,
  demo: values.demo[1],
  topic: values.topic[0],
  action: values.action[values.topic[0].value][0]
});

const getSingleChartData = payload =>
  payload.map(
    ({
      demo_cut_fantasy,
      integer_value,
      float_value,
      value_type,
      demo_cut
    }) => ({
      label: demo_cut_fantasy === 'Sample' ? 'All' : demo_cut_fantasy,
      value: value_type ? float_value : integer_value,
      demo_cut
    })
  );

const filters = {
  demo: '',
  location: '',
  demo_cut: '',
  topic: '',
  action: '',
  timeframe: ''
};

const sliceChartFilters = createSlice({
  name: 'chartFilters',

  initialState: {
    filters,
    data: [],
    values: {},
    mode: 'topic',
    status: 'loading'
  },

  reducers: {
    setFilter: (state, { payload }) => {
      const { name, value } = payload;

      state.filters[name] = value;

      // Set a default value for the action filter when `topic` has changed
      if (
        name === 'topic' &&
        state.mode === 'topic' &&
        !state.values.action[value]?.includes(state.filters.action)
      ) {
        state.filters.action =
          state.values.action[state.filters.topic.value][0];
      }
    },

    initFilters: (state, { payload }) => {
      state.status = 'success';

      state.values = getFilterValues(payload);

      state.filters = getDefaultFilters(state);

      console.log('payload :>> ', { ...state.values });
    },

    toggleMode: state => {
      if (state.mode === 'topic') {
        state.mode = 'demo';
      } else {
        state.mode = 'topic';
      }
    },

    setSingleChartData: (state, { payload }) => {
      state.data = getSingleChartData(payload);
    }
  }
});

export const { setFilter, resetFilters, toggleMode } =
  sliceChartFilters.actions;

export default sliceChartFilters.reducer;
