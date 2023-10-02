interface StudentData {
    id: number;
    class: string;
    name: string;
    group: string;
}

class Student implements StudentData {
    private _id: number = 0;
    private _class: string = "";
    private _name: string = "";
    private _group: string = "";

    constructor() {
        globalThis.idCounter++;
        this._id = globalThis.idCounter;
    }

    get id(): number {
        return this._id;
    }

    get class(): string {
        return this._class;
    }

    get name(): string {
        return this._name;
    }

    get group(): string {
        return this._group;
    }

    set id(value: number) {
        this._id = value;
    }

    set class(value: string) {
        this._class = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set group(value: string) {
        this._group = value;
    }

}

export { Student, StudentData } 