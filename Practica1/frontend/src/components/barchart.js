import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../css/linechart.css';

const VerticalBarChart = ({ data, labels,  title }) => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartRef.current && myChart) {
      myChart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,      
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          }
        }
      }
    });

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data, labels,  title]);

  return (
    <div className='chartline-container'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default VerticalBarChart;
