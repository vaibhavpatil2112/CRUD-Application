document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("crudform");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const tableBody = document.querySelector("#crudtable tbody");
  let data = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    if (name && email) {
      data.push({ name, email });
      renderTable();
      form.reset();
    }
  });

  function renderTable() {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
      tableBody.appendChild(row);
    });

    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", handleEdit);
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  }

  function handleEdit(e) {
    const index = e.target.getAttribute("data-index");
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    form.removeEventListener("submit", addData);
    form.addEventListener("submit", (e) => updateData(e, index));
  }

  function handleDelete(e) {
    const index = e.target.getAttribute("data-index");
    data.splice(index);
    renderTable();
  }

  function updateData(e, index) {
    e.preventDefault();
    data[index] = {
      name: nameInput.value,
      email: emailInput.value,
    };
    renderTable();
    form.reset();
    form.removeEventListener("submit", updateData);
    form.addEventListener("submit", addData);
  }

  function addData(e) {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    if (name && email) {
      data.push({ name, email });
      renderTable();
      form.reset();
    }
  }
});
