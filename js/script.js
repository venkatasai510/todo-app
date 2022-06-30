let form = document.getElementById('todoForm');
let input = document.getElementById('enterTask');
let listElemets = document.getElementById('task');
let submit = document.getElementById('submit');
var inputChangingValue;

let task = [];
let inputData;
    if(window.localStorage.getItem('list')){
        inputData = JSON.parse(window.localStorage.getItem('list'));
        genUI()
    }

submit.addEventListener('click', (e) => {
    e.preventDefault();

    if(!input.value) {
        alert('please enter task');
        return
    }
    
    task.push(input.value);
    window.localStorage.setItem('list', JSON.stringify(task));

    if(localStorage.getItem('list')){
        inputData = JSON.parse(window.localStorage.getItem('list'));
    }
    genUI();
});
function genUI(){
    task = [...inputData];
    document.getElementById("task").innerHTML="";
    inputData.forEach(function(s, i){
    let parentElement = document.createElement("div");
    parentElement.classList.add('tasks')

    let dataStructure = document.createElement("div");
    dataStructure.classList.add('todoList');

    let checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.classList.add("check");
    checkInput.addEventListener('change', (e) => {
        e.preventDefault();
        if(checkInput.checked == true){
            createNewInput.setAttribute("disabled", "true");
        }else{
            createNewInput.removeAttribute("disabled");
        }
    })

    let createNewInput = document.createElement("input");
    createNewInput.type = "text";
    createNewInput.setAttribute("readonly", "readonly");
    createNewInput.classList.add("text");
    createNewInput.value = s;
    createNewInput.addEventListener('keyup', (event) => {
        event.preventDefault();
        inputChangingValue = event.target.value;
    });

    let buttons = document.createElement("div");
    buttons.classList.add("todoActions");
    parentElement.appendChild(dataStructure);

    let editBtn = document.createElement("button");
    editBtn.classList.add('edit');
    editBtn.innerText = "Edit";
    editBtn.addEventListener('click', (e) => {  
        if(editBtn.innerText == "Edit") {
            createNewInput.removeAttribute("readonly");
            createNewInput.focus();
            editBtn.innerText = "Save";

            inputData.map((val,ind)=>{
                if(i===ind){
                    V=val;
                }
              
            })
        }else{
            editBtn.innerText = "Edit";
            createNewInput.setAttribute("readonly", "readonly");
            handleSave(i);
        }
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener('click', (e) => {
        deleteFn(i);
    })

    //adding inputs to the todoList class div
    dataStructure.appendChild(checkInput);
    dataStructure.appendChild(createNewInput);

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


function handleSave(index){
    
    let temp=inputData && inputData.map((val,ind)=>{
        if(index===ind){
            
            val=inputChangingValue;
        }
        return val;
    })
    console.log(temp)
    window.localStorage.setItem("list",JSON.stringify(temp))
    inputData=JSON.parse(window.localStorage.getItem("list"))
    genUI();
}

function deleteFn(i) {
    let latestInputData=[...inputData];
    latestInputData.splice(i, 1);
    window.localStorage.setItem('list', JSON.stringify(latestInputData));
    inputData = JSON.parse(window.localStorage.getItem('list'));

    genUI();
}
