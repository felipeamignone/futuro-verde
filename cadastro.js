// TABLE CONTROL
function generateRows() {
  let tableBody = document.querySelector("#volunteers-table .table-body");
  const volunteers = getVolunteers();

  // add empty state to table if no items in storage.
  if (volunteers.length === 0) {
    const emptyState = `
    <tr class="empty-row">
        <td colspan="5">
            <h2>Adicione voluntários para visualizar aqui.</h2>
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
        <td>${voluntary.email}</td>
        <td>${voluntary.phone}</td>
        <td>${voluntary.address}</td>
        <td class="birthday-cell">
          <div>
            ${voluntary.birthday}
            <div class="options">
              <span class="material-symbols-outlined">more_vert</span>
              <ul class="options-menu">
                <li onclick="onOpenEditVoluntary(${voluntary.id})">
                  <span class="material-symbols-outlined  icon-menu">edit</span>
                  Editar
                </li>
                <li onclick="onOpenModal(${voluntary.id})">
                  <span class="material-symbols-outlined  icon-menu">
                    delete
                  </span>
                  Excluir
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;
}

generateRows();

// DRAWER FORM CONTROL

function onOpenDrawer() {
  const drawer = document.querySelector("#drawer-form");
  drawer && (drawer.style.display = "block");
}

function onCloseDrawer() {
  const drawerForm = document.querySelector("#drawer-form");
  const inputName = document.querySelector(".input-name");
  const inputEmail = document.querySelector(".input-email");
  const inputPhone = document.querySelector(".input-phone");
  const inputAddress = document.querySelector(".input-address");
  const inputBirthday = document.querySelector(".input-birthday");

  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
  inputAddress.value = "";
  inputBirthday.value = "";

  drawerForm && (drawerForm.style.display = "none");
}

function onOpenAddVoluntary() {
  const modalTitle = document.querySelector(".modal-title");
  const form = document.querySelector("#voluntary-form");

  modalTitle.innerHTML = "Adicionar Voluntário";
  form.onsubmit = function (event) {
    addVoluntary(event);
  };

  onOpenDrawer();
}

function onOpenEditVoluntary(voluntaryId) {
  const volunteers = getVolunteers();
  const modalTitle = document.querySelector(".modal-title");
  const inputName = document.querySelector(".input-name");
  const inputEmail = document.querySelector(".input-email");
  const inputPhone = document.querySelector(".input-phone");
  const inputAddress = document.querySelector(".input-address");
  const inputBirthday = document.querySelector(".input-birthday");
  const form = document.querySelector("#voluntary-form");

  modalTitle.innerHTML = "Editar Voluntário";

  form.onsubmit = function (event) {
    editVoluntary(voluntaryId, event);
  };

  const selectedVoluntary = volunteers.find((voluntary) => voluntary.id == voluntaryId);

  inputName.value = selectedVoluntary.name;
  inputEmail.value = selectedVoluntary.email;
  inputPhone.value = selectedVoluntary.phone;
  inputAddress.value = selectedVoluntary.address;
  inputBirthday.value = selectedVoluntary.birthday;

  onOpenDrawer();
}

window.onclick = function (event) {
  const modalForm = document.querySelector("#drawer-form");
  if (event.target == modalForm) {
    onCloseDrawer();
  }
};

// VOLUNTEERS CONTROL
function getVolunteers() {
  return JSON.parse(localStorage.getItem("volunteers")) || [];
}

function setVolunteers(newFilmList) {
  localStorage.setItem("volunteers", JSON.stringify(newFilmList));
}

function addVoluntary(event) {
  event.preventDefault();
  let volunteers = getVolunteers();

  const name = event.target.elements.name.value;
  const email = event.target.elements.email.value;
  const phone = event.target.elements.phone.value;
  const address = event.target.elements.address.value;
  const birthday = event.target.elements.birthday.value;

  // GENERATE A RANDOM ID WITH 4 DIGITS VERIFYING IF EXISTS
  let randomId = (Math.random() * 10000).toFixed(0);
  function generateNewId(initialValue) {
    let finalId = initialValue;
    if (verifyIfExistIdOnCart(initialValue)) {
      initialValue += 1;
      return generateNewId(initialValue);
    }
    return finalId;
  }

  const newVoluntaryId = generateNewId(randomId);

  const newVoluntary = {
    id: newVoluntaryId,
    name,
    email,
    phone,
    address,
    birthday,
  };

  volunteers.push(newVoluntary);
  setVolunteers(volunteers);

  generateRows();
  onCloseDrawer();
}

function editVoluntary(voluntaryId, event) {
  event.preventDefault();
  console.log("entrou edit");
  let volunteers = getVolunteers();

  const name = event.target.elements.name.value;
  const email = event.target.elements.email.value;
  const phone = event.target.elements.phone.value;
  const address = event.target.elements.address.value;
  const birthday = event.target.elements.birthday.value;

  const newVoluntary = {
    id: voluntaryId,
    name,
    email,
    phone,
    address,
    birthday,
  };

  const voluntaryIndex = volunteers.findIndex((voluntary) => voluntary.id == voluntaryId);
  volunteers.splice(voluntaryIndex, 1, newVoluntary);

  localStorage.setItem("volunteers", JSON.stringify(volunteers));

  onCloseDrawer();
  generateRows();
}

function rmvVoluntary(voluntaryId) {
  let volunteers = getVolunteers();

  const voluntaryIndex = volunteers.findIndex((voluntary) => voluntary.id == voluntaryId);
  volunteers.splice(voluntaryIndex, 1);
  localStorage.setItem("volunteers", JSON.stringify(volunteers));

  generateRows();
}

// MODAL-CONFIRMARION
function onOpenModal(voluntaryId) {
  const modal = document.querySelector("#modal-confirmation");
  const form = document.querySelector("#delete-modal-form");

  form.onsubmit = function () {
    rmvVoluntary(voluntaryId);
  };

  modal && (modal.style.display = "block");
}

function onCloseModal() {
  const modal = document.querySelector("#modal-confirmation");
  
  modal && (modal.style.display = "none");
}

// UTILS
function verifyIfExistIdOnCart(voluntaryId) {
  const volunteers = getVolunteers();
  return volunteers.some((voluntary) => voluntary.id === voluntaryId);
}
