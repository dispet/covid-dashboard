import Chart from 'chart.js';
import './graph.component.scss';
import { CovidDashboardService } from "../../core/index";

export class Graph {
  constructor() {
    this.graphChart = document.querySelector('.graph-chart');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
  }

  loadGraph(data) {
    this.canvas.className = 'graph';
    this.graphChart.append(this.canvas);

    const lables = Object.keys(data.cases);
    const cases = Object.values(data.cases);

    const graph = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: lables,
        datasets: [{
          label: 'World Cases',
          data: cases,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });


};

  init() {
    CovidDashboardService.getWorld().then((data) => this.viewData(data));
  }

  update(currentSelect) {
    CovidDashboardService.getCountryTotal().then((data) => this.viewData(data));
    this.loadGraph();
  }

  viewData(data) {
    this.loadGraph(data);
  }
}
