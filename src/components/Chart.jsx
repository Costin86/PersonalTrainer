import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

function Statistics({ data }) {
  const chartData = {
    labels: data.map(item => item.activity),
    datasets: [
      {
        label: 'Duration (min)',
        data: data.map(item => item.duration),
        backgroundColor: 'rgb(50, 205, 50)',
      },
    ],
  };


  return <Bar data={chartData} />;
}

export default Statistics;
