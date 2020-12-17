import "./table.component.scss";
import { WORLD_POPULATION, CovidDashboardService } from "../../core/index";

    });


      switch (checkedValue) {
        case "globalglobalnumber":
          tableBody.innerHTML = bodyTableView(
            currentCountry[0].totalConfirmed,
            currentCountry[0].totalDeaths,
            currentCountry[0].totalRecovered
          );
          break;
        case "lastdayglobalnumber":
          tableBody.innerHTML = bodyTableView(
            currentCountry[0].newConfirmed,
            currentCountry[0].newDeaths,
            currentCountry[0].newRecovered
          );
          break;
        case "globalpeoplepernumber":
          tableBody.innerHTML = bodyTableView(
            currentCountry[0].totalConfirmedPer,
            currentCountry[0].totalDeathsPer,
            currentCountry[0].totalRecoveredPer
          );
          break;
        case "lastdaypeoplepernumber":
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
        case "globalglobalnumber":
          tableBody.innerHTML = bodyTableView(
            this.countriesData.totalConfirmed,
            this.countriesData.totalConfirmed,
            this.countriesData.totalRecovered
          );
          break;
        case "lastdayglobalnumber":
          tableBody.innerHTML = bodyTableView(
            this.countriesData.newConfirmed,
            this.countriesData.newDeaths,
            this.countriesData.newRecovered
          );
          break;
        case "lastdaypeoplepernumber":
          tableBody.innerHTML = bodyTableView(
            perPeople(this.countriesData.newConfirmed, WORLD_POPULATION, this.partPeoples),
            perPeople(this.countriesData.newDeaths, WORLD_POPULATION, this.partPeoples),
            perPeople(this.countriesData.newRecovered, WORLD_POPULATION, this.partPeoples)
          );
          break;
        case "globalpeoplepernumber":
          tableBody.innerHTML = bodyTableView(
            perPeople(this.countriesData.totalConfirmed, WORLD_POPULATION, this.partPeoples),
            perPeople(this.countriesData.totalDeaths, WORLD_POPULATION, this.partPeoples),
            perPeople(this.countriesData.totalRecovered, WORLD_POPULATION, this.partPeoples)
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
