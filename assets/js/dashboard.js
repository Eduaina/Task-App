const MOCK_USER_NAME = "Ins";
const MOCK_USER_EMAIL = "eduaighalo22@gmail.com";

// Function to handle the personalized greeting and user info
function setDashboardData() {
  const asideName = document.getElementById("aside-name");
  const asideEmail = document.getElementById("aside-email");
  if (asideName) asideName.textContent = MOCK_USER_NAME;
  if (asideEmail) asideEmail.textContent = MOCK_USER_EMAIL;

  // Determine Greeting based on Time
  const now = new Date();
  const hour = now.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }


  const greetingHeader = document.getElementById("greeting-header");
  if (greetingHeader) {
    greetingHeader.textContent = `${greeting}, ${MOCK_USER_NAME}!`;
  }
}

// --- Card population data and logic ---
const cardData = [
  {
    title: "Active Tasks",
    value: "0",
    subtext: "0 completed",
    iconClass: `fa-regular fa-square-check" style="color: #f4f6fb;`,
    colorClass: "blue",
  },
  {
    title: "Total Expenses",
    value: "$0.00",
    subtext: "This period",
    iconClass: "fa-dollar-sign",
    colorClass: "teal",
  },
  {
    title: "Total Notes",
    value: "0",
    subtext: "Saved notes",
    iconClass: "fa-note-sticky",
    colorClass: "green",
  },
  {
    title: "Completion Rate",
    value: "0%",
    subtext: "Task completion",
    iconClass: "fa-chart-pie",
    colorClass: "deepblue",
  },
];

function populateCards() {
  const grid = document.querySelector(".dashboard-stats-grid");
  const templateContainer = document.querySelector("#card-template-container");

  if (!templateContainer) return;

  const cardTemplate = templateContainer.querySelector(
    ".task-stats-card.template"
  );
  if (!cardTemplate) return;

  templateContainer.style.display = "none";

  cardData.forEach((data) => {
    const card = cardTemplate.cloneNode(true);
    card.classList.remove("template");

    card.querySelector(".card-title").textContent = data.title;
    card.querySelector(".card-value").textContent = data.value;
    card.querySelector(".card-subtext").textContent = data.subtext;

    const iconDiv = card.querySelector(".card-icon-wrapper");
    iconDiv.innerHTML = `<i class="fa-solid ${data.iconClass}"></i>`;
    iconDiv.className = `card-icon-wrapper ${data.colorClass}`;

    grid.appendChild(card);
  });
}


// Function to simulate the 2-second loading screen
function handleLoadingScreen() {
  const loader = document.getElementById("loader");
  const dashboardContainer = document.getElementById("dashboard-container");

  // Wait for the global component imports to finish resolving
  if (typeof window.loadAllComponents === "function") {
    window.loadAllComponents().then(() => {
      // 1. Run data setup and card population (after all components are in the DOM)
      setDashboardData();
      populateCards();

      // 2. After a 2-second delay, hide the loader and show the dashboard.
      setTimeout(() => {
        if (loader) loader.classList.add("hidden");
        if (dashboardContainer) dashboardContainer.classList.remove("hidden");
      }, 1000);
    });
  } else {
    console.error("global.js failed to load or define loadAllComponents.");
  }
}

// Call the loading handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", handleLoadingScreen);