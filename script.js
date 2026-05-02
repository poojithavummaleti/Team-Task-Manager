 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// LOGIN
function login() {
  let username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Enter username");
    return;
  }

  let role = username.toLowerCase() === "admin" ? "Admin" : "Member";

  document.getElementById("user").innerText = username;
  document.getElementById("role").innerText = role;

  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("app").style.display = "block";

  displayTasks(); // IMPORTANT
}

// ADD TASK
function addTask() {
  let taskName = document.getElementById("taskInput").value.trim();
  let assignedTo = document.getElementById("assignedTo").value.trim();
  let status = document.getElementById("status").value;

  if (taskName === "" || assignedTo === "") {
    alert("Fill all fields");
    return;
  }

  let task = {
    name: taskName,
    assigned: assignedTo,
    status: status
  };

  tasks.push(task);

  // 🔥 SAVE TO LOCAL STORAGE
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";
  document.getElementById("assignedTo").value = "";

  displayTasks();
}

// DISPLAY TASKS
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let total = tasks.length;
  let completed = tasks.filter(t => t.status === "Completed").length;
  let pending = tasks.filter(t => t.status !== "Completed").length;

  document.getElementById("total").innerText = total;
  document.getElementById("completed").innerText = completed;
  document.getElementById("pending").innerText = pending;

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <b>${task.name}</b> - ${task.assigned} [${task.status}]
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

// DELETE TASK
function deleteTask(index) {
  tasks.splice(index, 1);

  // 🔥 UPDATE LOCAL STORAGE
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}