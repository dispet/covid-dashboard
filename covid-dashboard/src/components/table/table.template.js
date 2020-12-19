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

    // const tableView = `
    //     <div class="table">
    //       <div class="table__header">${currentSelect}</div>
    //         <div class="tabs">
    //           <div class="tabs__header">
    //             <div class="tabs__header_item active" data-tab="1">Global</div>
    //             <div class="tabs__header_item" data-tab="2">Last day</div>
    //             <div class="tabs__header_item" data-tab="3">Global / 100 000</div>
    //             <div class="tabs__header_item" data-tab="4">Last day / 100 000</div>
    //           </div>
    //           <div class="tabs__body">
    //               <div class="tabs__item active" data-tab="1">
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Confirmed: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="confirmed">${totalConfirmed}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Deaths: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="deaths">${totalDeaths}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Recovered: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="recovered">${totalRecovered}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div class="tabs__item" data-tab="2">
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Confirmed: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-confirmed">${newConfirmed}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Deaths: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-deaths">${newDeaths}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Recovered: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-recovered">${newRecovered}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div class="tabs__item" data-tab="3">
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Confirmed/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="confirmed">${Math.floor(totalConfirmed / populationDivideHundred)}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Deaths/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="deaths">${Math.floor(totalDeaths / populationDivideHundred)}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Recovered/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="recovered">${Math.floor(totalRecovered / populationDivideHundred)}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div class="tabs__item" data-tab="4">
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Confirmed/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-confirmed">${newConfirmed / populationDivideHundred}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Deaths/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-deaths">${newDeaths / populationDivideHundred}</span>
    //                   </div>
    //                 </div>
    //                 <div class="table__item">
    //                   <div class="table__item_part">
    //                     <span>Recovered/100000: </span>
    //                   </div>
    //                   <div class="table__item_part">
    //                     <span class="new-recovered">${
    //                         newRecovered / populationDivideHundred
    //                     }</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //     </div>
    //     `;

    return tableView;
}

export { getViewTable };
