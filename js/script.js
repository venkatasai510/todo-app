let form = document.getElementById('todoForm');
let input = document.getElementById('enterTask');
let listElemets = document.getElementById('task');

let task ;
let inputData;
    if(window.localStorage.getItem('list')){
        inputData = window.localStorage.getItem('list');
    }
    console.log(inputData);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    task = input.value;
    window.localStorage.setItem('list', task);

    if(!task) {
        alert('please enter task');
        return
    }
    
    let taskElement = document.createElement("div");
    taskElement.classList.add('tasks');

    let taskContent = document.createElement("div");
    taskContent.classList.add('todoList');

    let taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.classList.add("check");

    taskCheck.addEventListener('change', (e) => {
        e.preventDefault();
        if(taskCheck.checked == true){
            taskInput.setAttribute("disabled", "true");
        }else{
            taskInput.removeAttribute("disabled");
        }
    });

    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.setAttribute("readonly", "readonly");
    taskInput.classList.add("text");
    taskInput.value = inputData;

    taskContent.appendChild(taskCheck);
    taskContent.appendChild(taskInput);
    taskElement.appendChild(taskContent);


    let actionBtns = document.createElement("div");
    actionBtns.classList.add('todoActions');

    let editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = "Edit";

    let deleteBtn = document.createElement('button');
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

});