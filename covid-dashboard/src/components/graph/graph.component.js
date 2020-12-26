import Chart from "chart.js";
import "./graph.component.scss";
import { CovidDashboardService, WORLD_POPULATION, restcountries } from "../../core/index";

Chart.defaults.global.defaultFontColor = "#bdbdbd";

export class Graph {
  constructor() {
    this.graphChart = document.querySelector(".graph-chart");
    this.graphBlock = document.createElement("div");
    this.arrowBlock = document.createElement("div");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.counter = 0;
    this.arrowBlock.addEventListener("click", (e) => {
      if (e.target.classList.contains("arrow-right")) {
        this.counter += 1;
        if (this.counter > this.mainDate.length - 1) this.counter = 0;

        this.title.textContent = `${this.obj} ${this.mainDate[this.counter].title}`;
        const set = Object.values(this.externalData[this.mainDate[this.counter].type]);
        const backgroundColor = this.mainDate[this.counter].backgroundColor;
        this.updateGraph(backgroundColor, set);
      }
      if (e.target.classList.contains("arrow-left")) {
        this.counter -= 1;
        if (this.counter < 0) this.counter = this.mainDate.length - 1;

        this.title.textContent = `${this.obj} ${this.mainDate[this.counter].title}`;
        const set = Object.values(this.externalData[this.mainDate[this.counter].type]);
        const backgroundColor = this.mainDate[this.counter].backgroundColor;
        this.updateGraph(backgroundColor, set);
      }
    });
  }

  loadGraph(externalData, obj) {
    this.obj = obj;
    this.externalData = externalData;
    this.graphBlock.className = "graph-block";
    this.canvas.className = "graph";
    this.graphChart.append(this.graphBlock);
    this.graphBlock.append(this.canvas);

    this.arrowBlock.className = "arrow-block";
    this.graphChart.append(this.arrowBlock);

    this.arrowBlock.innerHTML = `<button class="arrow-block__button arrow-left"></button>
    <div class="arrow-block__title"></div>
    <button class="arrow-block__button arrow-right"></button>`;

    this.title = document.querySelector(".arrow-block__title");

    this.mainDate = [
      {
        title: "Daily Cases",
        type: "cases",
        backgroundColor: "#f1c40f"
      },
      {
        title: "Daily Deaths",
        type: "deaths",
        backgroundColor: "#e74c3c"
      },
      {
        title: "Daily Recovered",
        type: "recovered",
        backgroundColor: "#27ae60"
      },
      {
        title: "Daily Cases",
        type: "cases",
        backgroundColor: "#f1c40f"
      },
      {
        title: "Daily Deaths",
        type: "deaths",
        backgroundColor: "#e74c3c"
      },
      {
        title: "Daily Recovered",
        type: "recovered",
        backgroundColor: "#27ae60"
      },
      {
        title: "Daily Cases per 100 000",
        type: "casesPerOneHundredThousand",
        backgroundColor: "#f1c40f"
      },
      {
        title: "Daily Deaths per 100 000",
        type: "deathsPerOneHundredThousand",
        backgroundColor: "#e74c3c"
      },
      {
        title: "Daily Recovered per 100 000",
        type: "recoveredPerOneHundredThousand",
        backgroundColor: "#27ae60"
      },

      {
        title: "Daily Cases per 100 000",
        type: "casesPerOneHundredThousand",
        backgroundColor: "#f1c40f"
      },
      {
        title: "Daily Deaths per 100 000",
        type: "deathsPerOneHundredThousand",
        backgroundColor: "#e74c3c"
      },
      {
        title: "Daily Recovered per 100 000",
        type: "recoveredPerOneHundredThousand",
        backgroundColor: "#27ae60"
      }
    ];

    const lables = Object.keys(externalData[this.mainDate[this.counter].type]);
    const dataSet = Object.values(externalData[this.mainDate[this.counter].type]);
    const background = this.mainDate[this.counter].backgroundColor;
    this.title.textContent = `${obj} ${this.mainDate[this.counter].title}`;

    this.updateGraph = (color = background, set = dataSet) => {
      const data = {
        labels: lables,
        datasets: [
          {
            label: "Daily Cases",
            data: set,
            backgroundColor: color
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
      this.chart.canvas.style.maxWidth = "100%";
    };

    this.updateGraph();
  }

  init() {
    CovidDashboardService.getWorld().then((data) => this.viewData(data));
  }

  update(currentSelect) {
    this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
    CovidDashboardService.getCountryTotal(this.countriesData.slug).then((data) => this.transformData(data));
  }

  getDataPerOneHundredThousand(array, data, population) {
    this.data = data;
    return array.forEach((key, index) => {
      this.data.casesPerOneHundredThousand[key] = Math.floor(
        (Object.values(data.cases)[index] * 100000) / population);
      this.data.deathsPerOneHundredThousand[key] = Math.floor(
        (Object.values(data.deaths)[index] * 100000) / population);
      this.data.recoveredPerOneHundredThousand[key] = Math.floor(
        (Object.values(data.recovered)[index] * 100000) / population);
    });
  }

  transformData(data) {
    let population = WORLD_POPULATION;
    const processedData = {
      cases: {},
      deaths: {},
      recovered: {}
    };

    let date = [];
    const cases = [];
    const deaths = [];
    const recovered = [];

    restcountries.forEach((country) => {
      if (country.name === data[0].country) {
        population = country.population;
      }
    });

    data.forEach((item) => {
      date.push(item.date);
      cases.push(item.totalConfirmed);
      deaths.push(item.totalDeaths);
      recovered.push(item.totalRecovered);
    });

    date = date.map((item) => item.substring(2, 10).replace(/-/g, "/"));
    date.forEach((key, index) => {
      processedData.cases[key] = cases[index];
      processedData.deaths[key] = deaths[index];
      processedData.recovered[key] = recovered[index];
    });

    processedData.casesPerOneHundredThousand = {};
    processedData.deathsPerOneHundredThousand = {};
    processedData.recoveredPerOneHundredThousand = {};

    this.getDataPerOneHundredThousand(date, processedData, population);

    this.loadGraph(processedData, data[0].country);
  }

  viewData(data) {
    const processedData = data;

    processedData.casesPerOneHundredThousand = {};
    processedData.deathsPerOneHundredThousand = {};
    processedData.recoveredPerOneHundredThousand = {};

    this.getDataPerOneHundredThousand(Object.keys(processedData.cases), processedData, WORLD_POPULATION);

    this.loadGraph(processedData, "World");
  }
}
