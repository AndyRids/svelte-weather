/* eslint-disable no-unused-vars */
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function createChart(canvas, parameters) {
  // rendering context of canvas element
  const context = canvas.getContext('2d');

  // gradient stroke of the line chart border
  const gradientStroke = context.createLinearGradient(0, 0, 110, 0);
  // gradient fill for the area below the line chart border
  const gradientFill = context.createLinearGradient(0, 0, 0, 110);

  // gradient colour stops for gradientStroke & gradientFill
  gradientStroke.addColorStop(0, 'rgba(137, 171, 245, 1)');
  gradientStroke.addColorStop(1, 'rgba(137, 171, 245, 0.1)');
  gradientFill.addColorStop(0, 'rgba(137, 171, 245, 1)');
  gradientFill.addColorStop(1, 'rgba(137, 171, 245, 0.1)');

  // weather data from parameters passed to the action
  const { hourly, index } = parameters;

  const config = {
    // chart type
    type: 'line',
    // data
    data:
    {
      // for bar chart
      labels: [],
      datasets:
      [
        {
          label: 'Chance of Rain',
          data: [],
          backgroundColor: gradientFill,
          borderColor: gradientStroke,
          borderWidth: 1,
          pointBackgroundColor: 'rgba(137, 171, 245, 1)',
          pointRadius: 2,
          lineTension: 0.1,
        },
      ],
    },
    // chart options
    options:
    {
      layout:
      {
        padding:
        {
          top: 15,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      animation:
      {
        easing: 'easeInOutBack',
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins:
      {
        datalabels:
        {
          display: false,
          anchor: 'end',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          align: 'top',
          offset: 4,
          formatter: (value) => `${value.l}%`,
          textAlign: 'center',
          font:
          {
            weight: 500,
          },
          padding:
          {
            top: 0,
            bottom: 0,
            left: 2,
            right: 2,
          },
        },
      },
      tooltips:
      {
        enabled: false,
      },
      legend:
      {
        display: false,
        labels:
        {
          padding: 10,
          boxWidth: 10,
          fontFamily: 'IBM Plex Sans',
          fontSize: 14,
        },
      },
      scales:
      {
        xAxes:
        [
          {
            type: 'time',
            distribution: 'series',
            display: true,
            offset: true,
            time:
            {
              parser: 'hh',
              stepSize: 1,
            },
            gridLines:
            {
              display: false,
              drawOnChartArea: false,
              drawBorder: false,
              color: 'rgb(82, 82, 82)',
              zeroLineColor: 'rgb(82, 82, 82)',
              zeroLineBorderDash: [5, 4],
              offsetGridLines: true,
            },
            ticks:
            {
              beginAtZero: false,
              source: 'data',
              minRotation: 0,
              maxRotation: 0,
            },
          },
        ],
        yAxes:
        [
          {
            display: true,
            type: 'linear',
            ticks:
            {
              callback: (value) => `${value}mm/h`,
              beginAtZero: true,
              // mirror: true,
              labelOffset: 0,
              source: 'data',
              maxTicksLimit: 3,
              suggestedMax: 1,
              suggestedMin: 0,
              precision: 1,
            },
            gridLines:
            {
              display: true,
              drawBorder: false,
              borderDash: [5, 8],
              color: 'rgb(82, 82, 82)',
              zeroLineColor: 'rgb(82, 82, 82)',
              zeroLineBorderDash: [5, 8],
              // offsetGridLines: true,
            },
          },
        ],
      },
    },
  };

  Chart.defaults.global.defaultFontFamily = 'IBM Plex Sans';
  Chart.defaults.global.defaultFontColor = 'rgb(82, 82, 82)';
  Chart.defaults.global.defaultFontSize = 12;

  // create chart with the rendering context and config
  const chart = new Chart(context, config);

  const formatData = (hours, i) => {
    const numHours = 6;
    // format chart x & y values as an array
    const data = hours.map((hour) => {
      // temperature and time values
      const { chanceOfRain, unixTime, precipitation } = hour;
      // return x & y values as time & temp
      return { x: new Date(unixTime * 1000), y: precipitation, l: chanceOfRain };
    });

    if (i === 0) {
      // first 8 hours from current time (index 0)
      data.splice(numHours);
    } else {
      // 8 hours from selected time
      data.splice(0, i);

      if (data.length > numHours) {
        data.splice(numHours);
      }
    }

    // return formatted data array
    return { data };
  };

  const { data } = formatData(hourly, index);

  chart.data.datasets[0].data = data;

  chart.update();

  return {
    update: (params) => {
      // new hourly weather data & new active hourly weather card index
      const { hourly: newHourly, index: newIndex } = params;

      const { data: newData } = formatData(newHourly, newIndex);
      // update chart dataset
      chart.data.datasets[0].data = newData;
      // chart.data.labels = newLabels;
      // update the chart to display new data
      chart.update();
    },
  };
}
