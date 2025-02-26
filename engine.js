const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const task = document.getElementById("task");
const inputprioridade = document.getElementsByName("prioridade");

addTaskBtn.addEventListener("click", () => {
  const tasktext = taskInput.value.trim();
  if (tasktext === "") {
    alert("Por favor, insira uma tarefa.");
    taskInput.value = "";
    taskInput.focus();
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskList.appendChild(taskDiv);

  if (inputprioridade[0].checked) {
    taskDiv.classList.add("alta");
  }
  if (inputprioridade[1].checked) {
    taskDiv.classList.add("media");
  }
  if (inputprioridade[2].checked) {
    taskDiv.classList.add("baixa");
  }

  const taskSpan = document.createElement("span");
  taskSpan.textContent = tasktext;

  taskSpan.addEventListener("click", () => {
    taskSpan.classList.toggle("completed");
  });

  taskDiv.appendChild(taskSpan);

  const taskBtnDiv = document.createElement("div");
  taskBtnDiv.classList.add("taskBtn");
  taskDiv.appendChild(taskBtnDiv);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "finalizar";

  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskDiv);
  });
  taskBtnDiv.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "editar";
  editBtn.addEventListener("click", () => {
    const newTaskText = prompt("Edite a tarefa:", taskSpan.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskSpan.textContent = newTaskText.trim();
      taskSpan.classList.remove("completed");
    } else if (newTaskText !== null) {
      alert("O texto da tarefa não pode ficar vazio.");
    }
  });
  taskBtnDiv.appendChild(editBtn);

  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskBtn.click();
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector("span").textContent,
      priority: task.classList[1],
      completed: task.querySelector("span").classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskData) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", taskData.priority);

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskData.text;
    if (taskData.completed) taskSpan.classList.add("completed");
    taskSpan.addEventListener("click", () => {
      taskSpan.classList.toggle("completed");
      saveTasks();
    });

    const taskBtnDiv = document.createElement("div");
    taskBtnDiv.classList.add("taskBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "finalizar";
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(taskDiv);
      saveTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "editar";
    editBtn.addEventListener("click", () => {
      const newTaskText = prompt("Edite a tarefa:", taskSpan.textContent);
      if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText.trim();
        taskSpan.classList.remove("completed");
        saveTasks();
      } else if (newTaskText !== null) {
        alert("O texto da tarefa não pode ficar vazio.");
      }
    });

    taskBtnDiv.appendChild(deleteBtn);
    taskBtnDiv.appendChild(editBtn);

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(taskBtnDiv);

    taskList.appendChild(taskDiv);
  });
}

addTaskBtn.addEventListener("click", saveTasks);
window.addEventListener("beforeunload", saveTasks);

window.addEventListener("DOMContentLoaded", loadTasks);
