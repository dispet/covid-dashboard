import Chart from 'chart.js';
import './graph.component.scss';
import { CovidDashboardService } from "../../core/index";

export class Graph {
  constructor() {
    this.graphChart = document.querySelector('.graph-chart');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
  }

  loadGraph() {
    this.canvas.className = 'graph';
    this.graphChart.append(this.canvas);

    const graph = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
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
  }

  init() {
    CovidDashboardService.getWorld().then((data) => this.viewData(data));
  }

  update(currentSelect) {

    CovidDashboardService.getCountryTotal().then((data) => this.viewData(data));
    this.loadGraph();
  }

  viewData(data) {
    // console.log(data)
    this.loadGraph();
  }
}
