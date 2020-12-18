import {CovidDashboardService, restcountries} from "../../core/index";
import {AREA_COUNTRIES} from "./counties";

export class WordMap {
  constructor() {
    this.worldMap = document.getElementById("map");
  }

  initMap() {
    // const mainMap = L.map(this.worldMap).setView([53.89, 27.55], 2);
    // mainMap.createPane("labels");

    //     const positronLabels = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png", {
    //         attribution: "©OpenStreetMap, ©CartoDB"
    //         // pane: 'labels',
    //     }).addTo(mainMap);
  }

  init() {
  }

  update(currentSelect) {

  }

}

// const mymap = L.map("map").setView([53.89, 27.55], 4);
// mymap.createPane("labels");

// const positronLabels = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png", {
//     attribution: "©OpenStreetMap, ©CartoDB"
//     // pane: 'labels',
// }).addTo(mymap);

// const geojson = L.geoJson(AREA_COUNTRIES, {
//     style(feature) {
//         return {
//             weight: 1,
//             color: "white",
//             fillColor: "#000",
//             fillOpacity: 0.3
//         };
//     }
// }).addTo(mymap);

// geojson.eachLayer(function (layer) {
//     layer.bindPopup(layer.feature.properties.name);
// });
// geojson.on("mouseover", function (e) {
//     popup = e.popup;
//     e.sourceTarget.setStyle({
//         fillColor: "#db2929",
//         fillOpacity: 0.5
//     });
// });
// geojson.on("mouseout", function (e) {
//     popup = null;
//     e.sourceTarget.setStyle({
//         fillColor: "#000",
//         fillOpacity: 0.3
//     });
// });

// function onece() {
//     console.log("touch");
// }

// L.circleMarker([55.17, 24.03], {
//     color: "red",
//     radius: 10,
//     fillColor: "#f03",
//     fillOpacity: 1
// })
//     .addTo(mymap)
//     .on("click", onece);

// // L.marker([53.89, 27.55]).addTo(mymap)
// //     .on('click', onece);

// L.circle([53.89, 27.55], 10000, {
//     color: "red",
//     fillColor: "#f03",
//     fillOpacity: 1
// })
//     .addTo(mymap)
//     .on("click", onece);
