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

    const taskBtns = document.createElement("div");
    taskBtns.classList.add("task-buttons");

    const taskTextEl = document.createElement("span");
    taskTextEl.textContent = taskText;
    taskItem.appendChild(taskTextEl);
    taskList.appendChild(taskItem);
    taskItem.appendChild(taskBtns);
    input.value = "";

    // Task item done button
    const doneBtn = document.createElement("button");

    doneBtn.addEventListener("click", function() {
      taskTextEl.classList.toggle("completed");
    });

    doneBtn.classList.add("done-button");
    doneBtn.textContent = "✅";
    taskBtns.appendChild(doneBtn);

    // Task item edit button
    const editBtn = document.createElement("button");

    editBtn.addEventListener("click", function() {
      const currentText = taskTextEl.textContent;
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = currentText;
      inputField.classList.add("edit-input")

      taskItem.replaceChild(inputField, taskTextEl);
      inputField.focus();

      inputField.addEventListener("blur", function() {
        taskTextEl.textContent = inputField.value.trim() || currentText;
        taskItem.replaceChild(taskTextEl, inputField);
      })

      inputField.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
          inputField.blur()
        }
      })
    });

    editBtn.classList.add("edit-button");
    editBtn.textContent = "✏️";
    taskBtns.appendChild(editBtn);

    // Task item delete button
    const delBtn = document.createElement("button");

    delBtn.addEventListener("click", function () {
      taskItem.remove();
    });

    delBtn.classList.add("delete-button");
    delBtn.textContent = "❌";
    taskBtns.appendChild(delBtn);

    // Clear stored input after successful task creation
    sessionStorage.removeItem("taskInputValue");
  }
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("taskInputValue")) {
    input.value = sessionStorage.getItem("taskInputValue");
  }

  input.addEventListener("input", function () {
    sessionStorage.setItem("taskInputValue", input.value);
  });
});
