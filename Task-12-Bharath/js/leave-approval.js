// reads from the SAME localStorage key that Task-11-Bharath (Leave Request)
// writes to - so this table shows the real requests employees have actually
// submitted, not a separate lookalike dataset
const LEAVE_STORAGE_KEY = "atlasHR_leaveRequests";

// used only the very first time this page is opened, before anyone has
// submitted a real request yet - so the table and summary cards aren't empty
const defaultRequests = [
  { id: "101", name: "Ananya Sharma", department: "HR", leaveType: "Casual Leave", fromDate: "2026-08-10", toDate: "2026-08-11", totalDays: 2, reason: "Family function", status: "Pending" },
  { id: "102", name: "Rahul Mehta", department: "Development", leaveType: "Casual Leave", fromDate: "2026-08-03", toDate: "2026-08-05", totalDays: 3, reason: "Not approved due to sprint deadline", status: "Rejected" },
  { id: "103", name: "Priya Nair", department: "Finance", leaveType: "Sick Leave", fromDate: "2026-07-20", toDate: "2026-07-21", totalDays: 2, reason: "Viral fever", status: "Approved" },
  { id: "104", name: "Vikram Singh", department: "CRM", leaveType: "Sick Leave", fromDate: "2026-08-05", toDate: "2026-08-05", totalDays: 1, reason: "Fever", status: "Approved" },
  { id: "105", name: "Neha Kapoor", department: "HR", leaveType: "Earned Leave", fromDate: "2026-07-14", toDate: "2026-07-16", totalDays: 3, reason: "Family trip", status: "Approved" },
  { id: "106", name: "Arjun Reddy", department: "Development", leaveType: "Casual Leave", fromDate: "2026-08-25", toDate: "2026-08-25", totalDays: 1, reason: "Personal work", status: "Pending" },
  { id: "107", name: "Sanya Iyer", department: "Finance", leaveType: "Earned Leave", fromDate: "2026-08-18", toDate: "2026-08-22", totalDays: 5, reason: "Personal travel", status: "Pending" },
  { id: "108", name: "Karthik Rao", department: "CRM", leaveType: "Sick Leave", fromDate: "2026-07-08", toDate: "2026-07-09", totalDays: 2, reason: "Not approved - client meeting clash", status: "Rejected" },
  { id: "109", name: "Divya Menon", department: "HR", leaveType: "Maternity Leave", fromDate: "2026-09-01", toDate: "2026-11-29", totalDays: 90, reason: "Maternity leave", status: "Approved" },
  { id: "110", name: "Rohan Gupta", department: "Development", leaveType: "Casual Leave", fromDate: "2026-07-28", toDate: "2026-07-29", totalDays: 2, reason: "Wedding function", status: "Approved" }
];

// loads whatever's actually been submitted, or falls back to the sample list above
let leaveRequests = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY)) || defaultRequests;

// saves the current array back to localStorage after every Approve/Reject/Cancel
function saveLeaveRequests() {
  localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaveRequests));
}

// badge colour per status
const statusColors = {
  "Pending": { color: "#f59e0b", bg: "#fff8ea" },
  "Approved": { color: "#10b981", bg: "#eafbf3" },
  "Rejected": { color: "#d92d20", bg: "#fdeceb" }
};

const approvalTableBody = document.getElementById("approvalTableBody");
const pendingCountEl = document.getElementById("pendingCount");
const approvedCountEl = document.getElementById("approvedCount");
const rejectedCountEl = document.getElementById("rejectedCount");

// recalculates the three summary cards from the current list
function renderSummary() {
  pendingCountEl.textContent = leaveRequests.filter(function (r) { return r.status === "Pending"; }).length;
  approvedCountEl.textContent = leaveRequests.filter(function (r) { return r.status === "Approved"; }).length;
  rejectedCountEl.textContent = leaveRequests.filter(function (r) { return r.status === "Rejected"; }).length;
}

// Read operation - rebuilds the whole table from the current array.
// each request is tagged with its array index via data-index so the action
// buttons always know exactly which row they belong to
function renderTable() {
  approvalTableBody.innerHTML = "";

  if (leaveRequests.length === 0) {
    approvalTableBody.innerHTML = '<tr class="empty-row"><td colspan="7">No leave requests yet.</td></tr>';
    return;
  }

  leaveRequests.forEach(function (req, index) {
    const row = document.createElement("tr");
    const badge = statusColors[req.status];

    // Approve/Reject only make sense while a request is still Pending -
    // once decided, those two buttons are disabled rather than removed,
    // so the row's action layout doesn't jump around
    const isPending = req.status === "Pending";
    const disabledAttr = isPending ? "" : "disabled";

    row.innerHTML =
      "<td>" + req.id + "</td>" +
      "<td>" + req.name + "</td>" +
      "<td>" + req.department + "</td>" +
      "<td>" + req.leaveType + "</td>" +
      "<td>" + req.totalDays + "</td>" +
      '<td><span class="status-badge" style="background:' + badge.bg + '; color:' + badge.color + '">' + req.status + '</span></td>' +
      '<td class="action-cell">' +
        '<button type="button" class="btn-approve" data-index="' + index + '" ' + disabledAttr + '>Approve</button>' +
        '<button type="button" class="btn-reject" data-index="' + index + '" ' + disabledAttr + '>Reject</button>' +
        '<button type="button" class="btn-cancel" data-index="' + index + '">Cancel</button>' +
      '</td>';

    approvalTableBody.appendChild(row);
  });
}

// one click listener handles every Approve/Reject/Cancel button, since
// rows are re-created each time the table renders
approvalTableBody.addEventListener("click", function (event) {
  const index = event.target.getAttribute("data-index");
  if (index === null || event.target.disabled) {
    return;
  }
  const i = Number(index);

  if (event.target.classList.contains("btn-approve")) {
    leaveRequests[i].status = "Approved";
  }

  if (event.target.classList.contains("btn-reject")) {
    leaveRequests[i].status = "Rejected";
  }

  if (event.target.classList.contains("btn-cancel")) {
    const confirmed = confirm("Cancel this leave request?");
    if (!confirmed) {
      return;
    }
    leaveRequests.splice(i, 1);
  }

  saveLeaveRequests();
  renderSummary();
  renderTable();
});

// Reset Demo Data - wipes whatever's saved (including any stale data left over
// from an older version of the sample list) and reloads, so the page comes
// back with the current default sample data fresh
document.getElementById("resetDataBtn").addEventListener("click", function () {
  const confirmed = confirm("This clears all leave request data (including anything you've submitted) and reloads the sample data. Continue?");
  if (!confirmed) {
    return;
  }
  localStorage.removeItem(LEAVE_STORAGE_KEY);
  location.reload();
});

// set up the page on load
renderSummary();
renderTable();