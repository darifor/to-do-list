class Category {

    #id
    #name

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    set name(value) {
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    get id() {
        return this.#id;
    }
}

export default Category;