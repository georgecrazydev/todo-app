const form = document.getElementById('form');
const input = document.querySelector('.todo__input');
const button = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo-list');

const allTodo = JSON.parse(localStorage.getItem('allItems'));
if (allTodo) {
  allTodo.forEach(todoItem => {
    addTodo(todoItem);
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

function addTodo(todoItem) {
  let todoText = input.value;
  if (todoItem) {
    todoText = todoItem.text;
  }

  if (todoText) {
    // !Item
    let item = document.createElement('li');
    item.classList.add('todo-list__item');
    if (todoItem && todoItem.completed) {
      item.classList.add('todo-list__item--completed');
    }
    // !Text
    let text = document.createElement('p');
    text.classList.add('todo-list__text');
    text.innerText = todoText;
    item.appendChild(text);
    // !Completed
    let completed = document.createElement('button');
    completed.classList.add('todo-list__completed');
    completed.innerHTML = '<i class="fas fa-check"></i>';
    item.appendChild(completed);
    completed.addEventListener('click', () => {
      item.classList.toggle('todo-list__item--completed');
      saveLS();
    })
    // !Remove
    let remove = document.createElement('button');
    remove.innerHTML = '<i class="fas fa-trash"></i>';
    remove.classList.add('todo-list__remove');
    item.appendChild(remove);
    todoList.appendChild(item);
    input.value = '';
    remove.addEventListener('click', () => {
      item.remove();
      saveLS();
    })
    saveLS();
  }
}

function saveLS() {
  let allItems = document.querySelectorAll('.todo-list__item');

  let obj = [];

  allItems.forEach((item) =>
    obj.push({
      text: item.children[0].innerText,
      completed: item.classList.contains('todo-list__item--completed'),
    })
  )

  localStorage.setItem('allItems', JSON.stringify(obj));
}