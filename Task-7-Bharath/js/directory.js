// local employee data - array of objects, no backend/API involved
const employees = [
  { id: 101, name: "Ananya Sharma", department: "HR", designation: "HR Manager", email: "ananya.sharma@atlashr.com", status: "Active" },
  { id: 102, name: "Rahul Mehta", department: "Development", designation: "Frontend Developer", email: "rahul.mehta@atlashr.com", status: "Active" },
  { id: 103, name: "Priya Nair", department: "Finance", designation: "Accountant", email: "priya.nair@atlashr.com", status: "Active" },
  { id: 104, name: "Vikram Singh", department: "CRM", designation: "Sales Executive", email: "vikram.singh@atlashr.com", status: "Inactive" },
  { id: 105, name: "Neha Kapoor", department: "HR", designation: "Recruiter", email: "neha.kapoor@atlashr.com", status: "Active" },
  { id: 106, name: "Arjun Reddy", department: "Development", designation: "Backend Developer", email: "arjun.reddy@atlashr.com", status: "Active" },
  { id: 107, name: "Sanya Iyer", department: "Finance", designation: "Finance Analyst", email: "sanya.iyer@atlashr.com", status: "Inactive" },
  { id: 108, name: "Karthik Rao", department: "CRM", designation: "Account Manager", email: "karthik.rao@atlashr.com", status: "Active" },
  { id: 109, name: "Divya Menon", department: "HR", designation: "HR Executive", email: "divya.menon@atlashr.com", status: "Active" },
  { id: 110, name: "Rohan Gupta", department: "Development", designation: "QA Engineer", email: "rohan.gupta@atlashr.com", status: "Active" }
];

// colour per department, used for the photo placeholder and the department tag
const deptColors = {
  HR: { color: "#6366f1", bg: "#eef1ff" },
  CRM: { color: "#ec4899", bg: "#fff0f7" },
  Finance: { color: "#8b5cf6", bg: "#f5f0ff" },
  Development: { color: "#0ea5e9", bg: "#eaf7ff" }
};

// colour per status, used for the status badge
const statusColors = {
  Active: { color: "#10b981", bg: "#eafbf3" },
  Inactive: { color: "#9aa3af", bg: "#f1f3f6" }
};

// no photo files or image API used - this builds a two-letter placeholder
// from the employee's first and last name instead (e.g. "Ananya Sharma" -> "AS")
function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const directoryGrid = document.getElementById("directoryGrid");
const noResults = document.getElementById("noResults");

// builds and inserts one card per employee in the list passed in
function renderCards(list) {
  directoryGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  list.forEach(function (emp) {
    const dept = deptColors[emp.department];
    const status = statusColors[emp.status];

    const card = document.createElement("div");
    card.className = "employee-card";
    card.style.borderTop = "4px solid " + dept.color;

    card.innerHTML =
      '<div class="employee-photo" style="background:' + dept.bg + '; color:' + dept.color + '">' +
        getInitials(emp.name) +
      '</div>' +
      '<h3 class="employee-name">' + emp.name + '</h3>' +
      '<p class="employee-id">Employee ID: ' + emp.id + '</p>' +
      '<p class="employee-role">' + emp.designation + '</p>' +
      '<p class="employee-email">' + emp.email + '</p>' +
      '<span class="dept-tag" style="background:' + dept.bg + '; color:' + dept.color + '">' + emp.department + '</span>' +
      '<span class="status-badge" style="background:' + status.bg + '; color:' + status.color + '">' + emp.status + '</span>';

    directoryGrid.appendChild(card);
  });
}

// show every employee on page load
renderCards(employees);