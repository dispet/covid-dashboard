import "./assets/styles/styles.scss";
import { CountryList, Graph, Table, WordMap } from "./components/index";
import { CovidDashboardService } from "./core/services";

const countryList = new CountryList();
const graph = new Graph();
const table = new Table();
const wordMap = new WordMap();
let click = 0;

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
document.querySelector('.country-list-and-search').addEventListener('click', (e) => {
  if (e.target.id === 'search') return;
  if (click) {
    console.log('.country-list-and-search', click);
    click -= 1;
    return;
  }
  if (e.target.id === 'btn-forward') {
    click = 1;
    graph.arrowBlock.getElementsByClassName('arrow-right')[0].click();
  } else if (e.target.id === 'btn-back') {
    click = 1;
    graph.arrowBlock.getElementsByClassName('arrow-left')[0].click();
  } else if (e.target !== e.currentTarget) {
    const countryCode = e.target.closest('li').getAttribute('data-country');
    CovidDashboardService.setCountry(countryCode);
    countryList.sortByDescend();
    table.update(CovidDashboardService.getCountry());
    wordMap.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
  }

});

document.querySelector('.world-map').addEventListener('click', (e) => {
  if (click) {
    console.log('.world-map', click);
    click -= 1;
    return;
  }
  if (e.target.id === 'btn-forward') {
    click = 1;
    graph.arrowBlock.getElementsByClassName('arrow-right')[0].click();
    countryList.arrowBlock.getElementsByClassName('btn-forward')[0].click();
  } else if (e.target.id === 'btn-back') {
    click = 1;
    graph.arrowBlock.getElementsByClassName('arrow-left')[0].click();
    countryList.arrowBlock.getElementsByClassName('btn-back')[0].click();
  } else {
    countryList.sortByDescend();
    table.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
  }
});

document.querySelector('.graph-chart').addEventListener('click', (e) => {
  if (click) {
    console.log('.graph-chart', click);
    click -= 1;
    return;
  }
  if (e.target.classList.contains('arrow-right')) {
    click = 1;
    document.getElementsByClassName('btn-forward')[0].click();
  } else if (e.target.classList.contains('arrow-left')) {
    click = 1;
    document.getElementsByClassName('btn-back')[0].click();
  }
});

document.querySelector('.table-data').addEventListener('click', (e) => {
  // if (click) {console.log('.table-data',click);click -= 1;return ;}
  // if (e.target.classList.contains('arrow-right')) {
  //   click = 1;
  //    document.getElementsByClassName('btn-forward')[0].click();
  // } else if (e.target.classList.contains('arrow-left')) {
  //   click = 1;
  //   document.getElementsByClassName('btn-back')[0].click();
  // }
});

function allIntit() {
  countryList.init();
  graph.init();
  table.init();
  wordMap.init();
  setTimeout(allIntit, 7200000);
}

allIntit();

function fullWidth() {

  function createElem(elem, cls, text) {
    const element = document.createElement(elem);
    element.className = cls;
    element.textContent = text || "";
    return element;
  }

  const components = document.querySelectorAll(".fullwidth");

  components.forEach((component) => {
    component.appendChild(createElem("span", "fullwidth__switcher", "✥"));
  });

  function addClass() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("fullwidth__switcher")) {
        e.target.closest(".fullwidth").classList.toggle("active");
      }
    });
  }

  addClass();
}

fullWidth();
