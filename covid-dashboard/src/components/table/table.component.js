import "./table.component.scss";

import { fullWidth, perPeople } from "./utils";
import { getViewTable } from "./table.template";

import { WORLD_POPULATION, CovidDashboardService } from "../../core/index";

function changeView() {
    const cases = document.querySelectorAll('[name="cases"]');
    const tableBodies = document.querySelectorAll(".table__body");
    cases.forEach((element) => {
        element.addEventListener("change", () => {
            tableBodies.forEach((tableBody) => {
                tableBody.classList.remove("active");
            });

            tableBodies.forEach((tableBody) => {
                if (element.value === tableBody.dataset.type) {
                    tableBody.classList.add("active");
                }
            });
        });
    });
}
fullWidth();

export class Table {
    partPeoples = 100000;

    constructor() {
        this.tableContainer = document.querySelector(".table-wrapper");
        this.currentSelect = "World";
    }

    loadTable() {
        if (this.currentSelect !== "World") {
            const currentCountry = CovidDashboardService.getState().filter((item) => {
                return item.country === this.currentSelect;
            });
            this.tableContainer.innerHTML = getViewTable(
                this.currentSelect,
                currentCountry[0].totalConfirmed,
                currentCountry[0].totalDeaths,
                currentCountry[0].totalRecovered,
                currentCountry[0].totalConfirmedPer,
                currentCountry[0].totalDeathsPer,
                currentCountry[0].totalRecoveredPer,
                currentCountry[0].newConfirmed,
                currentCountry[0].newDeaths,
                currentCountry[0].newRecovered,
                currentCountry[0].newConfirmedPer,
                currentCountry[0].newDeathsPer,
                currentCountry[0].newRecoveredPer
            );
        } else {
            this.tableContainer.innerHTML = getViewTable(
                this.currentSelect,
                this.countriesData.totalConfirmed,
                this.countriesData.totalDeaths,
                this.countriesData.totalRecovered,
                perPeople(this.countriesData.totalConfirmed, WORLD_POPULATION, this.partPeoples),
                perPeople(this.countriesData.totalDeaths, WORLD_POPULATION, this.partPeoples),
                perPeople(this.countriesData.totalRecovered, WORLD_POPULATION, this.partPeoples),
                this.countriesData.newConfirmed,
                this.countriesData.newDeaths,
                this.countriesData.newRecovered,
                perPeople(this.countriesData.newConfirmed, WORLD_POPULATION, this.partPeoples),
                perPeople(this.countriesData.newDeaths, WORLD_POPULATION, this.partPeoples),
                perPeople(this.countriesData.newRecovered, WORLD_POPULATION, this.partPeoples),
            );
        }
        changeView();
    }

    init() {
        CovidDashboardService.getGlobal().then((data) => this.viewData(data));
    }

    update(currentSelect) {
        this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
        this.currentSelect = this.countriesData.country;
        this.loadTable();
    }

    viewData(data) {
        this.countriesData = data;
        this.loadTable();
    }
}
