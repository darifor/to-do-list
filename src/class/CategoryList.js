import Category from "./Category";

class CategoryList {

    #categories;

    constructor() {
        this.#categories = [];
        this.loadCategoriesFromLocalStorage();
    }

    get categories() {
        return this.#categories;
    }

    getCategoryById(categoryId) {
        return this.#categories.find(category => category.id === categoryId);
    }

    addCategory(category) {
        this.categories.push(category);
    }

    loadCategoriesFromLocalStorage() {
        if (localStorage.getItem("categories") !== null) {
            let categoriesFromLocalStorage = JSON.parse(localStorage.getItem("categories"));
            categoriesFromLocalStorage.forEach((cat) => {
                let newCat = new Category(cat.catId, cat.name);
                this.addCategory(newCat);
                this.renderCategories();
            });
        }
    }

    renderCategories() {
        let categoriesList = document.getElementById('categories-list');
        let taskCategorySelect = document.getElementById("task-category");
        let taskByCatSelect = document.getElementById("cat-task");
        categoriesList.innerHTML = '';
        taskCategorySelect.innerHTML = '<option value="">--</option>';
        taskByCatSelect.innerHTML = '<option value="">--</option>';

        // añadimos categoría a la lista de categorías
        this.#categories.forEach((category, index) => {
            let newLi = document.createElement("li");
            newLi.textContent = category.name;

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteButton.classList.add("categories__button");
            deleteButton.setAttribute("title", "eliminar");
            deleteButton.addEventListener("click", () => {
                this.#categories.splice(index, 1);
                this.renderCategories();
                this.categoriesToLocalStorage();
            });

            newLi.appendChild(deleteButton);
            categoriesList.appendChild(newLi);

            // añadimos categoría al select del formulario de tareas
            let optionElement1 = document.createElement('option');
            optionElement1.value = category.id;
            optionElement1.textContent = category.name;
            taskCategorySelect.appendChild(optionElement1);
            
             // añadimos categoría al select de tareas por categoría
            let optionElement2 = document.createElement('option');
            optionElement2.value = category.id;
            optionElement2.textContent = category.name;
            taskByCatSelect.appendChild(optionElement2);
        });
        this.categoriesToLocalStorage();
    }

    categoriesToLocalStorage() {
        let categoriesToLocalStorage = this.#categories.map((cat) => {
            return {
                catId: cat.id,
                name: cat.name
            }
        });
        localStorage.setItem('categories', JSON.stringify(categoriesToLocalStorage));
    }
}

export default CategoryList;