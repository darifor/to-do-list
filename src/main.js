import '../sass/style.scss';
import Category from './class/Category';
import CategoryList from './class/CategoryList';
import Task from './class/Task';
import TaskList from './class/TaskList';

// sección categorías
let categoryForm = document.getElementById("category-form");
let categoryNameInput = document.getElementById("category-name");
let catList = new CategoryList();

categoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let categoryId = Date.now().toString();
    let categoryName = categoryNameInput.value.trim().toLowerCase();

    if (!catList.categories.some(cat => cat.name === categoryName)) {
        let category = new Category(categoryId, categoryName);
        catList.addCategory(category);
        catList.renderCategories();
    } else {
        alert("La categoría ya existe.");
    }

    categoryForm.reset();
})

// sección tareas
let addTaskButton = document.getElementById("add_task");
let taskPopup = document.getElementById("task_popup");
let closePopup = document.getElementById("close_popup");
let taskForm = document.getElementById("task-form");
let taskTitleInput = document.getElementById("task-title");
let taskDescTextarea = document.getElementById("task-description");
let taskCategorySelect = document.getElementById("task-category");
let taskList = new TaskList();

addTaskButton.addEventListener("click", () => {
    taskPopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
    taskPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === taskPopup) {
        taskPopup.style.display = "none";
    }
});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let taskId = Date.now().toString();
    let taskTitle = taskTitleInput.value;
    let taskDescription = taskDescTextarea.value;
    let taskCategoryId = taskCategorySelect.value;
    let taskCategory = catList.getCategoryById(taskCategoryId);
    let lastTask = new Task(taskId, taskTitle, taskDescription, taskCategory);
    taskList.addTask(lastTask);
    taskList.renderTasks();
    console.dir(lastTask);
    taskForm.reset();
    taskPopup.style.display = "none";
});

// selector de tareas por categoría
let taskByCatForm = document.getElementById("tasks-by-category");
let selectCatTask = document.getElementById("cat-task");
let resetButton = document.getElementById("resetButton");

taskByCatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let selectedCategoryId = selectCatTask.value;
    taskList.renderTasks(selectedCategoryId);
    taskByCatForm.reset();
})

resetButton.addEventListener("click", () => {
    taskList.renderTasks();
})