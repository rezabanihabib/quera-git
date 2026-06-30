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
function updateThemeIcon() {
  const isDark = localStorage.theme === "dark";
  lightIcon.classList.toggle("hidden", !isDark);
  darkIcon.classList.toggle("hidden", isDark);
}

updateThemeIcon();

// Change Theme via Theme Button
themeBtn.addEventListener("click", function () {
  const newTheme = localStorage.theme === "dark" ? "light" : "dark";
  localStorage.theme = newTheme;

  document.documentElement.classList.toggle("dark", newTheme == "dark");

  // Change Theme Button Icon on Theme Change
  updateThemeIcon();
});

// TODO Implement Tasks
let form = document.getElementById("form");
let taskList = document.getElementById("tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

// TODO Handle Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveTask();
  renderTasks();
});

function saveTask() {
  let taskInput = document.getElementById("task-input");
  const taskValue = taskInput.value.trim();
  if (!taskValue) return;

  tasks.push({
    id: Date.now(),
    title: taskValue,
    completed: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
}

// TODO IMPLEMENT renderTasks
function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length <= 0) {
    taskList.innerHTML = `<p>تسکی وجود ندارد</p>`;
    return;
  }
  tasks.forEach((task) => {
    let deleteBtn = createDeleteBtn();
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(task.id, e);
    });

    let taskEl = document.createElement("div");
    taskEl.innerText = task.title;
    taskList.appendChild(taskEl);
    taskEl.appendChild(deleteBtn);
    taskEl.addEventListener("click", () => markAsCompleted(task.id));
    taskEl.classList.add(
      "bg-bg-card",
      "dark:bg-bg-dark-card",
      "text-primary",
      "dark:text-dark-primary",
      "text-xl",
      "w-full",
      "px-3",
      "py-4",
      "rounded-md",
      "flex",
      "items-center",
      "mb-3",
    );

    if (task.completed) {
      taskEl.classList.add("line-through", "opacity-50");
    }
  });
}

// TODO implement createDeleteBtn function
function createDeleteBtn() {
  let btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.classList.add(
    "bg-danger",
    "bg-dark-danger",
    "text-white",
    "ms-auto",
    "border-none",
    "p-3",
    "rounded-md",
    "cursor-pointer",
  );

  return btn;
}

//TODO implement deleteTask function
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

//TODO implement markAsCompleted function
function markAsCompleted(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
