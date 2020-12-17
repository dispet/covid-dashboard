import "./table.component.scss";
import { fullWidth } from "./fullwidth";
import { WORLD_POPULATION, CovidDashboardService } from "../../core/index";

fullWidth();
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
        this.tableData = document.querySelector(".table-data");
        this.currentSelect = "World";
    }

    loadTable() {
        this.tableData.innerHTML = `
        <div class="table">
          <div class="table__header">${this.currentSelect}</div>
            <div class="tabs">
              <div class="tabs__header">
                <div class="tabs__header_item active" data-tab="1">Global</div>
                <div class="tabs__header_item" data-tab="2">Last day</div>
                <div class="tabs__header_item" data-tab="3">Global / 100 000</div>
                <div class="tabs__header_item" data-tab="4">Last day / 100 000</div>
              </div>
              <div class="tabs__body">
                  <div class="tabs__item active" data-tab="1">
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Confirmed: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="confirmed">${this.countriesData.totalConfirmed}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Deaths: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="deaths">${this.countriesData.totalDeaths}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Recovered: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="recovered">${this.countriesData.totalRecovered}</span>
                      </div>
                    </div>
                  </div>
                  <div class="tabs__item" data-tab="2">
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Confirmed: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-confirmed">+ ${this.countriesData.newConfirmed}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Deaths: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-deaths">+ ${this.countriesData.newDeaths}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Recovered: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-recovered">+ ${this.countriesData.newRecovered}</span>
                      </div>
                    </div>
                  </div>
                  <div class="tabs__item" data-tab="3">
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Confirmed/100000: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="confirmed">${Math.floor(
                            this.countriesData.totalConfirmed / this.populationDivideHundred
                        )}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Deaths/100000: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="deaths">${Math.floor(
                            this.countriesData.totalDeaths / this.populationDivideHundred
                        )}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Recovered/100000: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="recovered">${Math.floor(
                            this.countriesData.totalRecovered / this.populationDivideHundred
                        )}</span>
                      </div>
                    </div>
                  </div>
                  <div class="tabs__item" data-tab="4">
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Confirmed: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-confirmed">+ ${
                            this.countriesData.newConfirmed / this.populationDivideHundred
                        }</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Deaths/100000: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-deaths">+ ${this.countriesData.newDeaths / this.populationDivideHundred}</span>
                      </div>
                    </div>
                    <div class="table__item">
                      <div class="table__item_part">
                        <span>Recovered: </span>
                      </div>
                      <div class="table__item_part">
                        <span class="new-recovered">+ ${
                            this.countriesData.newRecovered / this.populationDivideHundred
                        }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `;
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
