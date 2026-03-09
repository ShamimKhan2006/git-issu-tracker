const openBtn = document.getElementById("open-btn");
const allBtn = document.getElementById("all-btn");
const closedBtn = document.getElementById("close-btn");
const buttons = document.getElementById("buttons");
const perentSecStatus = document.getElementById("status-sec");
const countIssu = document.getElementById("countissu");

let allissu = [];

buttons.addEventListener("click", (event) => {
  const clickValue = event.target;

  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  if (clickValue.id === "open-btn") {
    openBtn.classList.add("btn-primary");
  } else if (clickValue.id === "close-btn") {
    closedBtn.classList.add("btn-primary");
  } else if (clickValue.id === "all-btn") {
    allBtn.classList.add("btn-primary");
  }
});

const countDisplay = document.getElementById("total-issue-count");

const updateCount = (count) => {
  countIssu.innerText = `${count} Issues`;
};

const loadIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues/",
  );
  const data = await res.json();
  allissu = data.data;
  displayIssues(allissu);
};

const displayIssues = (issues) => {
  perentSecStatus.innerHTML = "";

  issues.forEach((item) => {
    const borderColor =
      item.status === "open" ? "border-t-green-500" : "border-t-purple-500";

    const div = document.createElement("div");

    div.innerHTML = `
    
<div onclick="document.getElementById('myModal${item.id}').showModal()"
class="bg-base-100 p-6 rounded-2xl shadow-md space-y-4 border-t-4 ${borderColor} flex flex-col justify-between cursor-pointer">

<div class="flex justify-between">
<span class="badge badge-ghost">${item.status}</span>
</div>

<div>
<h3 class="font-bold text-lg">${item.title}</h3>
<p>${item.description}</p>
</div>

<div class="flex gap-2">
<span class="badge badge-soft badge-error">${item.labels?.[0] || ""}</span>
<span class="badge badge-soft badge-warning">${item.labels?.[1] || ""}</span>
</div>

<p class="text-xs text-gray-400">
${new Date(item.createdAt).toLocaleDateString()}
</p>

</div>

<dialog id="myModal${item.id}" class="modal">

<div class="modal-box space-y-4">

<h3 class="font-bold text-lg">${item.title}</h3>

<p>${item.description}</p>

<div class="flex gap-2">
<span class="badge badge-success">${item.status}</span>
<span>${item.author}</span>
<p>
${new Date(item.createdAt).toLocaleDateString()}
</p>

</div>

<div class="flex gap-2">
<span class="badge badge-soft badge-error">${item.labels?.[0] || ""}</span>
<span class="badge badge-soft badge-warning">${item.labels?.[1] || ""}</span>
</div>



<div class="flex justify-between w-full border-none shadow bg-gray-100 p-4"> 
<div> 
<p>Assignee</p>
 <span class="font-bold">${item.author}</span>
</div>

<div>
  <p>Priority</p>
  <span class="btn btn-error">${item.priority}</span>
</div>
</div>
<div class="modal-action">
<form method="dialog">
<button class="btn btn-primary">Close</button>
</form>
</div>

</div>

</dialog>
`;

    perentSecStatus.appendChild(div);
  });
};

allBtn.addEventListener("click", () => {
  displayIssues(allissu);
  updateCount(allissu.length);
});

openBtn.addEventListener("click", () => {
  const open = allissu.filter((i) => i.status === "open");
  displayIssues(open);
  updateCount(open.length);
});

closedBtn.addEventListener("click", () => {
  const closed = allissu.filter((i) => i.status === "closed")
  displayIssues(closed);
  updateCount(closed.length);
});

document.getElementById("newIssuBtn").addEventListener("click", () => {
  const inputValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  const filtered = allissu.filter(
    (issue) =>
      issue.title.toLowerCase().includes(inputValue) ||
      issue.description.toLowerCase().includes(inputValue),
  );

  displayIssues(filtered);
});

loadIssues();
