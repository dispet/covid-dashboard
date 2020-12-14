import { CovidDashboardService } from "../../core/index";

export class Table {
    constructor() {
        this.tableData = document.querySelector(".table-data");
        this.currentSelect = "World";
    }

    loadTable() {
        this.tableData.innerHTML = `<span>${this.currentSelect}</span>
        <span>Confirmed: <span class="confirmed">${this.countriesData.totalConfirmed}</span> <span class="new-confirmed">+ ${this.countriesData.newConfirmed}</span></span>
        <span>Deaths: <span class="deaths">${this.countriesData.totalDeaths}</span> <span class="new-deaths">+ ${this.countriesData.newDeaths}</span></span>
        <span>Recovered: <span class="recovered">${this.countriesData.totalRecovered}</span> <span class="new-recovered">+ ${this.countriesData.newRecovered}</span></span>`;
    }

    init() {
        CovidDashboardService.getGlobal().then((data) => this.viewData(data));
    }

    update(currentSelect) {
        this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
        console.log(this.countriesData);
        this.currentSelect = this.countriesData.country;
        this.loadTable();
    }

    viewData(data) {
        this.countriesData = data;
        this.loadTable();
    }
}
