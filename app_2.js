//LESSON 34
//TASK LIST PART 2 - DELETE and FILTER TASKS
//Since all of these <li> have class 'delete-item', and they are dynamic -  meaning we can add more of them - we need to use EVENT DELEGATION
//We will put the event listener onto the task list itself - on the <ul>


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
  //check out: https://jsperf.com/innerhtml-vs-removechild
}


//filterTasks function:
function filterTasks(e) {
  //getting whatever is typed in and turn it to lower case:
  const text = e.target.value.toLowerCase();
  
  //take all the list items and loop through them with forEach
  //querySelectorAll returns a node list, so we can use forEach
  //if we used getElementsByClassName thet would return an HTML collection which we would have to convert to an array in order to use forEach

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    //if there is no match it will return -1
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}