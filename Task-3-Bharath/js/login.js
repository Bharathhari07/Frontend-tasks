const validUser = {
  id: "admin",
  password: "admin123",
  name: "Admin User"
};

const loginForm = document.getElementById("loginForm");
const empIdInput = document.getElementById("empId");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("rememberMe");
const errorMsg = document.getElementById("errorMsg");

// if "remember me" was ticked last time, pre-fill the employee ID
window.addEventListener("DOMContentLoaded", function () {
  const savedId = localStorage.getItem("rememberedEmpId");
  if (savedId) {
    empIdInput.value = savedId;
    rememberCheckbox.checked = true;
  }
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredId = empIdInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  if (enteredId === validUser.id && enteredPassword === validUser.password) {

    // remember me - just storing the id for next time, nothing sensitive
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedEmpId", enteredId);
    } else {
      localStorage.removeItem("rememberedEmpId");
    }

    // store logged in user for the dashboard to read
    sessionStorage.setItem("loggedInUser", validUser.name);

    window.location.href = "dashboard.html";

  } else {
    errorMsg.hidden = false;
  }
});

// hide the error again once the user starts typing
empIdInput.addEventListener("input", function () {
  errorMsg.hidden = true;
});
passwordInput.addEventListener("input", function () {
  errorMsg.hidden = true;
});