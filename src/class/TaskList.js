import Task from "./Task";

class TaskList {

    #tasks;

    constructor() {
        this.#tasks = [];
        this.loadTasksFromLocalStorage();
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(job) {
        this.#tasks.push(job);
    }

    removeTask(taskId) {
        this.#tasks = this.#tasks.filter(task => task.id !== taskId);
    }

    getTaskById(taskId) {
        return this.#tasks.find(task => task.id === taskId);
    }

    getTasksByCategory(categoryId) {
        return this.#tasks.filter(task => task.category.id === categoryId);
    }

    loadTasksFromLocalStorage() {
        if (localStorage.getItem("tasks") !== null) {
            let tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
            tasksFromLocalStorage.forEach((task) => {
                let fechaISO = task.date;
                let fecha = new Date(fechaISO);
                let newTask = new Task(task.id, task.title, task.description, task.category, task.completed, fecha);
                this.addTask(newTask);
                this.renderTasks();
            });
        }
    }

    renderTasks(filterCategoryId = 'all') {
        let tasksDiv = document.getElementById("tasks-display");
        let divRight = document.getElementsByClassName("tasks__header-right")[0];
        tasksDiv.innerHTML = '';
        if (this.#tasks.length > 0) {
            divRight.style.display = 'block';
        } else {
            divRight.style.display = 'none';
        }
        this.#tasks.map((task) => {
            // crear contenedor de tarea
            let taskContainer = document.createElement("div");
            taskContainer.classList.add("tasks__single", task.completed ? "complete" : "incomplete");
            if (filterCategoryId !== 'all' && task.category.id !== filterCategoryId) {
                taskContainer.style.filter = 'blur(3px)';
            } else {
                taskContainer.style.filter = 'none';
            }
            // crear título de tarea
            let tituloTarea = document.createElement("h3");
            tituloTarea.textContent = task.title;
            // crear descripción de tarea
            let pDescription = document.createElement("p");
            pDescription.classList.add("tasks__desc");
            let taskDescription = document.createTextNode(task.description);
            pDescription.appendChild(taskDescription);
            // crear categoría de tarea
            let pCategory = document.createElement("p");
            pCategory.classList.add("tasks__category");
            let category = document.createTextNode(task.category.name);
            pCategory.appendChild(category);
            // crear estado de la tarea
            let pState = document.createElement("p");
            pState.classList.add("tasks__state");
            let taskState = task.completed ? "completada" : "pendiente";
            pState.textContent = taskState;
            // crear fecha y hota de tarea
            let pDate = document.createElement("p");
            pDate.classList.add("tasks__date");
            let taskDate = task.date;
            pDate.textContent = taskDate.toLocaleString();
            // crear contenedor para botones inferiores
            let taskBottom = document.createElement("div");
            taskBottom.classList.add("tasks__bottom");
            // crear botón de tarea completada
            let completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            completedButton.setAttribute("title", "completar");
            completedButton.addEventListener("click", () => {
                task.toggleComplete();
                this.renderTasks();
            });
            taskBottom.appendChild(completedButton);
            // crear botón de borrar tarea
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteButton.setAttribute("title", "eliminar");
            deleteButton.addEventListener("click", () => {
                this.removeTask(task.id);
                this.renderTasks();
                this.tasksToLocalStorage();
            });
            taskBottom.appendChild(deleteButton);

            taskContainer.appendChild(tituloTarea);
            taskContainer.appendChild(pDescription);
            taskContainer.appendChild(pCategory);
            taskContainer.appendChild(pState);
            taskContainer.appendChild(pDate);
            taskContainer.appendChild(taskBottom);
            tasksDiv.appendChild(taskContainer);
        });
        this.tasksToLocalStorage();
    }

    tasksToLocalStorage() {
        let tasksToLocalStorage = this.#tasks.map((it) => {
            return {
                id: it.id,
                title: it.title,
                description: it.description,
                category: {
                    id: it.category.id,
                    name: it.category.name
                },
                completed: it.completed,
                date: it.date
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasksToLocalStorage));
    }

}

export default TaskList;