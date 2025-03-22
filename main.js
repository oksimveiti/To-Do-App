const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const taskList = document.querySelector(".task-list");

button.addEventListener("click", function () {
  const taskText = input.value.trim();
  if (!taskText) {
    alert("Please enter a task");
    return null;
  } else {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    const taskTextEl = document.createElement("span");
    taskTextEl.textContent = taskText;
    taskItem.appendChild(taskTextEl);
    taskList.appendChild(taskItem);
    input.value = "";

    const delBtn = document.createElement("button");

    delBtn.addEventListener("click", function () {
      const taskToDelete = delBtn.parentElement;
      taskToDelete.remove();
    });

    delBtn.classList.add("delete-button");
    delBtn.textContent = "❌";
    taskItem.appendChild(delBtn);

    // Clear stored input after successful task creation
    sessionStorage.removeItem("taskInputValue")
  }
});

input.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        button.click();
    }
})

document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("taskInputValue")) {
        input.value = sessionStorage.getItem("taskInputValue");
    }

    input.addEventListener("input", function() {
        sessionStorage.setItem("taskInputValue", input.value);
    })
})

