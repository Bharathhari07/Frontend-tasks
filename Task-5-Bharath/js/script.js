// common.js - shared logic reused across every page that includes the sidebar layout.
// currently just the mobile sidebar toggle; more shared helpers can be added here later
// as more pages (login, register, etc.) get built out.

function initSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  // guard clause - not every page necessarily has a sidebar, so check both exist first
  if (!sidebar || !sidebarToggle) {
    return;
  }

  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });
}

initSidebarToggle();