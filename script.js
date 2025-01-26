const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const addButton = document.getElementById('addButton');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveEditButton = document.getElementById('saveEdit');
const closeModalButton = document.querySelector('.close');

let editTodoEl = null;

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

addButton.addEventListener('click', () => {
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        // Create the text and delete button
        const todoTextEl = document.createElement('span');
        todoTextEl.innerText = todoText;
        todoEl.appendChild(todoTextEl);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'x';
        deleteButton.classList.add('delete-button');
        todoEl.appendChild(deleteButton);

        todoTextEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        deleteButton.addEventListener('click', () => {
            todoEl.remove();
            updateLS();
        });

        todoEl.addEventListener('dblclick', () => {
            editModal.style.display = 'block';
            editInput.value = todoTextEl.innerText;
            editTodoEl = todoTextEl;
        });

        todosUL.appendChild(todoEl);
        input.value = '';

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        const todoTextEl = todoEl.querySelector('span');
        todos.push({
            text: todoTextEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

saveEditButton.addEventListener('click', () => {
    if (editTodoEl) {
        editTodoEl.innerText = editInput.value;
        updateLS();
        editModal.style.display = 'none';
    }
});

closeModalButton.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
});