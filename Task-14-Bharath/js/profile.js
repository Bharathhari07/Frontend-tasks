// this page doesn't own any employee/attendance/leave data of its own - it
// reads the SAME localStorage keys that Employee Management, Attendance and
// Leave already write to, then combines them into one profile view

// same starter lists used as fallbacks on those pages, so this profile stays
// consistent even if none of those pages have been visited yet
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

const defaultAttendance = [
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

const defaultLeaveRequests = [
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

// phone number and joining date aren't tracked anywhere else in this project -
// this is just enough extra detail to display the two fields this page asks
// for, not a parallel employee dataset
const profileExtras = {
  "101": { phone: "+91 98765 43210", joiningDate: "2023-03-15" },
  "102": { phone: "+91 98123 45678", joiningDate: "2022-11-02" },
  "103": { phone: "+91 97654 32109", joiningDate: "2021-06-20" },
  "104": { phone: "+91 96543 21098", joiningDate: "2023-01-10" },
  "105": { phone: "+91 95432 10987", joiningDate: "2022-08-05" },
  "106": { phone: "+91 94321 09876", joiningDate: "2021-09-14" },
  "107": { phone: "+91 93210 98765", joiningDate: "2020-12-01" },
  "108": { phone: "+91 92109 87654", joiningDate: "2023-04-18" },
  "109": { phone: "+91 91098 76543", joiningDate: "2022-02-27" },
  "110": { phone: "+91 90987 65432", joiningDate: "2021-07-09" }
};

// company policy constants (not per-employee data) used to turn real leave
// data into the Reports section below
const WORKING_DAYS_PER_MONTH = 22;
const ANNUAL_LEAVE_ALLOTMENT = 24;

// colour per department, reused for the avatar and department tag
const deptColors = {
  HR: { color: "#6366f1", bg: "#eef1ff" },
  CRM: { color: "#ec4899", bg: "#fff0f7" },
  Finance: { color: "#8b5cf6", bg: "#f5f0ff" },
  Development: { color: "#0ea5e9", bg: "#eaf7ff" }
};

const statusColors = {
  "Pending": { color: "#f59e0b", bg: "#fff8ea" },
  "Approved": { color: "#10b981", bg: "#eafbf3" },
  "Rejected": { color: "#d92d20", bg: "#fdeceb" }
};

// which employee shows is now picked from the dropdown built by
// populateEmployeeSelector() further down, rather than a fixed ID

function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// read all three real datasets (or their fallbacks) - this page never writes to any of them
// read all three real datasets (or their fallbacks) - this page never writes to any of them.
// an empty array counts as "nothing saved yet" here too, not as real data - otherwise a
// leftover empty array from an earlier version of the app would permanently block the sample data
function loadOrDefault(key, defaults) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    return (stored && stored.length > 0) ? stored : defaults;
  } catch (e) {
    // if what's saved isn't valid JSON (e.g. corrupted from earlier testing),
    // fall back to the sample data instead of crashing the whole page
    return defaults;
  }
}

const employees = loadOrDefault("atlasHR_employees", defaultEmployees);
const attendance = loadOrDefault("atlasHR_attendance", defaultAttendance);
const leaveRequests = loadOrDefault("atlasHR_leaveRequests", defaultLeaveRequests);

const employeeSelector = document.getElementById("employeeSelector");

// fills the dropdown with every employee currently in the (real) employees list,
// so any of them can be viewed - not just one hardcoded person
function populateEmployeeSelector() {
  employeeSelector.innerHTML = "";
  employees.forEach(function (emp) {
    const option = document.createElement("option");
    option.value = emp.id;
    option.textContent = emp.name + " (ID: " + emp.id + ")";
    employeeSelector.appendChild(option);
  });
}

// re-renders the whole profile whenever a different employee is picked
employeeSelector.addEventListener("change", function () {
  renderProfile(employeeSelector.value);
});

function renderProfile(selectedId) {
  const employee = employees.find(function (e) { return String(e.id) === String(selectedId); });

  if (!employee) {
    document.getElementById("printArea").innerHTML = "<p>Employee not found.</p>";
    return;
  }

  const dept = deptColors[employee.department];
  const extras = profileExtras[employee.id] || { phone: "Not on file", joiningDate: "Not on file" };
  const attendanceRecord = attendance.find(function (a) { return String(a.id) === String(selectedId); });
  const myLeaveRequests = leaveRequests.filter(function (r) { return String(r.id) === String(selectedId); });

  // Leave Days - real data: total days across this employee's Approved requests
  const leaveDays = myLeaveRequests
    .filter(function (r) { return r.status === "Approved"; })
    .reduce(function (sum, r) { return sum + Number(r.totalDays); }, 0);

  const leaveBalance = ANNUAL_LEAVE_ALLOTMENT - leaveDays;

  // Present Days - assumes every working day that wasn't taken as approved
  // leave was a present day (a simplifying assumption, since attendance only
  // tracks a single "today" status rather than a full daily history)
  const presentDays = Math.max(WORKING_DAYS_PER_MONTH - leaveDays, 0);
  const attendancePct = Math.round((presentDays / WORKING_DAYS_PER_MONTH) * 100);

  // Profile header
  document.getElementById("profileAvatar").textContent = getInitials(employee.name);
  document.getElementById("profileAvatar").style.background = dept.bg;
  document.getElementById("profileAvatar").style.color = dept.color;
  document.getElementById("profileName").textContent = employee.name;
  document.getElementById("profileDesignation").textContent = employee.designation;
  document.getElementById("profileDeptTag").textContent = employee.department;
  document.getElementById("profileDeptTag").style.background = dept.bg;
  document.getElementById("profileDeptTag").style.color = dept.color;

  // Employee Details
  document.getElementById("detailId").textContent = employee.id;
  document.getElementById("detailEmail").textContent = employee.email;
  document.getElementById("detailPhone").textContent = extras.phone;
  document.getElementById("detailJoiningDate").textContent = extras.joiningDate;
  document.getElementById("detailAttendancePct").textContent = attendancePct + "%";
  document.getElementById("detailLeaveBalance").textContent = leaveBalance + " days";

  // Reports section
  document.getElementById("reportWorkingDays").textContent = WORKING_DAYS_PER_MONTH;
  document.getElementById("reportPresentDays").textContent = presentDays;
  document.getElementById("reportLeaveDays").textContent = leaveDays;
  document.getElementById("reportAttendancePct").textContent = attendancePct + "%";

  // Leave History
  const leaveHistoryBody = document.getElementById("leaveHistoryBody");
  leaveHistoryBody.innerHTML = "";

  if (myLeaveRequests.length === 0) {
    leaveHistoryBody.innerHTML = '<tr class="empty-row"><td colspan="5">No leave history yet.</td></tr>';
  } else {
    myLeaveRequests.forEach(function (req) {
      const badge = statusColors[req.status];
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + req.leaveType + "</td>" +
        "<td>" + req.fromDate + "</td>" +
        "<td>" + req.toDate + "</td>" +
        "<td>" + req.totalDays + "</td>" +
        '<td><span class="status-badge" style="background:' + badge.bg + '; color:' + badge.color + '">' + req.status + '</span></td>';
      leaveHistoryBody.appendChild(row);
    });
  }
}

// Print Profile - uses the browser's own print dialog; css/profile.css hides
// the sidebar, topbar and buttons in print view so only the profile shows
document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});

// Download Profile - UI only, as specified. Made obvious rather than silently
// doing nothing, so it doesn't look broken
document.getElementById("downloadBtn").addEventListener("click", function () {
  alert("This is a UI-only demo button - download functionality isn't implemented.");
});

populateEmployeeSelector();
renderProfile(employeeSelector.value);