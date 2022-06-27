const form = document.getElementById('todoForm');
const input = document.getElementById('enterTask');
const listElemets = document.getElementById('task');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value;

    if(!task) {
        alert('please enter task');
        return
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add('tasks');

    const taskContent = document.createElement("div");
    taskContent.classList.add('todoList');
    // taskContent.innerText = task;

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.classList.add("check");

    const taskInput = document.createElement("input");
    taskInput.value = task;
    taskInput.type = "text";
    taskInput.setAttribute("readonly", "readonly");
    taskInput.classList.add("text");

    taskContent.appendChild(taskCheck);
    taskContent.appendChild(taskInput);
    taskElement.appendChild(taskContent);


    const actionBtns = document.createElement("div");
    actionBtns.classList.add('todoActions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = "Delete";

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);

    taskElement.appendChild(actionBtns);

    listElemets.appendChild(taskElement);
    input.value = '';

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(editBtn.innerText == "Edit") {
            taskInput.removeAttribute("readonly");
            taskInput.focus();
            editBtn.innerText = "Save";
        }else{
            editBtn.innerText = "Edit";
            taskInput.setAttribute("readonly", "readonly");
        }
    });

    deleteBtn.addEventListener('click', (e) => {
        listElemets.removeChild(taskElement);
    });
})