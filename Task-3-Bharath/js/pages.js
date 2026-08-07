// these placeholder pages live one folder deeper than dashboard.html,
// so paths back to login/dashboard need the ../ prefix

// if nobody is logged in, don't let them sit on a module page
const currentUser = sessionStorage.getItem("loggedInUser");
if (!currentUser) {
  window.location.href = "../login.html";
}

// sidebar toggle for mobile
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
sidebarToggle.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});

// logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "../login.html";
});