class Student {
    constructor() {
        this._id = 0;
        this._class = "";
        this._name = "";
        this._group = "";
        globalThis.idCounter++;
        this._id = globalThis.idCounter;
    }
    get id() {
        return this._id;
    }
    get class() {
        return this._class;
    }
    get name() {
        return this._name;
    }
    get group() {
        return this._group;
    }
    set id(value) {
        this._id = value;
    }
    set class(value) {
        this._class = value;
    }
    set name(value) {
        this._name = value;
    }
    set group(value) {
        this._group = value;
    }
}
export { Student };
