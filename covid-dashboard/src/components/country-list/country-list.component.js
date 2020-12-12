import {CovidDashboardService} from "../../core/index";
import {Chart} from "./chart/index";

export class CountryList {
  constructor() {
    this.chart = new Chart();
    this.countriesList = document.querySelector('.country-list');
  }

  sortByDescend() {
    this.countriesData.sort((a, b) => {
      return b.totalConfirmed - a.totalConfirmed;
    });
    CovidDashboardService.setState(this.countriesData);
    this.loadCountry(0);
  }

  loadCountry(index) {
    const country = this.countriesData[index];
    const listItem = document.createElement('li');
    listItem.setAttribute('data-country', country.code);
    listItem.innerHTML = `<span>${country.country}</span><span>${country.totalConfirmed}</span>`;
    this.countriesList.appendChild(listItem);
    if (this.countriesData[index + 1]) {
      this.loadCountry(index + 1);
    }
  }

  init() {
    CovidDashboardService.getCountries().then((data) => this.viewData(data));
  }

  viewData(data) {
    this.chart.log(data);
    this.countriesData = data;
    this.sortByDescend();
  }
}
