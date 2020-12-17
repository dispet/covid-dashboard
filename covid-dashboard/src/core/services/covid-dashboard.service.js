import {SUMMARY_URL, WORLD_URL, COUNTRY_URL} from "../constants";

export class CovidDashboardService {
  static getData() {
    return fetch(SUMMARY_URL)
      .then((res) => this.getStatus(res))
      .catch((err) => err);
  }

  static getStatus(res) {
    return res?.status >= 200 && res?.status < 300 ? res?.json() : undefined;
  }

  static async getCountries() {
    const data = await this.getData().then((res) => res?.Countries);

    return data?.map((res) => {
      return {
        country: res?.Country,
        code: res?.CountryCode,
        date: res?.Date,
        newConfirmed: res?.NewConfirmed,
        newDeaths: res?.NewDeaths,
        newRecovered: res?.NewRecovered,
        premium: res?.Premium,
        slug: res?.Slug,
        totalConfirmed: res?.TotalConfirmed,
        totalDeaths: res?.TotalDeaths,
        totalRecovered: res?.TotalRecovered
      };
    });
  }

  static async getDate() {
    const data = await this.getData().then((res) => res?.Date);

    return data;
  }

  static async getGlobal() {
    const data = await this.getData().then((res) => res?.Global);

    return {
      newConfirmed: data?.NewConfirmed,
      newDeaths: data?.NewDeaths,
      newRecovered: data?.NewRecovered,
      totalConfirmed: data?.TotalConfirmed,
      totalDeaths: data?.TotalDeaths,
      totalRecovered: data?.TotalRecovered
    };
  }

  static setState(dataToStore) {
    this.summaryData = dataToStore;
  }

  static getState() {
    return this.summaryData;
  }

  static setCountry(dataToStore) {
    this.currentSelect = dataToStore;
  }

  static getCountry() {
    return this.currentSelect;
  }

  static getDataWorld() {
    return fetch(WORLD_URL)
      .then((res) => this.getStatus(res))
      .catch((err) => err);
  }

  static getDataCountry() {
    return fetch(`${COUNTRY_URL}${this.currentSelect}`)
      .then((res) => this.getStatus(res))
      .catch((err) => err);
  }

  static async getWorld() {
    return this.getDataWorld().then((res) => res);
  }

  static async getCountryTotal() {
    const data = await this.getDataCountry().then((res) => res);

    return data?.map((res) => {
      return {
        country: res?.Country,
        code: res?.CountryCode,
        date: res?.Date,
        lat: res?.Lat,
        lon: res?.Lon,
        totalConfirmed: res?.Confirmed,
        totalDeaths: res?.Deaths,
        totalRecovered: res?.Recovered
      };
    });
  }
}
