// mirrored into localStorage under this key, so other pages in this project
// (the HR Dashboard and Employee Profile) can read real attendance records
// instead of keeping a separate, disconnected dataset of their own
const ATTENDANCE_STORAGE_KEY = "atlasHR_attendance";

// the default sample list, used only the first time this page is ever opened
// (before anything has been saved to localStorage yet)
const defaultEmployees = [
  { id: 101, name: "Ananya Sharma", department: "HR", attendanceStatus: "Present", markedAt: "2026-08-06T09:00:00.000Z" },
  { id: 102, name: "Rahul Mehta", department: "Development", attendanceStatus: "Present", markedAt: "2026-08-06T09:05:00.000Z" },
  { id: 103, name: "Priya Nair", department: "Finance", attendanceStatus: null, markedAt: null },
  { id: 104, name: "Vikram Singh", department: "CRM", attendanceStatus: null, markedAt: null },
  { id: 105, name: "Neha Kapoor", department: "HR", attendanceStatus: "Half Day", markedAt: "2026-08-06T09:10:00.000Z" },
  { id: 106, name: "Arjun Reddy", department: "Development", attendanceStatus: null, markedAt: null },
  { id: 107, name: "Sanya Iyer", department: "Finance", attendanceStatus: "Absent", markedAt: "2026-08-06T09:15:00.000Z" },
  { id: 108, name: "Karthik Rao", department: "CRM", attendanceStatus: null, markedAt: null },
  { id: 109, name: "Divya Menon", department: "HR", attendanceStatus: null, markedAt: null },
  { id: 110, name: "Rohan Gupta", department: "Development", attendanceStatus: "WFH", markedAt: "2026-08-06T09:20:00.000Z" }
];

// loads whatever's already saved (e.g. from a previous visit), or falls back
// to the default sample list the very first time
let employees = JSON.parse(localStorage.getItem(ATTENDANCE_STORAGE_KEY)) || defaultEmployees;

// saves the current array back to localStorage after every mark/update/reset
function saveEmployees() {
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(employees));
}

// the four attendance options, each with its own badge colour
const statusColors = {
  "Present": { color: "#10b981", bg: "#eafbf3" },
  "Absent": { color: "#d92d20", bg: "#fdeceb" },
  "Half Day": { color: "#f59e0b", bg: "#fff8ea" },
  "WFH": { color: "#6366f1", bg: "#eef1ff" }
};

const attendanceTableBody = document.getElementById("attendanceTableBody");
const currentDateEl = document.getElementById("currentDate");
const totalCountEl = document.getElementById("totalCount");
const presentCountEl = document.getElementById("presentCount");
const absentCountEl = document.getElementById("absentCount");
const halfDayCountEl = document.getElementById("halfDayCount");
const wfhCountEl = document.getElementById("wfhCount");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const statusFilter = document.getElementById("statusFilter");

// shows today's date in the topbar, e.g. "Thursday, 6 August 2026"
function displayCurrentDate() {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  currentDateEl.textContent = today.toLocaleDateString(undefined, options);
}

// builds the four status <option> elements, plus a placeholder,
// and pre-selects whichever one matches the employee's current status (if any)
function buildStatusOptions(currentStatus) {
  let optionsHtml = '<option value="" disabled' + (currentStatus ? '' : ' selected') + '>Select status</option>';

  Object.keys(statusColors).forEach(function (status) {
    const isSelected = status === currentStatus ? " selected" : "";
    optionsHtml += '<option value="' + status + '"' + isSelected + '>' + status + '</option>';
  });

  return optionsHtml;
}

// recalculates the five summary cards from the FULL employee list -
// these always reflect everyone, regardless of whatever search/filter
// is currently narrowing down the table below
function renderSummary() {
  totalCountEl.textContent = employees.length;
  presentCountEl.textContent = employees.filter(function (emp) { return emp.attendanceStatus === "Present"; }).length;
  absentCountEl.textContent = employees.filter(function (emp) { return emp.attendanceStatus === "Absent"; }).length;
  halfDayCountEl.textContent = employees.filter(function (emp) { return emp.attendanceStatus === "Half Day"; }).length;
  wfhCountEl.textContent = employees.filter(function (emp) { return emp.attendanceStatus === "WFH"; }).length;
}

// Read operation - rebuilds the table from whichever list is passed in
// (the full list, or a filtered subset from applyFilters())
function renderTable(list) {
  attendanceTableBody.innerHTML = "";

  list.forEach(function (emp) {
    const row = document.createElement("tr");

    // status cell - a "Not Marked" grey badge if nothing set yet, otherwise a coloured one
    let statusCell;
    if (emp.attendanceStatus) {
      const badge = statusColors[emp.attendanceStatus];
      statusCell = '<span class="status-badge" style="background:' + badge.bg + '; color:' + badge.color + '">' + emp.attendanceStatus + '</span>';
    } else {
      statusCell = '<span class="status-badge" style="background:#f1f3f6; color:#9aa3af">Not Marked</span>';
    }

    // action cell - every control is tagged with data-id (the employee's actual ID,
    // not its position in a possibly-filtered list) so mark/update/reset always
    // updates the correct person even while a search or filter is active
    const markButtonLabel = emp.attendanceStatus ? "Update Attendance" : "Mark Attendance";
    const resetButtonHtml = emp.attendanceStatus
      ? '<button type="button" class="btn-reset" data-id="' + emp.id + '">Reset</button>'
      : "";

    const actionCell =
      '<select class="status-select" data-id="' + emp.id + '">' + buildStatusOptions(emp.attendanceStatus) + '</select>' +
      '<button type="button" class="btn-mark" data-id="' + emp.id + '">' + markButtonLabel + '</button>' +
      resetButtonHtml;

    row.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.department + "</td>" +
      "<td>" + statusCell + "</td>" +
      '<td class="action-cell">' + actionCell + "</td>";

    attendanceTableBody.appendChild(row);
  });
}

// combines the search box, department filter and status filter, then re-renders
// the table with whatever matches - the summary cards are untouched by this
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDept = departmentFilter.value;
  const selectedStatus = statusFilter.value;

  const filtered = employees.filter(function (emp) {
    const matchesSearch =
      emp.name.toLowerCase().includes(query) ||
      emp.id.toString().includes(query);

    const matchesDept = selectedDept === "all" || emp.department === selectedDept;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "not-marked" ? !emp.attendanceStatus : emp.attendanceStatus === selectedStatus);

    return matchesSearch && matchesDept && matchesStatus;
  });

  renderTable(filtered);
}

// Mark / Update - reads whichever status is selected for that employee and saves it.
// since the button relabels itself to "Update Attendance" the moment a status is set,
// there's no path that would let the same employee get marked twice for the day
function markOrUpdateAttendance(employeeId) {
  const select = document.querySelector('.status-select[data-id="' + employeeId + '"]');
  const chosenStatus = select.value;

  if (!chosenStatus) {
    alert("Please select a status before marking attendance.");
    return;
  }

  const employee = employees.find(function (emp) { return emp.id === employeeId; });
  employee.attendanceStatus = chosenStatus;
  employee.markedAt = new Date().toISOString(); // records exactly when this mark happened

  saveEmployees();
  renderSummary();
  applyFilters();
}

// Reset - clears this employee's attendance status back to "not marked"
function resetAttendance(employeeId) {
  const employee = employees.find(function (emp) { return emp.id === employeeId; });
  employee.attendanceStatus = null;
  employee.markedAt = null;

  saveEmployees();
  renderSummary();
  applyFilters();
}

// one click listener on the table body handles every Mark/Update/Reset button,
// since rows are re-created every time the table renders
attendanceTableBody.addEventListener("click", function (event) {
  const employeeId = event.target.getAttribute("data-id");
  if (employeeId === null) {
    return;
  }

  if (event.target.classList.contains("btn-mark")) {
    markOrUpdateAttendance(Number(employeeId));
  }

  if (event.target.classList.contains("btn-reset")) {
    resetAttendance(Number(employeeId));
  }
});

// re-run the filter every time the search box or either dropdown changes
searchInput.addEventListener("input", applyFilters);
departmentFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

// set up the page on load: today's date, the summary counts, and the full table
displayCurrentDate();
renderSummary();
renderTable(employees);