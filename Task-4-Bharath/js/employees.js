// local employee data - array of objects, no backend/API involved.
// each object represents one employee row that gets turned into a card below.
const employees = [
  { id: 101, name: "Ananya Sharma", department: "HR", designation: "HR Manager", status: "Active" },
  { id: 102, name: "Rahul Mehta", department: "Development", designation: "Frontend Developer", status: "Active" },
  { id: 103, name: "Priya Nair", department: "Finance", designation: "Accountant", status: "Active" },
  { id: 104, name: "Vikram Singh", department: "CRM", designation: "Sales Executive", status: "On Leave" },
  { id: 105, name: "Neha Kapoor", department: "HR", designation: "Recruiter", status: "Active" },
  { id: 106, name: "Arjun Reddy", department: "Development", designation: "Backend Developer", status: "Active" },
  { id: 107, name: "Sanya Iyer", department: "Finance", designation: "Finance Analyst", status: "On Leave" },
  { id: 108, name: "Karthik Rao", department: "CRM", designation: "Account Manager", status: "Active" },
  { id: 109, name: "Divya Menon", department: "HR", designation: "HR Executive", status: "Inactive" },
  { id: 110, name: "Rohan Gupta", department: "Development", designation: "QA Engineer", status: "Active" },
  { id: 111, name: "Kavya Pillai", department: "Finance", designation: "Finance Manager", status: "Active" },
  { id: 112, name: "Aditya Verma", department: "CRM", designation: "CRM Lead", status: "Active" },
  { id: 113, name: "Meera Joshi", department: "HR", designation: "Talent Acquisition Lead", status: "Active" },
  { id: 114, name: "Siddharth Rao", department: "Development", designation: "Full Stack Developer", status: "On Leave" },
  { id: 115, name: "Pooja Desai", department: "Finance", designation: "Payroll Specialist", status: "Active" },
  { id: 116, name: "Manish Kumar", department: "CRM", designation: "Customer Success Executive", status: "Inactive" }
];

// lookup table: each department gets an accent colour + a light background tint.
// used to colour the avatar circle and the department pill on every card.
const deptColors = {
  HR: { color: "#6366f1", bg: "#eef1ff" },
  CRM: { color: "#ec4899", bg: "#fff0f7" },
  Finance: { color: "#8b5cf6", bg: "#f5f0ff" },
  Development: { color: "#0ea5e9", bg: "#eaf7ff" }
};

// lookup table: each status gets its own colour for the status badge
// (green = active, amber = on leave, grey = inactive).
const statusColors = {
  Active: { color: "#10b981", bg: "#eafbf3" },
  "On Leave": { color: "#f59e0b", bg: "#fff8ea" },
  Inactive: { color: "#9aa3af", bg: "#f1f3f6" }
};

// no photo files or image API used - this builds a two-letter avatar
// from the employee's first and last name instead (e.g. "Ananya Sharma" -> "AS").
function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// grab all the DOM elements we'll need to read from or write into
const employeeGrid = document.getElementById("employeeGrid");
const noResults = document.getElementById("noResults");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");

// takes a list of employee objects and builds one card per employee inside the grid.
// called once on page load with the full list, then again every time the
// search box or department dropdown changes with whatever list matches.
function renderEmployees(list) {
  employeeGrid.innerHTML = ""; // clear out whatever was there before re-rendering

  if (list.length === 0) {
    noResults.hidden = false; // show the "no matches" message
    resultCount.textContent = "";
    return;
  }
  noResults.hidden = true;
  resultCount.textContent = list.length + (list.length === 1 ? " employee found" : " employees found");

  // forEach walks through every employee in the (already filtered) list
  // and turns it into a card element in the grid
  list.forEach(function (emp) {
    const dept = deptColors[emp.department];
    const status = statusColors[emp.status];

    const card = document.createElement("div");
    card.className = "employee-card";
    card.style.borderTop = "4px solid " + dept.color; // coloured top accent per department

    // build the card's inner HTML using the employee's data and the colours looked up above
    card.innerHTML =
      '<div class="employee-avatar" style="background:' + dept.bg + '; color:' + dept.color + '">' +
        getInitials(emp.name) +
      '</div>' +
      '<h3 class="employee-name">' + emp.name + '</h3>' +
      '<p class="employee-id">Employee ID: ' + emp.id + '</p>' +
      '<p class="employee-role">' + emp.designation + '</p>' +
      '<span class="dept-tag" style="background:' + dept.bg + '; color:' + dept.color + '">' + emp.department + '</span>' +
      '<span class="status-badge" style="background:' + status.bg + '; color:' + status.color + '">' + emp.status + '</span>';

    employeeGrid.appendChild(card);
  });
}

// reads the current search text and selected department, filters the full
// employee list down to whatever matches both, and re-renders the grid.
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDept = departmentFilter.value;

  // filter() returns a new array containing only the employees that pass this test
  const filtered = employees.filter(function (emp) {
    const matchesName = emp.name.toLowerCase().includes(query);
    const matchesDept = selectedDept === "all" || emp.department === selectedDept;
    return matchesName && matchesDept; // must satisfy both the search text AND the department
  });

  renderEmployees(filtered);
}

// show every employee when the page first loads
renderEmployees(employees);

// re-run the filter every time the person types in the search box...
searchInput.addEventListener("input", applyFilters);
// ...or changes the department dropdown
departmentFilter.addEventListener("change", applyFilters);

// sidebar toggle for mobile - shows/hides the sidebar drawer via the "open" CSS class
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
sidebarToggle.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});