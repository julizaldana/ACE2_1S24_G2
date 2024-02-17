import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../css/linechart.css';


const LineChart = ({ data, labels, colors, title}) => {
    const chartRef = useRef(null);
    let myChart = null;
  
    useEffect(() => {
      if (chartRef.current && myChart) {
        myChart.destroy();
      }
  
      const ctx = chartRef.current.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            tension: 0.5, // Suaviza la línea
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
  
      return () => {
        if (myChart) {
          myChart.destroy();
        }
      };
    }, [data, labels, colors, title]);
  
    return (
      <div className='chartline-container'>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };

export default LineChart;