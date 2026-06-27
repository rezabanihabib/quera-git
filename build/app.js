// TODO Implement Darkmode / Lightmode
let themeBtn = document.getElementById("themebtn");
let lightIcon = document.getElementById("light-icon");
let darkIcon = document.getElementById("dark-icon");
if (!("theme" in localStorage)) {
  localStorage.theme = "light";
}

// Toggle Theme on Page Load
document.documentElement.classList.toggle("dark", localStorage.theme == "dark");

// Change Theme Button Icon on Page Load
if (localStorage.theme === "dark") {
  lightIcon.classList.remove("hidden");
  darkIcon.classList.add("hidden");
} else {
  lightIcon.classList.add("hidden");
  darkIcon.classList.remove("hidden");
}

// Change Theme via Theme Button
themeBtn.addEventListener("click", function () {
  const newTheme = localStorage.theme === "dark" ? "light" : "dark";
  localStorage.theme = newTheme;

  document.documentElement.classList.toggle("dark", newTheme == "dark");

  // Change Theme Button Icon on Theme Change
  if (localStorage.theme === "dark") {
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  } else {
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  }
});

// TODO Implement Tasks
let form = document.getElementById("form");
let taskList = document.getElementById("tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

// TODO Handle Form Submit
form.addEventListener("submit", (e) => {
  renderTasks();
});

// TODO IMPLEMENT renderTasks
function renderTasks() {}
