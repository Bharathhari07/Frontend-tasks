// in-memory employee list - no database, no API. this array is the entire
// "storage" for this page - data only lives here for as long as the page stays open.
let employees = [];

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

// checks whether this Employee ID is already used by someone already in the list
function isDuplicateId(value) {
  return employees.some(function (emp) {
    return emp.id === value;
  });
}

// checks whether this full email is already used by someone already in the list
function isDuplicateEmail(fullEmail) {
  return employees.some(function (emp) {
    return emp.email.toLowerCase() === fullEmail.toLowerCase();
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

// Read operation - takes the current employees array and rebuilds the table rows from it.
// called once on page load (empty table) and again every time an employee is added.
function renderTable() {
  employeeTableBody.innerHTML = "";

  if (employees.length === 0) {
    employeeTableBody.innerHTML =
      '<tr class="empty-row"><td colspan="5">No employees added yet.</td></tr>';
    return;
  }

  employees.forEach(function (emp) {
    const row = document.createElement("tr");

    row.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.department + "</td>" +
      "<td>" + emp.designation + "</td>" +
      "<td>" + emp.email + "</td>";

    employeeTableBody.appendChild(row);
  });
}

// Create operation - reads the form fields, builds one employee object,
// pushes it into the array, then re-renders the table to show it.
function addEmployee(event) {
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

  // stop if that ID is already used by someone already in the list
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

  // stop if that email belongs to someone already in the list
  if (isDuplicateEmail(fullEmail)) {
    empEmailError.hidden = false;
    empEmailError.textContent = "That email is already in use.";
    empEmailUser.classList.add("invalid");
    empEmailUser.focus();
    return;
  }
  empEmailError.hidden = true;
  empEmailUser.classList.remove("invalid");

  const newEmployee = {
    id: idValue,
    name: nameValue,
    department: empDepartment.value,
    designation: empDesignation.value,
    email: fullEmail
  };

  employees.push(newEmployee);

  renderTable();
  employeeForm.reset(); // clear the form so it's ready for the next entry
  populateDesignations(""); // designation dropdown goes back to its placeholder state too
  empNameError.hidden = true;
  empName.classList.remove("invalid");
  empEmailError.hidden = true;
  empEmailUser.classList.remove("invalid");
}

employeeForm.addEventListener("submit", addEmployee);

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

// render once on page load so the "no employees yet" message shows immediately
renderTable();