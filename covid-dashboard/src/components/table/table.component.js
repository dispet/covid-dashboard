import "./table.component.scss";
import { perPeople } from "./utils";
import { getViewTable, bodyTableView } from "./table.template";
import {
    WORLD_POPULATION,
    CovidDashboardService,
    PART_PEOPLES,
    GLOBAL_NUMBER,
    LAST_DAY_GLOBAL_NUMBER,
    GLOBAL_PEOPLE_PER_NUMBER,
    LASTDAY_PEOPLE_PER_NUMBER
} from "../../core/index";

export class Table {
    constructor() {
        this.tableContainer = document.querySelector(".table-wrapper");
        this.currentSelect = "World";
    }

    changeTableView(radios) {
        const tableBody = document.querySelector(".table__body");
        let checkedValue = "";

        radios.forEach((item) => {
            if (item.checked) {
                checkedValue += item.value;
            }
        });

        if (this.currentSelect !== "World") {
            const currentCountry = CovidDashboardService.getState().filter((item) => {
                return item.country === this.currentSelect;
            });

            switch (checkedValue) {
                case GLOBAL_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        currentCountry[0].totalConfirmed,
                        currentCountry[0].totalDeaths,
                        currentCountry[0].totalRecovered
                    );
                    break;
                case LAST_DAY_GLOBAL_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        currentCountry[0].newConfirmed,
                        currentCountry[0].newDeaths,
                        currentCountry[0].newRecovered
                    );
                    break;
                case GLOBAL_PEOPLE_PER_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        currentCountry[0].totalConfirmedPer,
                        currentCountry[0].totalDeathsPer,
                        currentCountry[0].totalRecoveredPer
                    );
                    break;
                case LASTDAY_PEOPLE_PER_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        currentCountry[0].newConfirmedPer,
                        currentCountry[0].newDeathsPer,
                        currentCountry[0].newRecoveredPer
                    );
                    break;
                default:
            }
        }
        if (this.currentSelect === "World") {
            switch (checkedValue) {
                case GLOBAL_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        this.countriesData.totalConfirmed,
                        this.countriesData.totalDeaths,
                        this.countriesData.totalRecovered
                    );
                    break;
                case LAST_DAY_GLOBAL_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        this.countriesData.newConfirmed,
                        this.countriesData.newDeaths,
                        this.countriesData.newRecovered
                    );
                    break;
                case LASTDAY_PEOPLE_PER_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        perPeople(this.countriesData.newConfirmed, WORLD_POPULATION, PART_PEOPLES),
                        perPeople(this.countriesData.newDeaths, WORLD_POPULATION, PART_PEOPLES),
                        perPeople(this.countriesData.newRecovered, WORLD_POPULATION, PART_PEOPLES)
                    );
                    break;
                case GLOBAL_PEOPLE_PER_NUMBER:
                    tableBody.innerHTML = bodyTableView(
                        perPeople(this.countriesData.totalConfirmed, WORLD_POPULATION, PART_PEOPLES),
                        perPeople(this.countriesData.totalDeaths, WORLD_POPULATION, PART_PEOPLES),
                        perPeople(this.countriesData.totalRecovered, WORLD_POPULATION, PART_PEOPLES)
                    );
                    break;
                default:
            }
        }
    }

    loadTable() {
        this.tableContainer.innerHTML = getViewTable(
            this.currentSelect,
            this.countriesData.totalConfirmed,
            this.countriesData.totalDeaths,
            this.countriesData.totalRecovered
        );
        const radios = document.querySelectorAll(".switchers__input");
        this.changeTableView(radios);
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
