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
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const designationFilter = document.getElementById("designationFilter");
const statusFilter = document.getElementById("statusFilter");
const sortSelect = document.getElementById("sortSelect");
const resetBtn = document.getElementById("resetBtn");

// builds and inserts one card per employee in the list passed in
function renderCards(list) {
  directoryGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    resultCount.textContent = "";
    return;
  }
  noResults.hidden = true;
  resultCount.textContent = list.length + (list.length === 1 ? " employee found" : " employees found");

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

// fills the designation filter dropdown with every distinct designation
// found in the data - built dynamically so it never falls out of sync
// with whatever designations actually exist across the employees array
function populateDesignationFilter() {
  const distinctDesignations = [];

  employees.forEach(function (emp) {
    if (!distinctDesignations.includes(emp.designation)) {
      distinctDesignations.push(emp.designation);
    }
  });

  distinctDesignations.sort(); // alphabetical, so the dropdown is easy to scan

  distinctDesignations.forEach(function (designation) {
    const option = document.createElement("option");
    option.value = designation;
    option.textContent = designation;
    designationFilter.appendChild(option);
  });
}

// applies the search box, all three filter dropdowns, and the sort dropdown
// together, then re-renders the grid with whatever's left
function applyFiltersAndSort() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDept = departmentFilter.value;
  const selectedDesignation = designationFilter.value;
  const selectedStatus = statusFilter.value;
  const sortValue = sortSelect.value;

  // filter() builds a new array containing only the employees that pass every check
  let result = employees.filter(function (emp) {
    const matchesSearch =
      emp.name.toLowerCase().includes(query) ||
      emp.id.toString().includes(query);

    const matchesDept = selectedDept === "all" || emp.department === selectedDept;
    const matchesDesignation = selectedDesignation === "all" || emp.designation === selectedDesignation;
    const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesDesignation && matchesStatus;
  });

  // sort() reorders that filtered list based on whichever sort option is picked.
  // slice() first so we're sorting a copy, not the original filtered array in place
  if (sortValue === "name-asc") {
    result = result.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortValue === "name-desc") {
    result = result.slice().sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  } else if (sortValue === "id-asc") {
    result = result.slice().sort(function (a, b) {
      return a.id - b.id;
    });
  } else if (sortValue === "id-desc") {
    result = result.slice().sort(function (a, b) {
      return b.id - a.id;
    });
  }

  renderCards(result);
}

// re-run search/filter/sort whenever any control changes
searchInput.addEventListener("input", applyFiltersAndSort);
departmentFilter.addEventListener("change", applyFiltersAndSort);
designationFilter.addEventListener("change", applyFiltersAndSort);
statusFilter.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

// Reset Filters - clears every control back to its default and shows the full list again
resetBtn.addEventListener("click", function () {
  searchInput.value = "";
  departmentFilter.value = "all";
  designationFilter.value = "all";
  statusFilter.value = "all";
  sortSelect.value = "default";
  renderCards(employees);
});

// set up the designation dropdown, then show every employee on page load
populateDesignationFilter();
renderCards(employees);