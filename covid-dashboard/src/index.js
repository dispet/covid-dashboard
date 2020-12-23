import "./assets/styles/styles.scss";
import {CountryList, Graph, Table, WordMap} from "./components/index";
import {CovidDashboardService} from "./core/services";

const countryList = new CountryList();
const graph = new Graph();
const table = new Table();
const wordMap = new WordMap();
let click = 0;

function radiosClick() {
  switch (CovidDashboardService.getIndex()) {
    case 0:
    case 1:
    case 2: {
      document.getElementById("global").click();
      document.getElementById("globalnumber").click();
      break;
    }
    case 3:
    case 4:
    case 5: {
      document.getElementById("lastday").click();
      document.getElementById("globalnumber").click();
      break;
    }
    case 6:
    case 7:
    case 8: {
      document.getElementById("global").click();
      document.getElementById("peoplepernumber").click();
      break;
    }
    case 9:
    case 10:
    case 11: {
      document.getElementById("lastday").click();
      document.getElementById("peoplepernumber").click();
      break;
    }
    default:
  }
}

document.querySelector('.country-list-and-search').addEventListener('click', (e) => {
  if (e.target.id === 'search') return;

  if (click) {
    click -= 1;
    return;
  }
  if (e.target.id === 'btn-forward') {
    click = 4;
    document.getElementsByClassName('map-btn-forward')[0].click();
    graph.arrowBlock.getElementsByClassName('arrow-right')[0].click();
    radiosClick();
  } else if (e.target.id === 'btn-back') {
    click = 4;
    document.getElementsByClassName('map-btn-back')[0].click();
    graph.arrowBlock.getElementsByClassName('arrow-left')[0].click();
    radiosClick();
  } else if (!!e.target.closest('li') && e.target !== e.currentTarget) {
    const countryCode = e.target.closest('li').getAttribute('data-country');
    CovidDashboardService.setCountry(countryCode);
    countryList.sortByDescend();
    table.update(CovidDashboardService.getCountry());
    wordMap.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
  }

});

document.querySelector('.world-map-and-switcher').addEventListener('click', (e) => {
  if (click) {
    click -= 1;
    return;
  }
  if (e.target.id === 'map-btn-forward') {
    click = 4;
    document.getElementsByClassName('btn-forward')[0].click();
    graph.arrowBlock.getElementsByClassName('arrow-right')[0].click();
    radiosClick();
  } else if (e.target.id === 'map-btn-back') {
    click = 4;
    document.getElementsByClassName('btn-back')[0].click();
    graph.arrowBlock.getElementsByClassName('arrow-left')[0].click();
    radiosClick()
  } else if (CovidDashboardService.getCountry()) {
    countryList.sortByDescend();
    table.update(CovidDashboardService.getCountry());
    graph.update(CovidDashboardService.getCountry());
  }
});

document.querySelector('.graph-chart').addEventListener('click', (e) => {
  if (click) {
    click -= 1;
    return;
  }
  if (e.target.classList.contains('arrow-right')) {
    click = 4;
    document.getElementsByClassName('btn-forward')[0].click();
    document.getElementsByClassName('map-btn-forward')[0].click();
    radiosClick()
  } else if (e.target.classList.contains('arrow-left')) {
    click = 4;
    document.getElementsByClassName('btn-back')[0].click();
    document.getElementsByClassName('map-btn-back')[0].click();
    radiosClick()
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("switchers__input")) {
    const radios = document.querySelectorAll(".switchers__input");
    table.changeTableView(radios);

    if (click) {
      click -= 1;
      return;
    }
    let checkedValue = 0;

    radios.forEach((item, i) => {
      if (item.checked) {
        checkedValue += 1 << i;
      }
    });
    switch (checkedValue) {
      case 6:
        checkedValue = 3;
        break;
      case 9:
        checkedValue = 6;
        break;
      case 10:
        checkedValue = 9;
        break;
      default:
        checkedValue = 0;
    }
    let index = CovidDashboardService.getIndex();
    while (checkedValue > index) {
      index += 1;
      click = 3;
      document.getElementsByClassName('btn-forward')[0].click();
      document.getElementsByClassName('map-btn-forward')[0].click();
      graph.arrowBlock.getElementsByClassName('arrow-right')[0].click();
    }
    while (checkedValue < index) {
      index -= 1;
      click = 3;
      document.getElementsByClassName('btn-back')[0].click();
      document.getElementsByClassName('map-btn-back')[0].click();
      graph.arrowBlock.getElementsByClassName('arrow-left')[0].click();
    }
    CovidDashboardService.setIndex(checkedValue);
  }
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
        graph.chart.resize();
      }
    });
  }

  addClass();
}

fullWidth();
