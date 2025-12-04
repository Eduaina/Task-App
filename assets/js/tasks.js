// assets/js/tasks.js

// --- Mock User Data (Placeholder for page header) ---
const MOCK_USER_NAME = "Ins";

// --- Task Data Store ---
let tasks = []; // Stores all active and completed tasks

// --- Utility Functions ---

function updateTaskCounts() {
  const activeCount = tasks.filter((task) => task.status === "active").length;
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  document.getElementById("active-count").textContent = activeCount;
  document.getElementById("completed-count").textContent = completedCount;

  // Show/hide components based on task counts
  const tasksList = document.getElementById("tasks-list");
  const noTasksPlaceholder = document.getElementById("no-tasks-placeholder");
  const completedContainer = document.getElementById(
    "completed-tasks-container"
  );

  if (activeCount + completedCount > 0) {
    tasksList.style.display = "block";
    noTasksPlaceholder.style.display = "none";
  } else {
    tasksList.style.display = "none";
    noTasksPlaceholder.style.display = "block";
  }

  completedContainer.style.display = completedCount > 0 ? "block" : "none";
}

function renderTasks() {
  const activeContainer = document.getElementById("active-tasks-container");
  const completedContainer = document.querySelector(
    "#completed-tasks-container > #active-tasks-container"
  )
    ? document.querySelector(
        "#completed-tasks-container > #active-tasks-container"
      )
    : document.createElement("div");

  // Set a unique ID for the completed tasks container if it was just created
  if (!completedContainer.id) {
    completedContainer.id = "completed-list";
    document
      .getElementById("completed-tasks-container")
      .appendChild(completedContainer);
  }

  activeContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  const taskTemplateContainer = document.querySelector(
    '#tasks-container [data-import*="task-item"]'
  );
  const taskTemplate = taskTemplateContainer
    ? taskTemplateContainer.querySelector(".task-item")
    : null;

  if (!taskTemplate) return;

  tasks.forEach((task) => {
    const item = taskTemplate.cloneNode(true);
    item.removeAttribute("data-id");
    item.setAttribute("data-id", task.id);
    item.setAttribute("data-status", task.status);

    // Set content
    item.querySelector(".task-title").textContent = task.title;
    item.querySelector(".task-description").textContent = task.description;
    item.querySelector(".task-due-date").textContent = task.dueDate
      ? `Due: ${task.dueDate}`
      : "No Due Date";

    // Set checkbox state and priority
    const checkbox = item.querySelector('.task-check input[type="checkbox"]');
    checkbox.checked = task.status === "completed";
    checkbox.id = `task-${task.id}`;
    item
      .querySelector(".task-check label")
      .setAttribute("for", `task-${task.id}`);

    const prioritySpan = item.querySelector(".task-priority");
    prioritySpan.textContent = task.priority;
    prioritySpan.className = `task-priority ${task.priority}`; // Sets the color class

    // Attach event listeners
    item
      .querySelector(".task-delete-btn")
      .addEventListener("click", () => deleteTask(task.id));
    checkbox.addEventListener("change", (e) =>
      toggleTaskStatus(task.id, e.target.checked)
    );

    if (task.status === "active") {
      activeContainer.appendChild(item);
    } else {
      completedContainer.appendChild(item);
    }
  });

  updateTaskCounts();
}

function addTask(title, description, priority, dueDate) {
  const newTask = {
    id: Date.now(),
    title,
    description,
    priority,
    dueDate: dueDate || null,
    status: "active",
  };
  tasks.unshift(newTask); // Add new task to the top
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTaskStatus(id, isChecked) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = isChecked ? "completed" : "active";

    // Re-render to move the task between lists
    renderTasks();
  }
}

// --- Event Handlers ---

function handleTabToggle(tabName) {
  const views = document.querySelectorAll(".task-views-content .view");
  const buttons = document.querySelectorAll(".task-tabs .tab-button");

  views.forEach((view) => {
    if (view.dataset.view === tabName) {
      view.classList.remove("hidden");
      view.classList.add("active");
    } else {
      view.classList.add("hidden");
      view.classList.remove("active");
    }
  });

  buttons.forEach((btn) => {
    if (btn.dataset.tabName === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function setupModalListeners() {
  const modalBackdrop = document.getElementById("create-task-modal-backdrop");
  const showBtn = document.getElementById("show-create-task-modal");
  const closeBtn = document.getElementById("close-create-task-modal");
  const cancelBtn = document.getElementById("cancel-create-task");
  const form = document.getElementById("create-task-form");

  const showModal = () => modalBackdrop.classList.remove("hidden");
  const hideModal = () => {
    modalBackdrop.classList.add("hidden");
    form.reset(); // Clear form on close/cancel
  };

  if (showBtn) showBtn.addEventListener("click", showModal);
  if (closeBtn) closeBtn.addEventListener("click", hideModal);
  if (cancelBtn) cancelBtn.addEventListener("click", hideModal);

  // Form Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-description").value;
      const priority = document.getElementById("task-priority").value;
      const dueDate = document.getElementById("task-due-date").value;

      addTask(title, description, priority, dueDate);
      hideModal();
    });
  }

  // Tab Listeners
  document.querySelectorAll(".task-tabs .tab-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const tabName = e.currentTarget.dataset.tabName;
      handleTabToggle(tabName);
    });
  });
}

// --- Initialization ---

function initTasksPage() {
  // 1. Set Page Header
  const pageTitle = document.getElementById("page-title");
  const pageSubtitle = document.getElementById("page-subtitle");
  if (pageTitle) pageTitle.textContent = "Task Management";
  if (pageSubtitle) pageSubtitle.textContent = "Manage and track your tasks";

  // 2. Set Active Sidebar Link
  const aside = document.getElementById("aside-import");
  if (aside) {
    // Remove active class from Dashboard and add to Tasks (handled by aside.html update)
  }

  // 3. Setup Modal and Tab listeners
  setupModalListeners();

  // 4. Initial Render (Simulate data from screenshots 380/382 for initial load)
  tasks = [
    // Example Active Task
    {
      id: 101,
      title: "completing the task page",
      description: "completing the task page",
      priority: "high",
      dueDate: "2025-12-01",
      status: "active",
    },
    // Example Completed Task 1
    {
      id: 102,
      title: "completing the task page",
      description: "completing the task page",
      priority: "medium",
      dueDate: null,
      status: "completed",
    },
    // Example Completed Task 2
    {
      id: 103,
      title: "completing the task page",
      description: "completing the task page",
      priority: "low",
      dueDate: null,
      status: "completed",
    },
  ];
  renderTasks();
}

// Function to handle the loading screen
function handleLoadingScreen() {
  const loader = document.getElementById("loader");
  const tasksContainer = document.getElementById("tasks-container");

  window.loadAllComponents().then(() => {
    initTasksPage();

    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
      if (tasksContainer) tasksContainer.classList.remove("hidden");
    }, 2000); // 2-second delay
  });
}

// Call the loading handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", handleLoadingScreen);
