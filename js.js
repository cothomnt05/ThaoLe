// tao 1 array rong chua cac task
let todos = [];


// lay list todo elements
let listTodoEle = document.getElementById('todo-list');
load()

// ham tao todo
function addTodo(title) {
  const todo = {
    id: Date.now(),
    title,
    isCompleted: false,
  };
  // them 1 todo vao array
  todos.push(todo);  
  render()
  load()
}

function render() {
  listTodoEle.innerHTML = ''
  todos.forEach(todo => renderTodo(todo))
}


function renderTodo(todo) {  
  // Tạo một node mới
  const todoNode = document.createElement("li");
  const isCompletedClass = todo.isCompleted ? 'completed': '';
  if(todo.isCompleted){
    todoNode.setAttribute('class',`list-group-item todo-item list-group-item-success ${isCompletedClass}`)
  } else {
    todoNode.setAttribute('class', `list-group-item todo-item list-group-item-danger ${isCompletedClass}`)
  }
  
  todoNode.setAttribute('data-key', todo.id);
  todoNode.innerHTML = `
    <input id="${todo.id}" type="checkbox" class="todo-checkbox ms-2" ${todo.isCompleted?'checked':''}>
    <span class="todo-title">${todo.title}</span>
    <button type="button" class="close" aria-label="Close">
  		<span aria-hidden="true" class="todo-delete">&times;</span>
		</button>
  `;
  
  listTodoEle.append(todoNode);
  save();
}
// luu todos vào localStorage
function save() {
  localStorage.setItem('todolist', JSON.stringify(todos))
}

// khi load lại trang thì lấy dữ liệu array todos từ localStorage đã lưu trữ
function load() {
  todos = JSON.parse(localStorage.getItem('todolist') || '[]')
   

  render()
  console.log(todos)
}

// tao chuc nang hoan thanh task
function toggleComplete(todoId){
  const index = todos.findIndex(todo => todo.id == Number(todoId));  

  if(todos[index].isCompleted){
    todos[index].isCompleted = false;
  } else {
    todos[index].isCompleted = true;
  }

  render();
  load()
}

//xoa task
function deleteTodo(todoId){
  const todoEle = document.querySelector(`[data-key = "${todoId}"]`);
  todoEle.remove();
  todos = todos.filter(todo => todo.id != Number(todoId));
  save();
  load();

}

listTodoEle.addEventListener('click', event => {
  if(event.target.classList.contains('todo-checkbox')){
    const todoId = event.target.parentElement.dataset.key;    
    
    toggleComplete(todoId);
  }

  if(event.target.classList.contains('todo-delete')){
    const todoId = event.target.parentElement.parentElement.dataset.key;

    deleteTodo(todoId);
  }
})

// lay element cua form
const formEle = document.getElementById('todoForm');
formEle.addEventListener('submit', event => {
  event.preventDefault(); 
  const input = document.getElementById('todoInput');
  const title = input.value.trim();
  if (title !== '') {
    addTodo(title);
    input.value = '';
    input.focus();
  }
});