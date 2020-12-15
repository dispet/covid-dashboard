import {CovidDashboardService, restcountries, causes, causesStr} from "../../core/index";

export class CountryList {

  constructor() {
    this.countriesList = document.querySelector('.country-list');
    this.searchInput = document.getElementById('search');
    this.cause = document.querySelector('.cause');
    this.sortItem = 0;
    this.per = '';

    this.searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value;
      this.countriesData = this.countriesDataStore.filter((item) => item.country.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.countriesList.innerHTML = '';
      if (this.countriesData.length > 0) this.loadCountry(0);
    });

    document.querySelector('.country-list-and-search').addEventListener('click', (e1) => {
      if (!e1.target.id.includes('btn')) return;
      if (e1.target.id === 'btn-back') {
        if (this.sortItem !== 0) this.sortItem -= 1;
        else this.sortItem = 11;
      }
      if (e1.target.id === 'btn-forward') {
        if (this.sortItem !== 11) this.sortItem += 1;
        else this.sortItem = 0;
      }
      document.querySelector('.cause').innerHTML = `<span class="cause">${causesStr[this.sortItem]}</span>`
      this.countriesList.innerHTML = '';
      this.per = '';
      if (this.sortItem > 5) {
        this.loadCountryData(0);
        this.per = 'per';
      }

      this.countriesData.sort((a, b) => {
        return b[causes[this.sortItem] + this.per] - a[causes[this.sortItem] + this.per];
      });
      this.loadCountry(0);
    });

  }

  sortByDescend(sortItem) {
    document.querySelector('.cause').innerHTML = `<span class="cause">${causesStr[this.sortItem]}</span>`
    this.countriesData.sort((a, b) => {
      return b[causes[this.sortItem] + this.per] - a[causes[this.sortItem] + this.per];
    });
    CovidDashboardService.setState(this.countriesData);
    this.countriesList.innerHTML = '';
    this.searchInput.value = '';
    this.loadCountry(0);
  }

  loadCountry(index) {
    const country = this.countriesData[index];
    const listItem = document.createElement('li');
    listItem.setAttribute('data-country', country.code);
    const restcountry = restcountries.filter((item) => item.name === country.country)[0];
    listItem.innerHTML = `<img src=${restcountry.flag} class="country-item__flag" alt=""><span>${country.country}</span>
    <span>${country[causes[this.sortItem] + this.per]}</span>`;
    this.countriesList.appendChild(listItem);
    if (this.countriesData[index + 1]) {
      this.loadCountry(index + 1);
    }
  }

  loadCountryData(index) {
    const country = this.countriesData[index];
    const restcountry = restcountries.filter((item) => item.name === country.country)[0];
    this.countriesData[index][causes[this.sortItem].concat('per')] = Math.floor(country[causes[this.sortItem]] * 100000 / restcountry.population);
    if (this.countriesData[index + 1]) {
      this.loadCountryData(index + 1);
    }
  }

  init() {
    CovidDashboardService.getCountries().then((data) => this.viewData(data));
  }

  viewData(data) {
    this.countriesData = data;
    this.countriesDataStore = data;
    this.sortByDescend(this.sortItem);
  }
}
