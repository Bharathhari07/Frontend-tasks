// local employee data - array of objects, no backend/API involved.
// attendanceStatus starts as null for everyone ("not marked yet" for today)
const employees = [
  { id: 101, name: "Ananya Sharma", department: "HR", attendanceStatus: null },
  { id: 102, name: "Rahul Mehta", department: "Development", attendanceStatus: null },
  { id: 103, name: "Priya Nair", department: "Finance", attendanceStatus: null },
  { id: 104, name: "Vikram Singh", department: "CRM", attendanceStatus: null },
  { id: 105, name: "Neha Kapoor", department: "HR", attendanceStatus: null },
  { id: 106, name: "Arjun Reddy", department: "Development", attendanceStatus: null },
  { id: 107, name: "Sanya Iyer", department: "Finance", attendanceStatus: null },
  { id: 108, name: "Karthik Rao", department: "CRM", attendanceStatus: null },
  { id: 109, name: "Divya Menon", department: "HR", attendanceStatus: null },
  { id: 110, name: "Rohan Gupta", department: "Development", attendanceStatus: null }
];

// the four attendance options, each with its own badge colour
const statusColors = {
  "Present": { color: "#10b981", bg: "#eafbf3" },
  "Absent": { color: "#d92d20", bg: "#fdeceb" },
  "Half Day": { color: "#f59e0b", bg: "#fff8ea" },
  "WFH": { color: "#6366f1", bg: "#eef1ff" }
};

const attendanceTableBody = document.getElementById("attendanceTableBody");

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

// Read operation - rebuilds every row from the current state of the employees array.
// called on page load and again after every mark/update/reset
function renderTable() {
  attendanceTableBody.innerHTML = "";

  employees.forEach(function (emp, index) {
    const row = document.createElement("tr");

    // status cell - a "Not Marked" grey badge if nothing set yet, otherwise a coloured one
    let statusCell;
    if (emp.attendanceStatus) {
      const badge = statusColors[emp.attendanceStatus];
      statusCell = '<span class="status-badge" style="background:' + badge.bg + '; color:' + badge.color + '">' + emp.attendanceStatus + '</span>';
    } else {
      statusCell = '<span class="status-badge" style="background:#f1f3f6; color:#9aa3af">Not Marked</span>';
    }

    // action cell - a status dropdown, a Mark/Update button (label depends on
    // whether this employee already has a status set), and a Reset button
    // that only appears once something has actually been marked
    const markButtonLabel = emp.attendanceStatus ? "Update Attendance" : "Mark Attendance";
    const resetButtonHtml = emp.attendanceStatus
      ? '<button type="button" class="btn-reset" data-index="' + index + '">Reset</button>'
      : "";

    const actionCell =
      '<select class="status-select" data-index="' + index + '">' + buildStatusOptions(emp.attendanceStatus) + '</select>' +
      '<button type="button" class="btn-mark" data-index="' + index + '">' + markButtonLabel + '</button>' +
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

// Mark / Update - reads whichever status is selected in that row's dropdown and saves it.
// since the button relabels itself to "Update Attendance" the moment a status is set,
// there's no separate path that would let the same employee get marked twice for the day -
// the button itself always reflects whether this is a first-time mark or a change to an
// existing one
function markOrUpdateAttendance(index) {
  const select = document.querySelector('.status-select[data-index="' + index + '"]');
  const chosenStatus = select.value;

  if (!chosenStatus) {
    alert("Please select a status before marking attendance.");
    return;
  }

  employees[index].attendanceStatus = chosenStatus;
  renderTable();
}

// Reset - clears this employee's attendance status back to "not marked"
function resetAttendance(index) {
  employees[index].attendanceStatus = null;
  renderTable();
}

// one click listener on the table body handles every Mark/Update/Reset button,
// since rows are re-created each time renderTable() runs
attendanceTableBody.addEventListener("click", function (event) {
  const index = event.target.getAttribute("data-index");
  if (index === null) {
    return;
  }

  if (event.target.classList.contains("btn-mark")) {
    markOrUpdateAttendance(Number(index));
  }

  if (event.target.classList.contains("btn-reset")) {
    resetAttendance(Number(index));
  }
});

// render once on page load
renderTable();