<template>
  <div id="chart">
  </div>
</template>

<script>
import PieChart from "./js/PieChart.js";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,

  name: "Chart",
  components: {
    PieChart
  },

  props: ['chartData', 'options'],

  data() {
    return {
      chartData: null,

      dado: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      opcao: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    };
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
};
</script>

<style>
  #chart {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
