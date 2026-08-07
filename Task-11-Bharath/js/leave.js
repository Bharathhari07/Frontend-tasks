// in-memory list of leave requests submitted this session - no database, no API.
// also mirrored into localStorage under this key, so the Leave Approval page
// (a separate HTML file) can read the same requests without a backend
const LEAVE_STORAGE_KEY = "atlasHR_leaveRequests";

// loads whatever's already saved in localStorage (e.g. from a previous visit),
// or starts with an empty array if nothing's there yet
let leaveRequests = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY)) || [];

// saves the current array back to localStorage after every change
function saveLeaveRequests() {
  localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaveRequests));
}

// grab the form and its individual fields once, reused throughout this file
const leaveForm = document.getElementById("leaveForm");
const empId = document.getElementById("empId");
const empIdError = document.getElementById("empIdError");
const empName = document.getElementById("empName");
const empNameError = document.getElementById("empNameError");
const department = document.getElementById("department");
const leaveType = document.getElementById("leaveType");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const dateError = document.getElementById("dateError");
const totalDays = document.getElementById("totalDays");
const reason = document.getElementById("reason");
const formSuccess = document.getElementById("formSuccess");
const requestsTableBody = document.getElementById("requestsTableBody");

// checks that the Employee ID field holds only digits
function isValidEmployeeId(value) {
  return /^\d+$/.test(value);
}

// checks that the name only contains letters and spaces
function isValidName(value) {
  return /^[A-Za-z ]+$/.test(value);
}

// works out how many days a leave request covers (inclusive of both the
// start and end date), and fills in the read-only Total Leave Days field
function calculateTotalDays() {
  if (!fromDate.value || !toDate.value) {
    totalDays.value = "";
    return;
  }

  const start = new Date(fromDate.value);
  const end = new Date(toDate.value);
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.round((end - start) / msPerDay) + 1;

  if (days < 1) {
    totalDays.value = "";
    return;
  }

  totalDays.value = days + (days === 1 ? " day" : " days");
}

// stops the To Date picker from ever offering a date earlier than From Date,
// and recalculates the day count whenever either date changes
fromDate.addEventListener("change", function () {
  toDate.min = fromDate.value;

  // if a To Date was already picked and it's now before the new From Date, clear it
  if (toDate.value && toDate.value < fromDate.value) {
    toDate.value = "";
  }

  dateError.hidden = true;
  toDate.classList.remove("invalid");
  calculateTotalDays();
});

toDate.addEventListener("change", function () {
  dateError.hidden = true;
  toDate.classList.remove("invalid");
  calculateTotalDays();
});

// Employee Name - strip out anything that isn't a letter or space as the person types
empName.addEventListener("input", function () {
  const cleaned = empName.value.replace(/[^A-Za-z ]/g, "");
  if (cleaned !== empName.value) {
    empName.value = cleaned;
  }
  empNameError.hidden = true;
  empName.classList.remove("invalid");
});

empId.addEventListener("input", function () {
  empIdError.hidden = true;
  empId.classList.remove("invalid");
});

// Read operation - rebuilds the "My Submitted Requests" table from the array
function renderRequests() {
  requestsTableBody.innerHTML = "";

  if (leaveRequests.length === 0) {
    requestsTableBody.innerHTML =
      '<tr class="empty-row"><td colspan="8">No leave requests submitted yet.</td></tr>';
    return;
  }

  leaveRequests.forEach(function (req) {
    const row = document.createElement("tr");

    row.innerHTML =
      "<td>" + req.id + "</td>" +
      "<td>" + req.name + "</td>" +
      "<td>" + req.department + "</td>" +
      "<td>" + req.leaveType + "</td>" +
      "<td>" + req.fromDate + "</td>" +
      "<td>" + req.toDate + "</td>" +
      "<td>" + req.totalDays + "</td>" +
      "<td>" + req.reason + "</td>";

    requestsTableBody.appendChild(row);
  });
}

// Create operation - validates every field, then adds the new request to the array
leaveForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formSuccess.hidden = true;

  const idValue = empId.value.trim();
  const nameValue = empName.value.trim();

  if (!isValidEmployeeId(idValue)) {
    empIdError.hidden = false;
    empId.classList.add("invalid");
    empId.focus();
    return;
  }

  if (!isValidName(nameValue)) {
    empNameError.hidden = false;
    empName.classList.add("invalid");
    empName.focus();
    return;
  }

  if (!department.value || !leaveType.value || !fromDate.value || !toDate.value || !reason.value.trim()) {
    alert("Please fill in every field before applying for leave.");
    return;
  }

  // double check on submit too, not just at date-pick time
  if (toDate.value < fromDate.value) {
    dateError.hidden = false;
    toDate.classList.add("invalid");
    toDate.focus();
    return;
  }

  const start = new Date(fromDate.value);
  const end = new Date(toDate.value);
  const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

  leaveRequests.push({
    id: idValue,
    name: nameValue,
    department: department.value,
    leaveType: leaveType.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
    totalDays: days,
    reason: reason.value.trim(),
    status: "Pending"
  });

  saveLeaveRequests();
  renderRequests();
  formSuccess.hidden = false;

  leaveForm.reset();
  totalDays.value = "";
  toDate.min = "";
});

// render once on page load so the empty state shows immediately
renderRequests();