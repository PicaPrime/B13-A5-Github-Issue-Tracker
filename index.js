let allIssues;
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => {
    return res.json();
  })
  .then((resPayload) => {
    allIssues = resPayload.data;
    renderIssues("all", allIssues);
    updateCount("all", allIssues);
  });

document.addEventListener("DOMContentLoaded", function () {
  let tabButtons = document.querySelectorAll(".tab");
  let activeClasses = [
    "bg-[#4b00ff]",
    "text-[16px]",
    "font-semibold",
    "text-white",
  ];
  let inactiveCLasses = [
    "border",
    "border-slate-200",
    "bg-white",
    "text-[16px]",
    "font-medium",
    "text-slate-500",
  ];

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let selectedFilter = button.getAttribute("data-tab");
      console.log(selectedFilter);
      tabButtons.forEach((btn) => {
        btn.classList.remove(...activeClasses);
        btn.setAttribute("aria-selected", "false");
        btn.classList.add(...inactiveCLasses);
      });

      button.classList.remove(...inactiveCLasses);
      button.classList.add(...activeClasses);
      button.setAttribute("area-selected", "true");

      renderIssues(selectedFilter, allIssues);
      updateCount(selectedFilter, allIssues);
    });
  });
});

function updateCount(selectedFilter, issues) {
  let counter = document.getElementById("issues-heading");
  let count = 0;
  issues.forEach((issue) => {
    if (issue.status === selectedFilter || selectedFilter === "all") {
      count++;
    }
  });
  counter.innerText = count;
}

function renderIssues(selectedFilter, issues) {
  let articleContainer = document.getElementById("article-container");
  articleContainer.innerHTML = "";
  issues.forEach((issue) => {
    if (issue.status === selectedFilter || selectedFilter === "all") {
      articleContainer.appendChild(createCard(issue));
    }
  });
}

function createCard(data) {
  const priority = data.priority || "low";
  const priorityClass =
    {
      high: "bg-rose-100 text-rose-500",
      medium: "bg-amber-100 text-amber-600",
      low: "bg-emerald-100 text-emerald-600",
    }[priority.toLowerCase()] || "bg-slate-100 text-slate-600";
  const labels = (data.labels || [])
    .map(
      (label) =>
        `<span class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">${label}</span>`,
    )
    .join("");

  const articleELement = document.createElement("article");
  articleELement.className = `issue-card cursor-pointer rounded-md border border-slate-200 border-t-[3px] border-t-${data.status === "open" ? "emerald" : "violet"}-500 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`;
  articleELement.innerHTML = `<div class="p-4"><div class="mb-3 flex items-center justify-between"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">◌</span><span class="rounded-full px-5 py-1 text-xs font-medium ${priorityClass}">${priority.toUpperCase()}</span></div><h2 class="text-[14px] font-bold leading-5">${data.title || "Untitled issue"}</h2><p class="mt-2 text-xs leading-4 text-slate-500">${data.description || "No description provided."}</p><div class="mt-3 flex flex-wrap gap-1">${labels}</div></div><footer class="border-t border-slate-200 px-4 py-3 text-xs leading-6 text-slate-500">#${data.id ?? "—"} by ${data.author || "Unknown"}<br>${data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ""}</footer>`;

  articleELement.addEventListener("click", function () {
    setModalData(data);
    document.getElementById("issue-modal").showModal();
  });
  return articleELement;
}

function setModalData(issue) {
  const date = issue.createdAt
    ? new Date(issue.createdAt).toLocaleDateString()
    : "";
  document.getElementById("modal-title").textContent = issue.title;
  document.getElementById("modal-status").textContent = issue.status;
  document.getElementById("modal-author").textContent =
    `Opened by ${issue.author}`;
  document.getElementById("modal-date").textContent = date;
  document.getElementById("modal-description").textContent = issue.description;
  document.getElementById("modal-assignee").textContent =
    issue.assignee || issue.author;
  document.getElementById("modal-priority").textContent = issue.priority;
  document.getElementById("modal-labels").textContent = (
    issue.labels || []
  ).join(" · ");
}

let inputElement = document.getElementById("search-issues");

inputElement.addEventListener("keyup", function () {
  let searchedIssues = [];
  allIssues.forEach((issue) => {
    if (issue.title.toLowerCase().includes(inputElement.value.toLowerCase())) {
      searchedIssues.push(issue);
    }
  });

  renderIssues("all", searchedIssues);
});
