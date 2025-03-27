class Task {

    #id;
    #title;
    #description;
    #completed;
    #category;
    #date;

    constructor(id, title, description, category, completed=false, date=new Date()) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#category = category;
        this.#completed = completed;
        this.#date = date;
    }

    toggleComplete() {
        this.#completed = !this.#completed;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get category() {
        return this.#category;
    }

    get completed() {
        return this.#completed;
    }

    get date() {
        return this.#date;
    }
}

export default Task;