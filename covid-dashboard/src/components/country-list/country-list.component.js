import {CovidDashboardService, restcountries, causes, causesStr} from "../../core/index";

export class CountryList {

  constructor() {
    this.countriesList = document.querySelector('.country-list');
    this.searchInput = document.getElementById('search');
    this.cause = document.querySelector('.cause');
    this.sortItem = 0;

    this.searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value;
      this.countriesData = this.countriesDataStore.filter((item) => item.country.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.countriesList.innerHTML = '';
      if (this.countriesData.length > 0) this.loadCountry(0);
    });

    document.querySelector('.country-list-and-search').addEventListener('click', (e1) => {
      if (!e1.target.id.includes('btn')) return;
      if (e1.target.id === 'btn-back') {
        this.sortItem -= 1
        if (this.sortItem < 0) this.sortItem = causes.length - 1;
      }
      if (e1.target.id === 'btn-forward') {
        this.sortItem += 1;
        if (this.sortItem > causes.length - 1) this.sortItem = 0;
      }
      CovidDashboardService.setIndex(this.sortItem);
      this.sortByDescend(this.sortItem);
    });

  }

  sortByDescend() {
    this.countriesData = this.countriesDataStore;
    document.querySelector('.cause').innerHTML = `<span class="cause">${causesStr[this.sortItem]}</span>`
    this.countriesData.sort((a, b) => {
      return b[causes[this.sortItem]] - a[causes[this.sortItem]];
    });
    CovidDashboardService.setState(this.countriesData);

    this.currentSelect = CovidDashboardService.getCountry();
    this.countriesList.innerHTML = '';
    this.searchInput.value = '';
    this.loadCountry(0);
  }

  loadCountry(index) {
    const country = this.countriesData[index];
    const listItem = document.createElement('li');
    listItem.setAttribute('data-country', country.code);
    listItem.setAttribute('class', country.code === this.currentSelect ? 'country--select' : '');
    listItem.innerHTML = `<img src=${country.flag} class="country-item__flag" alt=""><span>${country.country}</span>
    <span class="country-item__cases">${country[causes[this.sortItem]]}</span>`;
    this.countriesList.appendChild(listItem);
    if (this.countriesData[index + 1]) {
      this.loadCountry(index + 1);
    }
  }

  init() {
    CovidDashboardService.getCountries().then((data) => this.viewData(data));
    CovidDashboardService.getGlobal().then((data1) => this.viewData1(data1));
  }

  viewData(data) {
    if (!data) return;
    CovidDashboardService.setIndex(this.sortItem);
    this.countriesData = data;
    for (let i = 0; i < this.countriesData.length; i += 1) {
      const restcountry = restcountries.filter((item1) => item1.name === this.countriesData[i].country)[0];
      this.countriesData[i].totalConfirmedPer = Math.floor(this.countriesData[i].totalConfirmed * 100000 / restcountry.population);
      this.countriesData[i].totalDeathsPer = Math.floor(this.countriesData[i].totalDeaths * 100000 / restcountry.population);
      this.countriesData[i].totalRecoveredPer = Math.floor(this.countriesData[i].totalRecovered * 100000 / restcountry.population);
      this.countriesData[i].newConfirmedPer = Math.floor(this.countriesData[i].newConfirmed * 100000 / restcountry.population);
      this.countriesData[i].newDeathsPer = Math.floor(this.countriesData[i].newDeaths * 100000 / restcountry.population);
      this.countriesData[i].newRecoveredPer = Math.floor(this.countriesData[i].newRecovered * 100000 / restcountry.population);
      this.countriesData[i].flag = restcountry.flag;
      this.countriesData[i].population = restcountry.population;
    }
    this.countriesDataStore = this.countriesData;
    this.sortByDescend();
  }

  viewData1(data1) {
    if (!data1) return;
    document.querySelector('.global-cases__count').innerHTML = `<span class="global-cases__count">${data1.totalConfirmed}</span>`;
  }
}
