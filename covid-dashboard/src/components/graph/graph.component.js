import Chart from 'chart.js';
import './graph.component.scss';
import { CovidDashboardService, WORLD_POPULATION, restcountries } from "../../core/index";
// import { doc } from 'prettier';

Chart.defaults.global.defaultFontColor = '#bdbdbd';

export class Graph {
  constructor() {
    this.graphChart = document.querySelector('.graph-chart');
    this.graphBlock = document.createElement('div')
    this.arrowBlock = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
  }

  loadGraph(externalData, obj = 'World') {
    this.graphBlock.className = 'graph-block';
    this.canvas.className = 'graph';
    this.graphChart.append(this.graphBlock);
    this.graphBlock.append(this.canvas);

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
        title: 'Daily Cases',
        type: 'cases',
        backgroundColor: '#f1c40f'
      }
      ,
      {
        title: 'Daily Deaths',
        type: 'deaths',
        backgroundColor: '#e74c3c'
      },
      {
        title: 'Daily Recovered',
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
        }]
      }

      const options = {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
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
    title.textContent = `${obj} Daily Cases`;

    this.arrowBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('arrow-right')) {
        counter += 1;
        if (counter > wordDate.length - 1) counter = 0;

        title.textContent = `${obj} ${wordDate[counter].title}`;
        const set = Object.values(externalData[wordDate[counter].type]);
        const backgroundColor = wordDate[counter].backgroundColor;
        updateGraph(backgroundColor, set)
      }
      if (e.target.classList.contains('arrow-left')) {
        counter -= 1;
        if (counter < 0) counter = wordDate.length - 1;

        title.textContent = `${obj} ${wordDate[counter].title}`;
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
    this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
    CovidDashboardService.getCountryTotal(this.countriesData.slug).then((data) => this.transformData(data));
  }

  transformData(data) {
    let obj = data[0].country;
    let population = WORLD_POPULATION;
    const processedDate = {
      cases: {},
      deaths: {},
      recovered: {}
    }

    console.log(data)

    let date = [];
    const cases = [];
    const deaths = [];
    const recovered = [];

    restcountries.forEach((country) => {
      if (country.name === obj) {
        population = country.population;
      }
    })

    // TODO
    const modeIndex = CovidDashboardService.getIndex();
    console.log(modeIndex)

    if (false) obj = `${obj} per 100 000`;

    data.forEach((item) => {
      date.push(item.date);
      if (false) {
        cases.push(Math.round(item.totalConfirmed * 100000 / population));
        deaths.push(Math.round(item.totalDeaths * 100000 / population));
        recovered.push(Math.round(item.totalRecovered * 100000 / population));
      } else {
        cases.push(item.totalConfirmed);
        deaths.push(item.totalDeaths);
        recovered.push(item.totalRecovered);
      }
    });

    date = date.map((item) => item.substring(2, 10).replace(/-/g,'/'))
    date.forEach((key, index) => {
      processedDate.cases[key] = cases[index];
      processedDate.deaths[key] = deaths[index];
      processedDate.recovered[key] = recovered[index];
    });

    this.loadGraph(processedDate, obj);
  }

  viewData(data) {
    this.loadGraph(data);
  }
}
