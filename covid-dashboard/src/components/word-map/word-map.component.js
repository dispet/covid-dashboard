import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./word-map.component.scss";

import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { AREA_COUNTRIES } from "./counties";
import { CovidDashboardService, restcountries, causes, causesStr } from "../../core/index";

L.Icon.Default.imagePath = ".";
L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
    iconSize: [19, 19]
});

const mainMap = L.map("map", {
    center: [45, 2],
    zoom: 2,
    minZoom: 1,
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

const legend = L.control({ position: "bottomleft" });

legend.onAdd = function () {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #ff0000"></i><span>Death</span><br>';
    div.innerHTML += '<i style="background: #448D40"></i><span>Recovered</span><br>';
    div.innerHTML += '<i style="background: #ec9410"></i><span>Confirmed</span><br>';
    div.innerHTML += '<i style="background: #616161"></i><span>Land</span><br>';
    div.innerHTML += '<i style="background: #E8E6E0"></i><span>Water</span><br>';

    return div;
};

legend.addTo(mainMap);
L.control.scale().addTo(mainMap);

export class WordMap {
    constructor() {
        this.cause = document.querySelector(".cause1");
        this.currentSelect = "";
        this.index = 0;
        this.sortItem = 0;
        this.markerList = [];
        document.addEventListener("click", (e) => {
            const parent = e.target.closest(".map-and-other-stuff");
            if (parent) {
                setTimeout(() => {
                    mainMap.invalidateSize();
                }, 10);
            }
        });

        document.querySelector(".map-and-other-stuff").addEventListener("click", (e1) => {
            if (!e1.target.id.includes("btn")) return;
            if (e1.target.id === "map-btn-back") {
                this.sortItem -= 1;
                if (this.sortItem < 0) this.sortItem = causes.length - 1;
            }
            if (e1.target.id === "map-btn-forward") {
                this.sortItem += 1;
                if (this.sortItem > causes.length - 1) this.sortItem = 0;
            }
            CovidDashboardService.setIndex(this.sortItem);
            document.querySelector(".cause1").innerHTML = `<span class="cause1">${causesStr[this.sortItem]}</span>`;
            this.countriesData = CovidDashboardService.getState();
            this.iconsLoad();
        });
    }

    init() {
        CovidDashboardService.getCountries().then((data) => this.loadMap(data));
    }

    loadMap(data) {
        this.countriesData = CovidDashboardService.getState() || data;

        const bounds = L.latLngBounds(L.latLng(-190, -190), L.latLng(190, 190));

        mainMap.setMaxBounds(bounds);
        mainMap.on("drag", function f2() {
            mainMap.panInsideBounds(bounds, { animate: false });
        });
        mainMap.setView([53.89, 27.55], 4);
        mainMap.createPane("labels");

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png", {
            attribution: "©CartoDB",
            pane: "labels"
        }).addTo(mainMap);

        this.iconsLoad();

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
            this.countriesData = CovidDashboardService.getState().filter((item) =>
                item.country.includes(e.sourceTarget.feature.properties.name)
            )[0];
            if (this.countriesData) CovidDashboardService.setCountry(this.countriesData.code);
        });
    }

    layerPopup(layer) {
        this.index = CovidDashboardService.getIndex();
        const arr = CovidDashboardService.getState().filter((item) =>
            item.country.includes(layer.feature.properties.name)
        )[0];
        if (arr)
            layer.bindPopup(
                `<span class="icon-marker"><span class="icon-marker-tooltip"><h2>${arr.country}</h2>
             <strong>${causesStr[this.index]}:</strong>${arr[causes[this.index]]}`,
                { className: "custom-popup" }
            );
    }

    update(currentSelect) {
        this.countriesData = CovidDashboardService.getState().filter((item) => item.code === currentSelect)[0];
        this.currentSelect = this.countriesData.country;
        const restcountry = restcountries.filter((item) => item.name === this.currentSelect)[0];
        mainMap.setView([restcountry.lat, restcountry.lon], 5);
        mainMap.createPane("labels");
    }

    viewData(data) {
        this.countriesData = data;
    }

    iconsLoad() {
        if (!this.countriesData) return;
        this.markerList.forEach((element) => mainMap.removeLayer(element));
        this.countriesData.forEach((element) => {
            const restcountry = restcountries.filter((item) => element.country === item.name)[0];

            if (restcountry) {
                this.markerList.push(
                    L.circleMarker([restcountry.lat, restcountry.lon], {
                        color: causes[this.sortItem].toLowerCase().includes("conf")
                            ? "orange"
                            : causes[this.sortItem].toLowerCase().includes("rec")
                            ? "green"
                            : "red",
                        radius: 1 + this.generateIconSize(element[causes[this.sortItem]]),

                        fillOpacity: 1
                    }).addTo(mainMap)
                );
            }
        });
    }

    generateIconSize(sumData) {
        this.countriesData.sort((a, b) => {
            return b[causes[this.sortItem]] - a[causes[this.sortItem]];
        });
        const max = Math.floor(this.countriesData[0][causes[this.sortItem]] / 10);
        if (max <= 1) return sumData + 1;
        let iconSize = 0;
        for (let i = 0; i <= 10; i += 1) {
            iconSize = i + 1;
            if (sumData <= max * i) break;
        }
        return iconSize;
    }
}
