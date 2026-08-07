// this page doesn't own any data of its own - it reads the SAME localStorage
// keys that Employee Management, Attendance and Leave already write to, so
// every number here reflects the real state of those modules rather than a
// separate, disconnected dataset

// same starter lists used as fallbacks on those pages, so the numbers here
// stay consistent even if none of those pages have been visited yet
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

// read all three real datasets (or their fallbacks) - this page never writes
// to any of these keys, only reads. an empty array counts as "nothing saved
// yet" here too, not as real data - otherwise a leftover empty array from
// an earlier version of the app would permanently block the sample data
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

// calculates and displays all six stat cards from the real data above
function renderStats() {
  const totalEmployees = employees.length;
  const presentToday = attendance.filter(function (a) { return a.attendanceStatus === "Present"; }).length;
  const onLeave = leaveRequests.filter(function (r) { return r.status === "Approved"; }).length;
  const pendingRequests = leaveRequests.filter(function (r) { return r.status === "Pending"; }).length;

  // number of distinct departments actually present in the employee list
  const departmentSet = {};
  employees.forEach(function (emp) { departmentSet[emp.department] = true; });
  const departments = Object.keys(departmentSet).length;

  // "active" here means not currently on approved leave
  const activeEmployees = totalEmployees - onLeave;

  document.getElementById("totalEmployeesCount").textContent = totalEmployees;
  document.getElementById("presentTodayCount").textContent = presentToday;
  document.getElementById("onLeaveCount").textContent = onLeave;
  document.getElementById("pendingRequestsCount").textContent = pendingRequests;
  document.getElementById("departmentsCount").textContent = departments;
  document.getElementById("activeEmployeesCount").textContent = activeEmployees;
}

// builds a combined feed of the most recent employees, leave requests, and
// attendance updates, each tagged with a coloured type badge
function renderActivities() {
  const activityTableBody = document.getElementById("activityTableBody");
  const activities = [];

  // recently added employees - last 3, most recent first
  employees.slice(-3).reverse().forEach(function (emp) {
    activities.push({
      type: "Employee",
      typeColor: "#6366f1",
      typeBg: "#eef1ff",
      description: emp.name + " added to " + emp.department,
      detail: emp.designation
    });
  });

  // latest leave requests - last 3, most recent first
  leaveRequests.slice(-3).reverse().forEach(function (req) {
    activities.push({
      type: "Leave",
      typeColor: "#f59e0b",
      typeBg: "#fff8ea",
      description: req.name + " requested " + req.leaveType,
      detail: req.status
    });
  });

  // attendance updates - only employees who actually have a status marked,
  // sorted by when they were actually marked (not by their position in the
  // array, since marking someone doesn't move them - a fixed array position
  // would always show the same few people regardless of what was just marked)
  attendance
    .filter(function (a) { return a.attendanceStatus; })
    .sort(function (a, b) {
      // treat a missing markedAt (e.g. data saved before this field existed)
      // as "very old" rather than an invalid date, so any real, freshly-marked
      // entry always sorts above it - this way stale localStorage data from
      // an earlier version of the app can't break the ordering
      const aTime = a.markedAt ? new Date(a.markedAt).getTime() : 0;
      const bTime = b.markedAt ? new Date(b.markedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3)
    .forEach(function (a) {
      activities.push({
        type: "Attendance",
        typeColor: "#0ea5e9",
        typeBg: "#eaf7ff",
        description: a.name + " marked " + a.attendanceStatus,
        detail: a.department
      });
    });

  activityTableBody.innerHTML = "";

  if (activities.length === 0) {
    activityTableBody.innerHTML = '<tr class="empty-row"><td colspan="3">No recent activity yet.</td></tr>';
    return;
  }

  activities.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML =
      '<td><span class="activity-type" style="background:' + item.typeBg + '; color:' + item.typeColor + '">' + item.type + '</span></td>' +
      "<td>" + item.description + "</td>" +
      "<td>" + item.detail + "</td>";
    activityTableBody.appendChild(row);
  });
}

renderStats();
renderActivities();

// Reset All Demo Data - clears all three shared data keys at once and reloads.
// a safety net in case any of them ever end up corrupted or in a confusing state
document.getElementById("resetAllDataBtn").addEventListener("click", function () {
  const confirmed = confirm("This clears all employee, attendance and leave data across the whole project and reloads the sample data. Continue?");
  if (!confirmed) {
    return;
  }
  localStorage.removeItem("atlasHR_employees");
  localStorage.removeItem("atlasHR_attendance");
  localStorage.removeItem("atlasHR_leaveRequests");
  location.reload();
});