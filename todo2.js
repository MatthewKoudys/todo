const todoForm = document.forms["todoForm"];
const list = document.getElementById('todoList');

// Load items from local storage if available
const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
for (const item of storedItems) {
  addTodoItem(item);
}

// Add event listener to form submission
todoForm.addEventListener('submit', addToDo);

// Function to add a new item to the todo list
function addToDo(evt) {
  evt.preventDefault();
  let toDoText = todoForm.elements["todoText"].value;
  addTodoItem(toDoText);
  todoForm.reset();
  updateLocalStorage();
}

// Add event listener for removing items
list.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('remove')) {
    e.target.parentElement.remove();
    updateLocalStorage();
  }
});

// Add a new item to the todo list
function addTodoItem(text) {
  const listItem = document.createElement('li');
  listItem.classList.add('todo');
  listItem.innerHTML = `${text} <button type="button" class="remove">Remove</button>`;
  list.appendChild(listItem);
}

// Update local storage with current list items
function updateLocalStorage() {
  const items = Array.from(list.querySelectorAll('.todo')).map(item => item.textContent.replace(' Remove', '').trim());
  localStorage.setItem('todoItems', JSON.stringify(items));
}
