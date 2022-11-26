const taskForm = document.getElementById('task-form');
let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(taskForm);
    const titleTask = form.get('title');
    const descriptionTask = form.get('description');

    // Creo un objeto literal con cada tarea
    const task = {
        title: titleTask,
        description: descriptionTask
    };

    createTask(task);
});

const createTask = (task) => {
    const taskList = document.getElementById("task-list");
    const div = document.createElement("div");
    tasks.push(task);

    div.innerHTML += `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Título</strong>: ${task.title} -
                <strong>Descripción</strong>: ${task.description}
                <button href="#" class="btn btn-danger" id="${task.title}" name="delete" value="${task.title}">Delete</button>
            </div>
        </div>
    `;
    taskList.appendChild(div);

    // Vaciamos el formulario con el método reset()
    taskForm.reset();

    // Guardamos las tareas en el localStorage
    saveTaskStorage(tasks);

    // Escuchamos si el usuario hace click en el botón eliminar
    taskList.addEventListener('click', (e) => {
        deleteTask(e.target.value);
    });
};

const deleteTask = (title) => {
    tasks.forEach((task, index) => {
        if (task.title === title) {
            tasks.splice(index, 1);
        }
    });
    showTasks(tasks);
    saveTaskStorage(tasks);
};

const saveTaskStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskStorage = () => {
    const taskStorage = JSON.parse(localStorage.getItem('tasks'));
    return taskStorage;
};

// Esta función recibe un array de objetos
const showTasks = (tasks) => {
    const taskList = document.getElementById("task-list");
    const div = document.createElement("div");

    // Limpiamos el contenedor de las tareas
    taskList.innerHTML = '';

    tasks.forEach(task => {
        div.innerHTML += `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Título</strong>: ${task.title} -
                    <strong>Descripción</strong>: ${task.description}
                    <button href="#" class="btn btn-danger" id="${task.title}" name="delete" value="${task.title}">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(div);
    });

    // Escuchamos si el usuario hace click en el botón eliminar
    taskList.addEventListener('click', (e) => {
        deleteTask(e.target.value);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasks')) {
        tasks = getTaskStorage();
        showTasks(tasks);
    };
});
