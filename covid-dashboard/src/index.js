import "./assets/styles/styles.scss";
import { CountryList, Graph, Table, WordMap } from "./components/index";
import { CovidDashboardService } from "./core/services";

const countryList = new CountryList();
const graph = new Graph();
const table = new Table();
const wordMap = new WordMap();

document.querySelector(".country-list").addEventListener("click", (e) => {
    if (e.target.id === "search") return;
    const countryCode = e.target.closest("li").getAttribute("data-country");
    if (e.target !== e.currentTarget) {
        CovidDashboardService.setCountry(countryCode);
        countryList.sortByDescend();
    }
    table.update(CovidDashboardService.getCountry());
    wordMap.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
});

document.querySelector(".world-map").addEventListener("click", (e) => {
    table.update(CovidDashboardService.getCountry());
    wordMap.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("switchers__input")) {
        const radios = document.querySelectorAll(".switchers__input");
        table.changeTableView(radios);
    }
});

countryList.init();
graph.init();
table.init();
wordMap.init();
