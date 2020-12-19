function createElem(elem, cls, text) {
    const element = document.createElement(elem);
    element.className = cls;
    element.textContent = text || "";
    return element;
}

function perPeople(cases, people, partPeople) {
    return Math.round((cases / people) * partPeople);
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

export { fullWidth, perPeople };
