// if nobody is logged in (sessionStorage empty), send them back to login
const currentUser = sessionStorage.getItem("loggedInUser");
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("welcomeName").textContent = currentUser;

// module data - array of objects, this is what drives the card grid
// each module has its own accent colour so the dashboard doesn't look flat
const modules = [
  {
    name: "HR Dashboard",
    description: "Real-time stats combining every module.",
    icon: "📈",
    link: "../Task-13-Bharath/hr-dashboard.html",
    color: "#1a56db",
    bg: "#e8f0fe",
    iconBg: "#d6e4fc"
  },
  {
    name: "Employee Directory",
    description: "Browse, search, filter and sort the employee directory.",
    icon: "📇",
    link: "../Task-8-Bharath/employee-directory.html",
    color: "#0d9488",
    bg: "#e6f6f4",
    iconBg: "#ccece8"
  },
  {
    name: "Employee Management",
    description: "Add, update and manage employee records.",
    icon: "🧑‍💼",
    link: "../Task-6-Bharath/employee-management.html",
    color: "#6366f1",
    bg: "#eef1ff",
    iconBg: "#e0e4ff"
  },
  {
    name: "Employee Profile",
    description: "One employee's full profile and reports.",
    icon: "🪪",
    link: "../Task-14-Bharath/employee-profile.html",
    color: "#0891b2",
    bg: "#e5f8fb",
    iconBg: "#cdf0f6"
  },
  {
    name: "Attendance",
    description: "Mark attendance and view daily summary statistics.",
    icon: "🗓️",
    link: "../Task-10-Bharath/attendance.html",
    color: "#0ea5e9",
    bg: "#eaf7ff",
    iconBg: "#dcf1ff"
  },
  {
    name: "Leave Request",
    description: "Submit a leave request.",
    icon: "🌴",
    link: "../Task-11-Bharath/leave-management.html",
    color: "#10b981",
    bg: "#eafbf3",
    iconBg: "#d9f7e9"
  },
  {
    name: "Leave Approval",
    description: "Review and act on leave requests.",
    icon: "✅",
    link: "../Task-12-Bharath/leave-approval.html",
    color: "#f59e0b",
    bg: "#fff8ea",
    iconBg: "#ffefcf"
  },
  {
    name: "Payroll",
    description: "Manage salary, payslips and deductions.",
    icon: "💰",
    link: "pages/payroll.html",
    color: "#a855f7",
    bg: "#f6ecff",
    iconBg: "#ecd9ff"
  },
  {
    name: "CRM",
    description: "Track leads, deals and customer follow-ups.",
    icon: "🤝",
    link: "pages/crm.html",
    color: "#ec4899",
    bg: "#fff0f7",
    iconBg: "#ffe0ef"
  },
  {
    name: "Finance",
    description: "Invoices, expenses and financial reports.",
    icon: "📊",
    link: "pages/finance.html",
    color: "#8b5cf6",
    bg: "#f5f0ff",
    iconBg: "#ece0ff"
  }
];

const cardGrid = document.getElementById("cardGrid");
const noResults = document.getElementById("noResults");

// builds and inserts the card elements for whatever list is passed in
function renderCards(list) {
  cardGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  list.forEach(function (mod) {
    const card = document.createElement("div");
    card.className = "nav-card";
    card.style.background = mod.bg;
    card.style.borderTop = "4px solid " + mod.color;

    card.innerHTML =
      '<div class="nav-card-icon" style="background:' + mod.iconBg + '">' + mod.icon + '</div>' +
      '<h3>' + mod.name + '</h3>' +
      '<p>' + mod.description + '</p>';

    card.addEventListener("click", function () {
      window.location.href = mod.link;
    });

    cardGrid.appendChild(card);
  });
}

renderCards(modules);

// search / filter box
const searchInput = document.getElementById("cardSearch");
searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = modules.filter(function (mod) {
    return mod.name.toLowerCase().includes(query);
  });

  renderCards(filtered);
});

// sidebar toggle for mobile
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
sidebarToggle.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});

// logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});