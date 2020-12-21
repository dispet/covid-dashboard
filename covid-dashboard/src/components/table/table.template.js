function getViewTable(currentSelect, totalConfirmed, totalDeaths, totalRecovered) {
  const tableView = `
    <div class="table">
      <div class="table__header">${currentSelect}</div>

      <div class="table__body" data-type="global">
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
