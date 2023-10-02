import lodash from 'lodash';

export const template = {
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ],
  info: {
    containerWidth: 0,
    containerHeight: 0
  },
  tooltip: {},
  title: {},
  legend: {
    show: true
  },
  grid: [],
  xAxis: [],
  yAxis: [],
  graphic: [],
  series: [],
  toolbox: {
    feature: {
      dataView: {
        readOnly: false
      },
      saveAsImage: {}
    }
  }
};

/*
 * data: array
 * labels: array
 */

export const render = (myChart, option) => {
  option && myChart.setOption(option);
};

export const createHorizontalBarChart = (
  index,
  data,
  labels,
  option,
  setOption
) => {
  if (option.grid.length !== index) return;
  const copy = lodash.cloneDeep(option);

  copy.grid.push({
    id: index,
    bottom: 20,
    right: 10,
    left: 10,
    top: 75
  });

  copy.yAxis.push({
    type: 'category',
    gridIndex: index,
    show: false
  });

  if (labels.length) copy.yAxis[index].data = lodash.cloneDeep(labels);

  copy.xAxis.push({
    type: 'value',
    gridIndex: index,
    max: 100
  });

  copy.series.push({
    type: 'bar',
    xAxisIndex: index,
    yAxisIndex: index,
    data: data.map(d => {
      return {
        value: d,
        itemStyle: {
          color: template.color[0]
        }
      };
    })
  });

  setOption(copy);
};

export const changeBarColor = (
  gridIndex,
  barIndex,
  color,
  option,
  setOption
) => {
  if (
    !option.series[gridIndex] ||
    option.series[gridIndex].data[barIndex].itemStyle.color === color
  )
    return;
  const copy = lodash.cloneDeep(option);
  copy.series[gridIndex].data[barIndex].itemStyle.color = color;
  setOption(copy);
};

export const updateSeries = (
  gridIndex,
  data,
  labels,
  option,
  setOption,
  title,
  subtitle
) => {
  if (!option.series[gridIndex]) return;

  const copy = lodash.cloneDeep(option);

  copy.title = {
    text: title,
    subtext: `By ${subtitle}`,
    textAlign: 'center',
    left: '50%',
    itemGap: 6,
    textStyle: {
      width: 550,
      overflow: 'truncate'
    }
  };

  copy.yAxis[gridIndex].data = lodash.cloneDeep(labels);

  copy.legend = {
    data: labels
  };

  copy.series[gridIndex].data = data.map((value, i) => ({
    value,
    name: labels[i],

    barGap: '50%',
    barCategoryGap: '50%',

    itemStyle: {
      color: template.color[i % template.color.length],
      borderRadius: 6
    },

    label: {
      show: true,
      formatter: ({ name, value }) => `${name}: ${value.toFixed(2)}%`,
      offset: [0, -16],
      position: 'start',
      fontWeight: 'bold'
    }
  }));

  copy.series[gridIndex].name = `${title} by ${subtitle}`;

  setOption(copy);
};
