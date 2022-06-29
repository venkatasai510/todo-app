let form = document.getElementById('todoForm');
let input = document.getElementById('enterTask');
let listElemets = document.getElementById('task');
let submit = document.getElementById('submit');

let task = [];
let inputData;
    if(window.localStorage.getItem('list')){
        inputData = JSON.parse(window.localStorage.getItem('list'));
        genUI()
    }
    console.log(inputData);



submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    task.push(input.value);
    window.localStorage.setItem('list', JSON.stringify(task));

    if(localStorage.getItem('list')){
        inputData = JSON.parse(window.localStorage.getItem('list'));
    }
    genUI();
});
// console.log(task);
function genUI(){
    task = [...inputData];
    document.getElementById("task").innerHTML="";
    inputData.forEach(function(s, i){
    var parentElement = document.createElement("div");
    parentElement.classList.add('tasks')

    var dataStructure = document.createElement("div");
    dataStructure.classList.add('todoList');

    var checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.classList.add("check");
    checkInput.addEventListener('change', (e) => {
        e.preventDefault();
        if(checkInput.checked == true){
            inputData.setAttribute("disabled", "true");
        }else{
            inputData.removeAttribute("disabled");
        }
    })

    var inputData = document.createElement("input");
    inputData.type = "text";
    inputData.setAttribute("readonly", "readonly");
    inputData.classList.add("text");
    inputData.value = s;

    var buttons = document.createElement("div");
    buttons.classList.add("todoActions");
    parentElement.appendChild(dataStructure);

    var editBtn = document.createElement("button");
    editBtn.classList.add('edit');
    editBtn.innerText = "Edit";
    editBtn.addEventListener('click', (e) => {  
        e.preventDefault();
        if(editBtn.innerText == "Edit") {
            inputData.removeAttribute("readonly");
            inputData.focus();
            editBtn.innerText = "Save";
        }else{
            editBtn.innerText = "Edit";
            inputData.setAttribute("readonly", "readonly");
        }
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener('click', (e) => {
        deleteFn(i);
    })

    //adding inputs to the todoList class div
    dataStructure.appendChild(checkInput);
    dataStructure.appendChild(inputData);

    //adding inputs to the todoList class div
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    //Adding two divs to the parent div
    parentElement.appendChild(dataStructure);
    parentElement.appendChild(buttons);

    document.getElementById("task").appendChild(parentElement);

    input.value = '';
    });
}

function deleteFn(i) {
    let latestInputData=[...inputData];
    latestInputData.splice(i, 1);
    window.localStorage.setItem('list', JSON.stringify(latestInputData));
    inputData = JSON.parse(window.localStorage.getItem('list'));

    genUI()
    console.log(i)
}
