function getViewTable(currentSelect, totalConfirmed, totalDeaths, totalRecovered) {
    const tableView = `
    <div class="table">
      <div class="table__header">${currentSelect}</div>
      <div class="switchers">
        <div class="switchers__item">
          <div class="switchers__part">
            <input class="switchers__input" type="radio" id="global" name="cases" value="global" checked/>
            <label class="switchers__label" for="global">All cases</label>
          </div>
          <div class="switchers__part">
            <input class="switchers__input" type="radio" id="lastday" name="cases" value="lastday"/>
            <label class="switchers__label" for="lastday">Last day cases</label>
          </div>
         </div>
         <div class="switchers__item">
          <div class="switchers__part">
           <input class="switchers__input" type="radio" id="globalnumber" name="countcases" value="globalnumber" checked/>
           <label class="switchers__label" for="globalnumber">Global cases</label>
          </div>
          <div class="switchers__part">
            <input class="switchers__input" type="radio" id="peoplepernumber" name="countcases" value="peoplepernumber" />
            <label class="switchers__label" for="peoplepernumber">Cases per 100000</label>
          </div>
        </div>
      </div>
      <div class="table__body active" data-type="global">
        <div class="table__item">
          <div class="table__part">
            <div class="table__part_header">
              Confirmed
            </div>
            <div class="table__part_body">
              ${totalConfirmed}
            </div>
          </div>
        </div>
        <div class="table__item">
          <div class="table__part">
            <div class="table__part_header">
              Deaths
            </div>
            <div class="table__part_body">
              ${totalDeaths}
            </div>
          </div>
        </div>
        <div class="table__item">
          <div class="table__part">
            <div class="table__part_header">
              Recovered
            </div>
            <div class="table__part_body">
              ${totalRecovered}
            </div>
          </div>
        </div>
      </div>
  </div>
  `;

    return tableView;
}

function bodyTableView(totalConfirmed, totalDeaths, totalRecovered) {
    const bodyTable = `
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Confirmed
          </div>
          <div class="table__part_body">
            ${totalConfirmed}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Deaths
          </div>
          <div class="table__part_body">
            ${totalDeaths}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Recovered
          </div>
          <div class="table__part_body">
            ${totalRecovered}
          </div>
        </div>
      </div>
`;

    return bodyTable;
}

export { getViewTable, bodyTableView };
