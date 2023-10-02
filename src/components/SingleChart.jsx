import { useEffect, useRef, useState } from 'react';
import * as echartUtils from '../utils/echarts';

const SingleChart = ({ data, labels, title, subtitle }) => {
  const [option, setOption] = useState(echartUtils.template);
  const chartContainer = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    echartUtils.updateSeries(
      0,
      data,
      labels,
      option,
      setOption,
      title,
      subtitle
    );
  }, [data, labels, title, subtitle]);

  useEffect(() => {
    if (!myChart.current) {
      myChart.current = window.echarts.init(chartContainer.current);
    }

    const gridId = echartUtils.createHorizontalBarChart(
      0,
      data,
      labels,
      option,
      setOption
    );

    if (option && myChart.current) {
      myChart.current.setOption(option);
    }
  }, [data, labels, option]);

  useEffect(() => {
    if ((myChart.current, chartContainer.current)) {
      new ResizeObserver(() => myChart.current.resize()).observe(
        chartContainer.current
      );
    }
  }, []);

  return (
    <div
      id='myChart'
      ref={chartContainer}
      style={{ width: '100%', minHeight: '500px' }}
    />
  );
};

export default SingleChart;
