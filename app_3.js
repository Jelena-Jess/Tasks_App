//LESSON 35
//PERSIST DATA TO LOCAL STORAGE


//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');


//Load all event listeners
loadEventListeners();

//Load all event listeners function
function loadEventListeners(){

//DOM load event (showing events from LS to DOM)
document.addEventListener('DOMContentLoaded', getTasks);
//DOMContentLoaded event listener is called right after the DOM has been loaded

//Add task event
form.addEventListener('submit', addTask);

//Remove task event
taskList.addEventListener('click', removeTask);

//Clear tasks button
clearBtn.addEventListener('click', clearTasks);

//Filter tasks
filter.addEventListener('keyup', filterTasks)
}

//addTask function
function addTask(e){ 
if(taskInput.value === '') {
  alert('Add a task');
}else{
const li = document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(taskInput.value));
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);
taskList.appendChild(li);

//Store in local storage
storeTaskInLocalStorage(taskInput.value);
}
taskInput.value = '';
e.preventDefault();
}


//removeTask function
function removeTask(e){
  //we want to target only the parent of the x mark, which is <a>
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
   e.target.parentElement.parentElement.remove(); // we get to <li>

   //REMOVE from LS
   removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


//CLEAR TASKS BUTTON - so that all the tasks go away
function clearTasks(){
  // one way of doing it:
  //taskList.innerHTML = ''; 

  //another (faster) way - while loop:
  while(taskList.firstChild){ // if there is still sth in the list
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from LS
  clearTasksFromLocalStorage();
}


//filterTasks function:
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}



//LOCAL STORAGE SECTION

//StoreTaskInLocalStorage function:
function storeTaskInLocalStorage(task){
  let tasks;
  //checking local storage to see if there are any tasks in there:
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //adding to the array:
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Get Tasks from LocalStorage - creating DOM element in the browser
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}


//Function removeTaskFromLocalStorage:
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){ //textContent is the actual text of the task
      tasks.splice(index, 1); // delete 1 from the index
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Function clearTasksFromLocalStorage:
function clearTasksFromLocalStorage(){
  localStorage.clear();
}