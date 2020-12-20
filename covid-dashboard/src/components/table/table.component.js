import "./table.component.scss";

import { fullWidth, createTabs } from "./utils";
import { getViewTable } from "./table.template";

import { WORLD_POPULATION, CovidDashboardService } from "../../core/index";

// function catchState() {
//     const cases = document.querySelectorAll('[name="cases"]');
//     const casesTimes = document.querySelectorAll('[name="timecases"]');
//     cases.forEach((element) => {
//         element.addEventListener("change", () => {
//             return element.value;
//         });
//     });
// }

createTabs();
// fullWidth();
function tabs() {
  document.addEventListener("click", (e) => {
    const tabsBodies = document.querySelectorAll(".tabs__item");
    const tabsHeaders = document.querySelectorAll(".tabs__header_item");
    const target = e.target;
    tabsHeaders.forEach((tabHeader) => {
      tabHeader.classList.remove("active");
    });
    if (target.classList.contains("tabs__header_item")) {
      target.classList.add("active");
      tabsBodies.forEach((tabBody) => {
        tabBody.classList.remove("active");
      });
      tabsBodies.forEach((tabBody) => {
        if (tabBody.dataset.tab === target.dataset.tab) {
          tabBody.classList.add("active");
        }
      });
    }
  });
}
tabs();


export class Table {
  populationDivideHundred = WORLD_POPULATION / 100000;

  constructor() {
    // this.tableData = document.querySelector(".table-wrapper");
    this.tableContainer = document.querySelector(".table-wrapper");
    this.currentSelect = "World";
  }

  loadTable() {
    this.tableContainer.innerHTML = getViewTable(
      this.currentSelect,
      this.countriesData.totalConfirmed,
      this.countriesData.totalDeaths,
      this.countriesData.totalRecovered
    );
  }

  catchState() {
    const cases = document.querySelectorAll('[name="cases"]');
    const casesTimes = document.querySelectorAll('[name="timecases"]');
    cases.forEach((element) => {
      element.addEventListener("change", () => {
        this.tableContainer.innerHTML = getViewTable(
          element.value,
          this.countriesData.totalConfirmed,
          this.countriesData.totalDeaths,
          this.countriesData.totalRecovered
        );
      });
    });
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
