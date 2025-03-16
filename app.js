const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todoInput');
const todoListUl = document.getElementById('toDoList');

let allTodo = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
  e.preventDefault();

  addTodo();
})

function addTodo(){
  const todoText = todoInput.value.trim();
  
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false
    }

    allTodo.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList(){
  todoListUl.innerHTML = "";
  allTodo.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUl.append(todoItem);
  })
}

function createTodoItem(todo, todoIndex){
  const todoId = "todo-"+todoIndex;
  const todoLi = document.createElement('li');
  const todoText = todo.text;
  
  todoLi.className = 'toDo';
  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label for="${todoId}" class="customCheckbox">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="${todoId}" class="toDoDesc">${todoText}</label>
    <button class="deleteButton">
      <svg fill="var(--accentColor)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
  `

  const deleteButton = todoLi.querySelector(".deleteButton");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  })

  const checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodo[todoIndex].completed = checkbox.checked;
    saveTodos();
  })
  checkbox.checked = todo.completed;
  return todoLi;
}

function deleteTodoItem(todoIndex){
  allTodo = allTodo.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodo);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "";
  return JSON.parse(todos);
}