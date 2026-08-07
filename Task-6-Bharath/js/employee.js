// in-memory employee list - no database, no API for HR's data, but it is mirrored
// into localStorage under this key, so other pages in this project (the HR
// Dashboard and Employee Profile) can read real employee records instead of
// keeping a separate, disconnected dataset of their own
const EMPLOYEES_STORAGE_KEY = "atlasHR_employees";

// loads whatever's already saved (e.g. from a previous visit), or falls back
// to this starter list the very first time - the same 10 people used across
// the rest of the project (Attendance, Employee Directory), so every page
// stays consistent instead of looking empty on first load
const defaultEmployees = [
  { id: "101", name: "Ananya Sharma", department: "HR", designation: "HR Manager", email: "ananya.sharma@atlashr.com" },
  { id: "102", name: "Rahul Mehta", department: "Development", designation: "Frontend Developer", email: "rahul.mehta@atlashr.com" },
  { id: "103", name: "Priya Nair", department: "Finance", designation: "Accountant", email: "priya.nair@atlashr.com" },
  { id: "104", name: "Vikram Singh", department: "CRM", designation: "Sales Executive", email: "vikram.singh@atlashr.com" },
  { id: "105", name: "Neha Kapoor", department: "HR", designation: "Recruiter", email: "neha.kapoor@atlashr.com" },
  { id: "106", name: "Arjun Reddy", department: "Development", designation: "Backend Developer", email: "arjun.reddy@atlashr.com" },
  { id: "107", name: "Sanya Iyer", department: "Finance", designation: "Finance Analyst", email: "sanya.iyer@atlashr.com" },
  { id: "108", name: "Karthik Rao", department: "CRM", designation: "Account Manager", email: "karthik.rao@atlashr.com" },
  { id: "109", name: "Divya Menon", department: "HR", designation: "HR Executive", email: "divya.menon@atlashr.com" },
  { id: "110", name: "Rohan Gupta", department: "Development", designation: "QA Engineer", email: "rohan.gupta@atlashr.com" }
];

let employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY)) || defaultEmployees;

// saves the current array back to localStorage after every add, update or delete
function saveEmployees() {
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
}

// tracks which row is currently being edited. null means the form is in
// "add a new employee" mode; a number means "update the employee at this index" instead
let editingIndex = null;

// every employee gets the same company email domain, so the form only asks
// for the part before the @ and this gets appended automatically
const COMPANY_DOMAIN = "@atlashr.com";

// designation options grouped by department - keeps the dropdown relevant
// to whichever department is currently selected instead of one long generic list
const departmentDesignations = {
  HR: ["HR Manager", "HR Executive", "Recruiter", "Talent Acquisition Lead", "HR Generalist"],
  CRM: ["Sales Executive", "Account Manager", "CRM Lead", "Customer Success Executive", "Business Development Executive"],
  Finance: ["Accountant", "Finance Analyst", "Finance Manager", "Payroll Specialist", "Auditor"],
  Development: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "QA Engineer", "DevOps Engineer"]
};

// grab the form and its individual fields once, reused throughout this file
const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");
const totalCount = document.getElementById("totalCount");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const empId = document.getElementById("empId");
const empIdError = document.getElementById("empIdError");
const empName = document.getElementById("empName");
const empNameError = document.getElementById("empNameError");
const empDepartment = document.getElementById("empDepartment");
const empDesignation = document.getElementById("empDesignation");
const empEmailUser = document.getElementById("empEmailUser");
const empEmailError = document.getElementById("empEmailError");

// checks that the Employee ID field holds only digits - a whole positive number,
// nothing else (no letters, decimals, minus signs, or blank values)
function isValidEmployeeId(value) {
  return /^\d+$/.test(value);
}

// checks that the name only contains letters and spaces (e.g. "Ananya Sharma")
function isValidName(value) {
  return /^[A-Za-z ]+$/.test(value);
}

// checks the email username part - letters and numbers, with single dots/underscores/hyphens
// allowed only between them (so "bharath.hari" is fine, but ".bharath", "bharath.", and
// "bharath..hari" are not). the "@" symbol isn't allowed here since a company domain gets
// appended after it
function isValidEmailUser(value) {
  return /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*$/.test(value);
}

// checks whether this Employee ID is already used by someone else in the list.
// when editing an existing row, that row's own ID doesn't count as a duplicate of itself
function isDuplicateId(value) {
  return employees.some(function (emp, index) {
    return emp.id === value && index !== editingIndex;
  });
}

// checks whether this full email is already used by someone else in the list.
// same edit-mode exception as the ID check above
function isDuplicateEmail(fullEmail) {
  return employees.some(function (emp, index) {
    return emp.email.toLowerCase() === fullEmail.toLowerCase() && index !== editingIndex;
  });
}

// rebuilds the designation dropdown to match whichever department was just picked
function populateDesignations(department) {
  empDesignation.innerHTML = '<option value="" disabled selected>Select designation</option>';

  const options = departmentDesignations[department] || [];
  options.forEach(function (title) {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    empDesignation.appendChild(option);
  });
}

// whenever the department changes, refresh the designation list to match it
empDepartment.addEventListener("change", function () {
  populateDesignations(empDepartment.value);
});

// Read operation - takes the current employees array and rebuilds the table rows from it,
// including the Edit/Delete buttons and the total employees count.
// called on page load, and again after every add, update or delete.
function renderTable() {
  employeeTableBody.innerHTML = "";
  totalCount.textContent = employees.length;

  if (employees.length === 0) {
    employeeTableBody.innerHTML =
      '<tr class="empty-row"><td colspan="6">No employees added yet.</td></tr>';
    return;
  }

  employees.forEach(function (emp, index) {
    const row = document.createElement("tr");

    // data-index links each button back to this employee's position in the array
    row.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.department + "</td>" +
      "<td>" + emp.designation + "</td>" +
      "<td>" + emp.email + "</td>" +
      '<td class="actions-cell">' +
        '<button type="button" class="btn-edit" data-index="' + index + '">Edit</button>' +
        '<button type="button" class="btn-delete" data-index="' + index + '">Delete</button>' +
      '</td>';

    employeeTableBody.appendChild(row);
  });
}

// puts the form back into "add a new employee" mode - clears every field
// and restores the button label, used after a successful add/update and after delete
function resetFormToAddMode() {
  editingIndex = null;
  formSubmitBtn.textContent = "Add Employee";
  employeeForm.reset();
  populateDesignations(""); // designation dropdown goes back to its placeholder state
  empIdError.hidden = true;
  empId.classList.remove("invalid");
  empNameError.hidden = true;
  empName.classList.remove("invalid");
  empEmailError.hidden = true;
  empEmailUser.classList.remove("invalid");
}

// Edit - copies the selected employee's data into the form fields so it can be changed,
// and switches the form into "update" mode instead of "add" mode
function startEdit(index) {
  const emp = employees[index];

  empId.value = emp.id;
  empName.value = emp.name;
  empDepartment.value = emp.department;
  populateDesignations(emp.department);
  empDesignation.value = emp.designation;
  empEmailUser.value = emp.email.replace(COMPANY_DOMAIN, "");

  editingIndex = index;
  formSubmitBtn.textContent = "Update Employee";

  employeeForm.scrollIntoView({ behavior: "smooth" });
}

// Delete operation - asks for confirmation first, then removes the employee
// from the array and re-renders the table (and the total count along with it)
function deleteEmployee(index) {
  const confirmed = confirm("Are you sure?");
  if (!confirmed) {
    return;
  }

  employees.splice(index, 1);
  saveEmployees();

  // if the row currently being edited was the one removed, cancel edit mode
  // rather than leaving the form pointed at a row that no longer exists
  if (editingIndex !== null) {
    resetFormToAddMode();
  }

  renderTable();
}

// one click listener on the table body handles every Edit/Delete button,
// since rows are re-created each time renderTable() runs
employeeTableBody.addEventListener("click", function (event) {
  const index = event.target.getAttribute("data-index");
  if (index === null) {
    return;
  }

  if (event.target.classList.contains("btn-edit")) {
    startEdit(Number(index));
  }

  if (event.target.classList.contains("btn-delete")) {
    deleteEmployee(Number(index));
  }
});

// Create / Update operation - reads the form fields into one employee object.
// if editingIndex is set this replaces that row instead of adding a new one.
function handleFormSubmit(event) {
  event.preventDefault(); // stop the form from actually submitting/reloading the page

  const idValue = empId.value.trim();
  const nameValue = empName.value.trim();
  const emailUserValue = empEmailUser.value.trim();

  // stop right here if the Employee ID isn't a plain whole number
  if (!isValidEmployeeId(idValue)) {
    empIdError.hidden = false;
    empIdError.textContent = "Employee ID must be a number.";
    empId.classList.add("invalid");
    empId.focus();
    return;
  }

  // stop if that ID belongs to a different employee already in the list
  if (isDuplicateId(idValue)) {
    empIdError.hidden = false;
    empIdError.textContent = "That Employee ID is already taken.";
    empId.classList.add("invalid");
    empId.focus();
    return;
  }
  empIdError.hidden = true;
  empId.classList.remove("invalid");

  // stop if the name contains anything other than letters and spaces
  if (!isValidName(nameValue)) {
    empNameError.hidden = false;
    empName.classList.add("invalid");
    empName.focus();
    return;
  }
  empNameError.hidden = true;
  empName.classList.remove("invalid");

  // stop if the email username has an "@" or other invalid character in it
  if (!isValidEmailUser(emailUserValue)) {
    empEmailError.hidden = false;
    empEmailError.textContent = "Enter a valid username - letters, numbers, dots, hyphens only (no @).";
    empEmailUser.classList.add("invalid");
    empEmailUser.focus();
    return;
  }

  const fullEmail = emailUserValue + COMPANY_DOMAIN; // same domain appended for every employee

  // stop if that email belongs to a different employee already in the list
  if (isDuplicateEmail(fullEmail)) {
    empEmailError.hidden = false;
    empEmailError.textContent = "That email is already in use.";
    empEmailUser.classList.add("invalid");
    empEmailUser.focus();
    return;
  }
  empEmailError.hidden = true;
  empEmailUser.classList.remove("invalid");

  const employeeData = {
    id: idValue,
    name: nameValue,
    department: empDepartment.value,
    designation: empDesignation.value,
    email: fullEmail
  };

  if (editingIndex === null) {
    employees.push(employeeData); // Create
  } else {
    employees[editingIndex] = employeeData; // Update
  }

  saveEmployees();
  renderTable();
  resetFormToAddMode();
}

employeeForm.addEventListener("submit", handleFormSubmit);

// hide the error again as soon as the person starts fixing the Employee ID
empId.addEventListener("input", function () {
  empIdError.hidden = true;
  empId.classList.remove("invalid");
});

// Employee Name - strip out anything that isn't a letter or space as the person types,
// so numbers/symbols never even make it into the field
empName.addEventListener("input", function () {
  const cleaned = empName.value.replace(/[^A-Za-z ]/g, "");
  if (cleaned !== empName.value) {
    empName.value = cleaned;
  }
  empNameError.hidden = true;
  empName.classList.remove("invalid");
});

// Email username - strip out "@" (and spaces) as the person types, so it's impossible
// to end up with something like "name@gmail@atlashr.com"
empEmailUser.addEventListener("input", function () {
  const cleaned = empEmailUser.value.replace(/[@\s]/g, "");
  if (cleaned !== empEmailUser.value) {
    empEmailUser.value = cleaned;
  }
  empEmailError.hidden = true;
  empEmailUser.classList.remove("invalid");
});

// render once on page load so the "no employees yet" message and the total count show immediately
renderTable();