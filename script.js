const form = document.querySelector('#form');
const input = document.querySelector('#input');
const todoUL = document.querySelector('#todos');
const todos = JSON.parse(localStorage.getItem('todos'));
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveEditButton = document.getElementById('saveEdit');
const addBtn = document.querySelector('#addButton');
let currentEditEl = null;

if(todos){
    todos.forEach(todo => addToDo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(input.value.trim() !== ""){
        addToDo();
    }
});

function addToDo(todo){
    let toDoText = input.value;

    if(todo){
        toDoText = todo.text;
    }

    if(toDoText){
        const toDoEl = document.createElement('li');
        toDoEl.classList.add('todo-item');

        if(todo && todo.completed) {
            toDoEl.classList.add('completed');
        }

        const span = document.createElement('span');
        span.innerText = toDoText;
        span.addEventListener('click', () => {
            toDoEl.classList.toggle('completed');
            updateLS();
        });

        const cross = document.createElement('span');
        cross.innerHTML = '&times;';
        cross.classList.add('cross');
        cross.addEventListener('click', () => {
            toDoEl.remove();
            updateLS();
        });

        span.addEventListener('dblclick', () => {
            currentEditEl = span;
            editInput.value = span.innerText;
            editModal.style.display = 'block';
        });

        toDoEl.appendChild(span);
        toDoEl.appendChild(cross);
        todoUL.appendChild(toDoEl);
        input.value = '';
        updateLS();
    }
}

function updateLS(){
    const todosEl = document.querySelectorAll('.todo-item span');
    const todos = [];
    todosEl.forEach(toDoEl => {
        todos.push({
            text: toDoEl.innerText,
            completed: toDoEl.parentElement.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Modal close event
document.querySelector('.modal .close').addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Save edit
saveEditButton.addEventListener('click', () => {
    if (currentEditEl) {
        currentEditEl.innerText = editInput.value;
        updateLS();
        editModal.style.display = 'none';
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
});