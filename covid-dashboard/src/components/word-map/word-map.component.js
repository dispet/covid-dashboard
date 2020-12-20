import L from "leaflet";
import "leaflet/dist/leaflet.css";

import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {AREA_COUNTRIES} from "./counties";
import {CovidDashboardService, restcountries, causes, causesStr} from "../../core/index";

// stupid hack so that leaflet's images work after going through webpack
L.Icon.Default.imagePath = ".";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

const mainMap = L.map("map", {
  center: [51.505, -0.09],
  zoom: 13,
  minZoom: 2,
  maxZoom: 8
});

const geojson = L.geoJson(AREA_COUNTRIES, {
  style(feature) {
    return {
      weight: 1,
      color: "white",
      fillColor: "#000",
      fillOpacity: 0.3
    };
  }
}).addTo(mainMap);

export class WordMap {

  constructor() {
    this.currentSelect = "";
    this.index = 0;
  }

  init() {
    CovidDashboardService.getCountries().then((data) => this.loadMap(data));
  }

  loadMap(data) {
    console.log(data);

    mainMap.setView([53.89, 27.55], 4);
    mainMap.createPane("labels");

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png", {
      attribution: "©OpenStreetMap, ©CartoDB",
      pane: "labels"
    }).addTo(mainMap);

    data.forEach((element) => {
      restcountries.forEach((item) => {
        if (element.country === item.name) {
          L.circle([item.lat, item.lon], {
            color: "red",
            radius: 10,

            fillColor: "#f03",
            fillOpacity: 1
          })
            .addTo(mainMap)
            .on("click", () => console.log("Touch"));
        }
      });
    });

    L.control.scale().addTo(mainMap);

    geojson.on("mouseover", (e) => {
      this.layerPopup(e.layer);

      e.layer.openPopup();
      e.sourceTarget.setStyle({
        fillColor: "#db2929",
        fillOpacity: 0.5
      });
    });

    geojson.on("mouseout", (e) => {
      e.layer.closePopup();
      e.sourceTarget.setStyle({
        fillColor: "#000",
        fillOpacity: 0.3
      });
    });

    geojson.on("click", (e) => {
      this.countriesData = CovidDashboardService.getState().filter((item) => item.country.includes(e.sourceTarget.feature.properties.name))[0];
      if (this.countriesData) CovidDashboardService.setCountry(this.countriesData.code);
    });
  }

  layerPopup(layer) {
    this.index = CovidDashboardService.getIndex();
    const arr = CovidDashboardService.getState().filter((item) => item.country.includes(layer.feature.properties.name))[0];
    if (arr)
      layer.bindPopup(`<span class="icon-marker"><span class="icon-marker-tooltip"><h2>${arr.country}</h2>
         <li><strong>${causesStr[this.index]}:</strong>${arr[causes[this.index]]}</li>`)
  }

  // updatePopup() {
  //   if (this.index !== CovidDashboardService.getIndex() && CovidDashboardService.getIndex()) {
  //     this.index = CovidDashboardService.getIndex();
  //     this.layersPopup(CovidDashboardService.getState());
  //   }
  //   geojson.eachLayer((layer) => {
  //     const arr = data.filter((item) => item.country.includes(layer.feature.properties.name))[0];
  //     if (arr)
  //       layer.bindPopup(`<span class="icon-marker"><span class="icon-marker-tooltip"><h2>${arr.country}</h2>
  //        <li><strong>${causesStr[this.index]}:</strong>${arr[causes[this.index]]}</li>`)
  //   });
  // }

  update(currentSelect) {
    this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
    this.currentSelect = this.countriesData.country;
    const restcountry = restcountries.filter((item) => item.name === this.currentSelect)[0];
    mainMap.setView([restcountry.lat, restcountry.lon], 4);
    mainMap.createPane("labels");
  }

  viewData(data) {
    this.countriesData = data;
    console.log(this.countriesData);
  }
}
