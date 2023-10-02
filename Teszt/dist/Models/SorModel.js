class Sor {
    constructor(sorKulcs) {
        this._students = new Array();
        this._sorKulcs = 0;
        this._sorKulcs = sorKulcs;
    }
    addStudentToSor(student) {
    }
    get students() {
        return this._students;
    }
    get sorKulcs() {
        return this._sorKulcs;
    }
    set sorKulcs(value) {
        this._sorKulcs = value;
    }
}
export {};
