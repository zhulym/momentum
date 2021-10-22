export const todoBtn = document.querySelector('.todo__btn');
export const closeTodo = document.querySelector('.close-todo');
export const todoContent = document.querySelector('.todo__content');
export const addTodoBtn = document.querySelector('.todo__label');
const inputTodo = document.querySelector('.input__todo');
const todoListContainer = document.querySelector('.todo-list');
const todoDelete = document.getElementsByClassName('todo__delete');
// const todoCheck = document.getElementsByClassName('todo__check');

let todoData = [];
let appSettings = JSON.parse(localStorage.getItem('momentum'));

export function openTodo() {
  todoContent.classList.toggle('active__todo');
  todoBtn.classList.toggle('hide__todo-btn');
}

export function addTodo() {
  if (!inputTodo.value) return;
  todoData.push(inputTodo.value);
  saveTodoList();
  inputTodo.value = '';
}

export function deleteTodo(e) {
  let currentId = Number(e.target.parentNode.firstElementChild.textContent);
  if (e.target.className === 'todo__delete') {
    todoData = todoData.filter((el, i) => i + 1 !== currentId);
    renderTodoList();
    saveTodoList();
  }
}

export function renderTodoList() {
  todoListContainer.innerHTML = null;
  todoData.map((el, i) => {
    todoListContainer.insertAdjacentHTML('beforeend', `<p class="list-item">
    <span>${i + 1}</span>. <input class="todo__check" type="checkbox"/> ${el} <button class="todo__delete" type="button">${appSettings?.lang === 'EN' ? 'Delete' : 'Удалить'}</button></p>`);
  })
}

export function getTodoData() {
  todoData = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
  renderTodoList();
}

function saveTodoList() {
  let data = JSON.stringify(todoData);
  localStorage.setItem('todo', data);
}

export function completeTodo(e) {
  if (e.target.type === 'checkbox') {
    if (!e.target.checked) {
      e.target.parentNode.style.textDecoration = "none";
      e.target.parentNode.style.color = "#ffffff";
    } else {
      e.target.parentNode.style.textDecoration = "line-through";
      e.target.parentNode.style.color = "#ffffff7e";
    }
    console.dir(e.target)
  }
}