// Define UI variables

const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-todos");
const filter = document.querySelector("#filter");
const todoInput = document.querySelector("#todo");

// Load all event listenrs
loadEventListeners();

function loadEventListeners() {
  // Dom Load event
  document.addEventListener("DOMContentLoaded", getTodos);
  // Add todo event
  form.addEventListener("submit", addTodo);
  // Remove todo
  todoList.addEventListener("click", removeTodo);
  // Clear todo Event
  clearBtn.addEventListener("click", clearTodo);
  // Filter t eveodont
  filter.addEventListener("keyup", filterTodos);
}

// get Todos from local storage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo) {
    // create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(todo));
    // Create new link element
    const link = document.createElement("a");
    //Add Class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    todoList.appendChild(li);
  });
}

// Add Todo
function addTodo(e) {
  if (todoInput.value === "") {
    alert("Add a todo");
  }

  // create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(todoInput.value));
  // Create new link element
  const link = document.createElement("a");
  //Add Class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  todoList.appendChild(li);

  // store in LS
  storeTodoInLocalStorage(todoInput.value);

  // Clear input
  todoInput.value = "";

  e.preventDefault();
}

// Store Todo
function storeTodoInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// REMOVE Todo
function removeTodo(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      e.target.parentElement.parentElement.remove();

      //REMOVE From local storage
      removeTodoFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE From local storage
function removeTodoFromLocalStorage(todoItem){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo, index){
    if(todoItem.textContent === todo){
      todos.splice(index,1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear Todo
function clearTodo() {
  // todokList.innerHTML = '';

  //Faster
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  //Clear from LS
  clearTodosFromLocalStorage();
}

//Clear Todos from Local Storage
function clearTodosFromLocalStorage(){
  localStorage.clear();
}

// Filter Todos
function filterTodos(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(todo) {
    const item = todo.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}
