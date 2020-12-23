import Chart from "chart.js";
import "./graph.component.scss";
import { CovidDashboardService, WORLD_POPULATION, restcountries } from "../../core/index";
// import { doc } from 'prettier';

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
        document.querySelector(".graph-chart .fullwidth__switcher").addEventListener("click", () => {
            this.chart.canvas.parentNode.style.height = "100%";
            this.chart.canvas.parentNode.style.width = "100%";
            this.chart.canvas.style.height = "100%";
            this.chart.canvas.style.width = "100%";
        });

        this.updateGraph();
    }

    init() {
        CovidDashboardService.getWorld().then((data) => this.viewData(data));
    }

    update(currentSelect) {
        this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
        CovidDashboardService.getCountryTotal(this.countriesData.slug).then((data) => this.transformData(data));
    }

    transformData(data) {
        // const obj = data[0].country;
        let population = WORLD_POPULATION;
        const processedDate = {
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
            processedDate.cases[key] = cases[index];
            processedDate.deaths[key] = deaths[index];
            processedDate.recovered[key] = recovered[index];
        });

        processedDate.casesPerOneHundredThousand = {};
        processedDate.deathsPerOneHundredThousand = {};
        processedDate.recoveredPerOneHundredThousand = {};

        date.forEach((key, index) => {
            processedDate.casesPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.cases)[index] * 100000) / population
            );
            processedDate.deathsPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.deaths)[index] * 100000) / population
            );
            processedDate.recoveredPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.recovered)[index] * 100000) / population
            );
        });

        this.loadGraph(processedDate, data[0].country);
    }

    viewData(data) {
        const processedDate = data;

        processedDate.casesPerOneHundredThousand = {};
        processedDate.deathsPerOneHundredThousand = {};
        processedDate.recoveredPerOneHundredThousand = {};

        Object.keys(data.cases).forEach((key, index) => {
            processedDate.casesPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.cases)[index] * 100000) / WORLD_POPULATION
            );
            processedDate.deathsPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.deaths)[index] * 100000) / WORLD_POPULATION
            );
            processedDate.recoveredPerOneHundredThousand[key] = Math.floor(
                (Object.values(processedDate.recovered)[index] * 100000) / WORLD_POPULATION
            );
        });

        this.loadGraph(processedDate, "World");
    }
}
