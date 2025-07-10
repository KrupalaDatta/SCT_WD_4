document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const taskDatetime = document.getElementById("task-datetime");
  const taskPriority = document.getElementById("task-priority");
  const taskList = document.getElementById("task-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(taskInput.value, taskDatetime.value, taskPriority.value);
    form.reset();
  });

  function getTaskImage(text) {
    text = text.toLowerCase();
    if (text.includes("gym")) return "https://img.icons8.com/color/48/dumbbell.png";
    if (text.includes("grocery")) return "https://cdn-icons-png.flaticon.com/512/3081/3081559.png";
    if (text.includes("meeting")) return "https://cdn-icons-png.flaticon.com/512/726/726448.png";
    if (text.includes("doctor")) return "https://cdn-icons-png.flaticon.com/512/387/387561.png";
    if (text.includes("study")) return "https://cdn-icons-png.flaticon.com/512/3064/3064197.png";
    return null;
  }

  function addTask(text, datetime, priority) {
    const li = document.createElement("li");
    li.classList.add(`priority-${priority}`);

    // Wrapper for icon + text
    const contentWrap = document.createElement("div");
    contentWrap.style.display = "flex";
    contentWrap.style.alignItems = "center";
    contentWrap.style.gap = "10px";

    const taskImageURL = getTaskImage(text);
    if (taskImageURL) {
      const img = document.createElement("img");
      img.src = taskImageURL;
      img.alt = "task icon";
      img.className = "task-icon";
      contentWrap.appendChild(img);
    }

    const taskText = document.createElement("span");
    taskText.textContent = text;
    taskText.className = "task-text";
    contentWrap.appendChild(taskText);

    const taskMeta = document.createElement("div");
    taskMeta.className = "task-meta";
    taskMeta.innerHTML = `
      ${datetime ? `🕒 ${new Date(datetime).toLocaleString()}<br>` : ""}
      🎯 Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}
    `;

    const actions = document.createElement("div");
    actions.className = "actions";

    // ✅ Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete";
    completeBtn.onclick = () => {
      taskText.classList.toggle("done");

      // Optionally: shake high priority task when completed
      if (taskText.classList.contains("done") && li.classList.contains("priority-high")) {
        li.classList.add("shake");
        setTimeout(() => li.classList.remove("shake"), 400);
      }
    };

    // ✏️ Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.className = "edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", taskText.textContent);
      if (newText !== null) taskText.textContent = newText;
    };

    // ❌ Delete button with shake effect
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
li.classList.remove("shake"); // reset first
void li.offsetWidth; // force reflow (magic line)
li.classList.add("shake");

setTimeout(() => {
  li.remove();
}, 600);

    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(contentWrap);
    li.appendChild(taskMeta);
    li.appendChild(actions);

    taskList.appendChild(li);
    li.classList.add("animate-slide");

  }
});

