import "./table.component.scss";
import { WORLD_POPULATION, CovidDashboardService } from "../../core/index";

    }
    }
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
