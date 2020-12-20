function createElem(elem, cls, text) {
  const element = document.createElement(elem);
  element.className = cls;
  element.textContent = text || "";
  return element;
}

function createTabs() {
  document.addEventListener("click", (e) => {
    const tabsBodies = document.querySelectorAll(".tabs__item");
    const tabsHeaders = document.querySelectorAll(".tabs__header_item");
    const target = e.target;
    tabsHeaders.forEach((tabHeader) => {
      tabHeader.classList.remove("active");
    });
    if (target.classList.contains("tabs__header_item")) {
      target.classList.add("active");
      tabsBodies.forEach((tabBody) => {
        tabBody.classList.remove("active");
      });
      tabsBodies.forEach((tabBody) => {
        if (tabBody.dataset.tab === target.dataset.tab) {
          tabBody.classList.add("active");
        }
      });
    }
  });
}

function fullWidth() {
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


export { fullWidth, createTabs };
