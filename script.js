window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  let form = document.querySelector(".form");
  input = document.querySelector(".task-input");

  let errMsg = document.getElementById("err_msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = input.value;
    if (!taskInput) {
      errMsg.innerHTML = "Please fill out the task field";
      errMsg.classList.add("error");
      errMsg.style.display = "block";
      function showError() {
        errMsg.style.display = "none";
      }

      setTimeout(() => {
        showError();
      }, 1500);
      return;
    } else {
      errMsg.style.display = "none";
      const todo = {
        content: taskInput,
        createdAt: new Date().getTime(),
      };

      todos.push(todo);

      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    }
  });
  displayTodos();
});

function displayTodos() {
  let tasks = document.querySelector(".tasks");

  tasks.innerHTML = "";
  //   todos.sort((a, b) => {});
  todos.map((x, y) => {
    let taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    let task = document.createElement("input");
    task.classList.add("text");
    task.type = "text";
    task.value = `${x.content}`;
    task.setAttribute("readonly", "readonly");
    taskContent.appendChild(task);
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("button-container");
    let editBtn = document.createElement("div");
    editBtn.innerHTML = "edit";
    editBtn.classList.add("edit-btn");
    let deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = "delete";
    deleteBtn.classList.add("delete-btn");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    taskContent.appendChild(btnContainer);
    tasks.appendChild(taskContent);
    input.value = "";

    editBtn.addEventListener("click", () => {
      if (editBtn.innerText.toLowerCase() == "edit") {
        task.removeAttribute("readonly");
        task.focus();
        editBtn.innerText = "save";
      } else {
        task.setAttribute("readonly", "readonly");
        editBtn.innerText = "edit";
      }
    });
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t != x);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}

// localStorage.clear();
