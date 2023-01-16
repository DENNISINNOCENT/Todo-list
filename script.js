//All references.
const textinput =document.querySelector("input")
const section = document.querySelector("section")
const clearBtn = document.querySelector("button")
const todoMainContainer = document.querySelector(".todo-container")

class MyObject{
    constructor(description,completed,index){
        this.description = description
        this.completed = completed
        this.index = index
    }
}
 const myArray =[];

 const addTodo = (todoValue) => {
    const todoContainer = document.createElement("div")
    todoContainer.className ="todoContainer"
    todoContainer.innerHTML += `
    <input type = "checkbox" class ="checkbox">
    <span>${todoValue}</span>
    <span class ="edit">Edit</span>
    <span class ="delete">Delete</span>

    `;
    todoMainContainer.appendChild(todoContainer);


    const checkbox =document.querySelectorAll(".checkbox")
    checkbox.forEach( i=> {
        i.addEventListener("click",() =>{
            i.parentElement.classList.toggle("checkedContainer")
            i.nextElementSibling.classList.toggle("checkTodo")
            i.parentElement.lastElementChild.classList.toggle('delete-active')
            i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable')
            updateLocal(); 
        })
    })
    //pushing data to the local storage
    const object = new MyObject(todoValue,false,checkbox.length-1)
    myArray.push(object)
    localStorage.setItem('list',JSON.stringify(myArray));
    //select edit 
    const edit = document.querySelectorAll('.edit')
    edit.forEach( i => {
        i.addEventListener("click", () =>{
        editTodo(todoContainer,i.previousElementSibling)
    })
    }) 
    const deleteIcon = document.querySelectorAll(".delete")
    deleteIcon.forEach(i => {
        i.addEventListener("click",() =>
        {
            deleteTodo(i.parentElement)
        })
    })
 };

 //edit function.
 const editTodo = (todoContainer,todo) => {
    const editInput =document.createElement('input');
    editInput.type = "text";
    editInput.className = "editInput";
    editInput.value = todo.textContent;
    todoContainer.replaceChild(editInput,todo);
    editInput.addEventListener('keypress', e =>{
        if( e.key === "Enter"){
            const todoContainers =document.querySelectorAll(".todoContainer");
            const localData = JSON.parse(localStorage.getItem("list"));
            for (i = 0; i < todoContainers.length; i ++){
               if( todoContainers[i].classList.contains('checkContainer')){
                localData.description = editInput.value
                localStorage.setItem("list",JSON.stringify(localData))
               }
            }
            editInput.parentElement.classList.remove('checkedContainer')
            todoContainer.replaceChild(todo,editInput)
            todo.textContent =editInput.value

        }
    })
 }
 //delete todos
 const deleteTodo = (todo) => {
    todoMainContainer.removeChild(todo)
    let count = 0
    const localData = JSON.parse(localStorage.getItem("list"))
    const data = Array.from(localData).filter(i => i.completed === false)
    data.map(i => i.index = count += 1)
    localStorage.setItem("list",JSON.stringify(data));
 }
textinput.addEventListener("keypress", e => {
    if(e.key === 'Enter' && textinput.value){
        
        addTodo(textinput.value);
        textinput.value = null;
    }
    
    
});
const getFromLocal = () => {
    const data = JSON.parse(localStorage.getItem("list"))
    data.map(i => {
        myArray.push(i);
        const todoContainer = document.createElement("div")
    todoContainer.className ="todoContainer"
    todoContainer.innerHTML += `
    <input type = "checkbox" class ="checkbox">
    <span>${i.description}</span>
    <span class ="edit">Edit</span>
    <span class ="delete">Delete</span>

    `;
    todoMainContainer.appendChild(todoContainer);

    const edit = document.querySelectorAll('.edit')
    edit.forEach( i => {
        i.addEventListener("click", () =>{
        editTodo(todoContainer,i.previousElementSibling)
    })
    }) ;
    const checkbox =document.querySelectorAll(".checkbox")
    checkbox.forEach( i=> {
        i.addEventListener("click",() =>{
            i.parentElement.classList.toggle("checkedContainer")
            i.nextElementSibling.classList.toggle("checkTodo")
            i.parentElement.lastElementChild.classList.toggle('delete-active')
            i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable')
            updateLocal();
        })
        
    });
    const deleteIcon = document.querySelectorAll(".delete")
    deleteIcon.forEach(i => {
        i.addEventListener("click",() =>
        {
            deleteTodo(i.parentElement)
        })
    });
        

    })
    localStorage.setItem("list",JSON.stringify(myArray))
}
window.addEventListener("load",getFromLocal)

const updateLocal = () =>{
    const localData = JSON.parse(localStorage.getItem("list"))
    const todos = document.querySelectorAll("span")
    for(let i = 0;i < todos.length; i += 1){
        if(todos[i].classList.contains("checkTodo")){
            localData[i].completed = true; 
        }
        else {
            localData[i].completed = false;
        }
    }
    localStorage.setItem("list", JSON.stringify(localData))
}
const clearAll = () =>{
    const localData = JSON.parse(localStorage.getItem("list"))
    const todoContainer = document.querySelectorAll(".todoContainer")
    todoContainer.forEach( i =>{
        if(i.classList.contains("checkedContainer")){
            deleteTodo(i)
        }
    })
    let count = 0
    const data = Array.from(localData).filter( i => i.completed === false)
    data.map(i => i.index = count += 1)
    localStorage.setItem("list",JSON.stringify(data) )
}
clearBtn.addEventListener("click",clearAll)