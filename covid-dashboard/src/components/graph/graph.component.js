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

    const mainDate = [
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
      },
      {
        title: 'Daily Cases per 100 000',
        type: 'casesPerOneHundredThousand',
        backgroundColor: '#27ae60'
      },
      {
        title: 'Daily Deaths per 100 000',
        type: 'deathsPerOneHundredThousand',
        backgroundColor: '#27ae60'
      },
      {
        title: 'Daily Recovered per 100 000',
        type: 'recoveredPerOneHundredThousand',
        backgroundColor: '#27ae60'
      }
    ];

    const updateGraph = (background = "#f1c40f", set = dataSet) => {
      const data = {
        labels: lables,
        datasets: [
          {
            label: "Daily Cases",
            data: set,
            backgroundColor: background
          }
        ]
      };

      const options = {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

      if (!this.chart) {
        this.chart = new Chart(this.ctx, {
          type: "bar",
          data,
          options
        });
      }

      this.chart.options = { ...options };
      this.chart.data = { ...data };
      this.chart.update();
    };

    updateGraph();

    let counter = 0
    title.textContent = `${obj} Daily Cases`;

    this.arrowBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('arrow-right')) {
        counter += 1;
        if (counter > mainDate.length - 1) counter = 0;

        title.textContent = `${obj} ${mainDate[counter].title}`;
        const set = Object.values(externalData[mainDate[counter].type]);
        const backgroundColor = mainDate[counter].backgroundColor;
        updateGraph(backgroundColor, set)
      }
      if (e.target.classList.contains('arrow-left')) {
        counter -= 1;
        if (counter < 0) counter = mainDate.length - 1;

        title.textContent = `${obj} ${mainDate[counter].title}`;
        const set = Object.values(externalData[mainDate[counter].type]);
        const backgroundColor = mainDate[counter].backgroundColor;
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
    const obj = data[0].country;
    let population = WORLD_POPULATION;
    const processedDate = {
      cases: {},
      deaths: {},
      recovered: {}
    }

    let date = [];
    const cases = [];
    const deaths = [];
    const recovered = [];

    restcountries.forEach((country) => {
      if (country.name === obj) {
        population = country.population;
      }
    })

    data.forEach((item) => {
      date.push(item.date);
      cases.push(item.totalConfirmed);
      deaths.push(item.totalDeaths);
      recovered.push(item.totalRecovered);
    });

    date = date.map((item) => item.substring(2, 10).replace(/-/g, '/'))
    date.forEach((key, index) => {
      processedDate.cases[key] = cases[index];
      processedDate.deaths[key] = deaths[index];
      processedDate.recovered[key] = recovered[index];
    });

    processedDate.casesPerOneHundredThousand = {};
    processedDate.deathsPerOneHundredThousand = {};
    processedDate.recoveredPerOneHundredThousand = {};

    date.forEach((key, index) => {
      processedDate.casesPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.cases)[index] * 100000 / population);
      processedDate.deathsPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.deaths)[index] * 100000 / population);
      processedDate.recoveredPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.recovered)[index] * 100000 / population);
    });

    this.loadGraph(processedDate, obj);
  }

  viewData(data) {
    const processedDate = data;

    processedDate.casesPerOneHundredThousand = {};
    processedDate.deathsPerOneHundredThousand = {};
    processedDate.recoveredPerOneHundredThousand = {};

    Object.keys(data.cases).forEach((key, index) => {
      processedDate.casesPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.cases)[index] * 100000 / WORLD_POPULATION);
      processedDate.deathsPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.deaths)[index] * 100000 / WORLD_POPULATION);
      processedDate.recoveredPerOneHundredThousand[key] = Math.floor(Object.values(processedDate.recovered)[index] * 100000 / WORLD_POPULATION);
    });

    this.loadGraph(processedDate);
  }
}
