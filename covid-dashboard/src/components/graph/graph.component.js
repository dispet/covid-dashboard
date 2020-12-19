import Chart from 'chart.js';
import './graph.component.scss';
import { CovidDashboardService } from "../../core/index";
// import { doc } from 'prettier';

Chart.defaults.global.defaultFontColor = '#bdbdbd';

export class Graph {
  constructor() {
    this.graphChart = document.querySelector('.graph-chart');
    this.arrowBlock = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
  }

  loadGraph(externalData) {
    this.canvas.className = 'graph';
    this.graphChart.append(this.canvas);

    this.arrowBlock.className = 'arrow-block';
    this.graphChart.append(this.arrowBlock);

    const lables = Object.keys(externalData.cases);
    const dataSet = Object.values(externalData.cases);

    this.arrowBlock.innerHTML =
      `<button class="arrow-block__button arrow-left"></button>
    <div class="arrow-block__title"></div>
    <button class="arrow-block__button arrow-right"></button>`;

    const title = document.querySelector('.arrow-block__title')

    const wordDate = [
      {
        title: 'World Daily Cases',
        type: 'cases',
        backgroundColor: '#f1c40f'
      }
      ,
      {
        title: 'World Daily Deaths',
        type: 'deaths',
        backgroundColor: '#e74c3c'
      },
      {
        title: 'World Daily Recovered',
        type: 'recovered',
        backgroundColor: '#27ae60'
      }
    ];
 const updateGraph = (background = '#f1c40f', set = dataSet) => {
    const data = {
      labels: lables,
      datasets: [{
        label: 'Daily Cases',
        data: set,
        backgroundColor: background,
        // borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }]
    }

    const options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return new Chart(this.ctx, {
      type: 'bar',
      data,
      options
    });
  }

  updateGraph();

    let counter = 0
    title.textContent = 'World Daily Cases';

    this.arrowBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('arrow-right')) {
        counter += 1;
        if (counter > wordDate.length - 1) counter = 0;

        title.textContent = wordDate[counter].title;
        const set = Object.values(externalData[wordDate[counter].type]);
        const backgroundColor = wordDate[counter].backgroundColor;
        updateGraph(backgroundColor, set)
      }
      if (e.target.classList.contains('arrow-left')) {
        counter -= 1;
        if (counter < 0) counter = wordDate.length - 1;

        title.textContent = wordDate[counter].title;
        const set = Object.values(externalData[wordDate[counter].type]);
        const backgroundColor = wordDate[counter].backgroundColor;
        updateGraph(backgroundColor, set)
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
