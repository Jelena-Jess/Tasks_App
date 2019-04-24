//LESSON 33
//TASK LIST PART 1 - UI - ADD TASK ITEMS

/*
EXTERNAL SCRIPTS IN UI:
- materializecss.com - press "Get started", copy <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> and <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  from CDN 

- Materialize needs jQuery as the dependency: code.jquery.com - press Version 3 uncompressed and copy <script src="https://code.jquery.com/jquery-3.3.1.js"
integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script> and put it above Materialize

-www.bootstrapcdn.com/fontawesome and copy <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"> from HTML 
*/


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
}


//addTask function
function addTask(e){ //event object
if(taskInput.value === '') {
  alert('Add a task');
}else{

//Create <li> element
const li = document.createElement('li');

//Add class 'collection-item' bc in materialize each <li> should have it
li.className = 'collection-item';

//Create text node and append to <li>
li.appendChild(document.createTextNode(taskInput.value));



//Create new link element <a> - the icon 'x'
const link = document.createElement('a');

//Add class
link.className = 'delete-item secondary-content';

//Add icon html - the 'x' mark icon
link.innerHTML = '<i class="fa fa-remove"></i>';



//Append <a> to <li>
li.appendChild(link);

//Append <li> to <ul>
taskList.appendChild(li);

}
//Clear input
taskInput.value = '';

e.preventDefault();

}




