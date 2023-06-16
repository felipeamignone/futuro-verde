// TABLE CONTROL
function generateRows() {
  let tableBody = document.querySelector("#volunteers-table .table-body");
  const volunteers = getVolunteers();

  // add empty state to table if no items in storage.
  if (volunteers.length === 0) {
    const emptyState = `
      <tr class="empty-row">
          <td>
              <h2>Nenhum voluntário encontrado.</h2>
          </td>
      </tr>
      `;
    tableBody.innerHTML = emptyState;
    return;
  }

  // generate rows with storage data.
  let rows = "";
  volunteers.forEach((voluntary) => {
    rows += `
      <tr class="table-row" key={${voluntary.id}}>
          <td>${voluntary.name}</td>
        </tr>
      `;
  });

  tableBody.innerHTML = rows;
}

generateRows();

// VOLUNTEERS CONTROL
function getVolunteers() {
  return JSON.parse(localStorage.getItem("volunteers")) || [];
}
