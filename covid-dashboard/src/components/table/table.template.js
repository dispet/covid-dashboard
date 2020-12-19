function getViewTable(
    currentSelect,
    totalConfirmed,
    totalDeaths,
    totalRecovered
) {
    const tableView = `
    <div class="table">
      <div class="table__header">${currentSelect}</div>
      <div class="switchers">
        <div class="switchers__item">
          <div class="switchers__part">
            <input type="radio" id="global" name="cases" value="global" checked/>
            <label for="global">Absolute cases</label>
          </div>
          <div class="switchers__part">
            <input type="radio" id="perpopulation" name="cases" value="perpopulation" />
            <label for="perpopulation">Cases per 100 000</label>
          </div>
        </div>
        <div class="switchers__item">
          <div class="switchers__part">
            <input type="radio" id="all" name="timecases" value="all" checked/>
            <label for="all">All cases</label>
          </div>
          <div class="switchers__part">
            <input type="radio" id="lastday" name="timecases" value="lastday" />
            <label for="lastday">Last day</label>
          </div>
        </div>
      </div>
      <div class="table__body">
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

export { getViewTable };
