function getViewTable(
    currentSelect,
    totalConfirmed,
    totalDeaths,
    totalRecovered,
    totalConfirmedPer,
    totalDeathsPer,
    totalRecoveredPer,
    newConfirmed,
    newDeaths,
    newRecovered,
    newConfirmedPer,
    newDeathsPer,
    newRecoveredPer
) {
    const tableView = `
    <div class="table">
      <div class="table__header">${currentSelect}</div>
      <div class="switchers">
        <div class="switchers__item">
          <div class="switchers__part">
            <input type="radio" id="global" name="cases" value="global" checked/>
            <label for="global">All cases</label>
          </div>
          <div class="switchers__part">
            <input type="radio" id="globalperpeople" name="cases" value="globalperpeople" />
            <label for="globalperpeople">All cases per 100 000</label>
          </div>
        </div>
        <div class="switchers__item">
          <div class="switchers__part">
            <input type="radio" id="lastday" name="cases" value="lastday"/>
            <label for="lastday">Last day cases</label>
          </div>
          <div class="switchers__part">
            <input type="radio" id="lastdayperpeople" name="cases" value="lastdayperpeople" />
            <label for="lastdayperpeople">Last day per 100 000</label>
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
      <div class="table__body" data-type="globalperpeople">
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Confirmed
          </div>
          <div class="table__part_body">
            ${totalConfirmedPer}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Deaths
          </div>
          <div class="table__part_body">
            ${totalDeathsPer}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Recovered
          </div>
          <div class="table__part_body">
            ${totalRecoveredPer}
          </div>
        </div>
      </div>
    </div>
    <div class="table__body" data-type="lastday">
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Confirmed
          </div>
          <div class="table__part_body">
            ${newConfirmed}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Deaths
          </div>
          <div class="table__part_body">
            ${newDeaths}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Recovered
          </div>
          <div class="table__part_body">
            ${newRecovered}
          </div>
        </div>
      </div>
    </div>
    <div class="table__body" data-type="lastdayperpeople">
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Confirmed
          </div>
          <div class="table__part_body">
            ${newConfirmedPer}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Deaths
          </div>
          <div class="table__part_body">
            ${newDeathsPer}
          </div>
        </div>
      </div>
      <div class="table__item">
        <div class="table__part">
          <div class="table__part_header">
            Recovered
          </div>
          <div class="table__part_body">
            ${newRecoveredPer}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

    return tableView;
}

export { getViewTable };
