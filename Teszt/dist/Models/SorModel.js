import { StudentInSor } from "./index.js";
class Sor {
    constructor(maxSorKulcs, oszlopKulcs) {
        this._students = new Array();
        this._oszlopKulcs = 0;
        this._sorKulcs = 0;
        this._maxSorKulcs = 0;
        this._maxSorKulcs = maxSorKulcs;
        this._oszlopKulcs = oszlopKulcs;
    }
    addStudentToSor(student) {
        if (this.oszlopKulcs > this.maxSorKulcs) {
            throw new Error("Nem letezo hely");
        }
        const studentInSor = new StudentInSor(student);
        studentInSor.oszlopDeskPosition = this.oszlopKulcs;
        studentInSor.sorDeskPosition = this.sorKulcs;
        this._students.push(studentInSor);
        this._sorKulcs++;
    }
    // TODO this WILL cause bugs, cus accessing objects skipped by this mehtod should return undefined or most likely an empty object in the array
    skipChairs(numberOfChairs) {
        this._sorKulcs += numberOfChairs;
    }
    get students() {
        return this._students;
    }
    get oszlopKulcs() {
        return this._oszlopKulcs;
    }
    get sorKulcs() {
        return this._sorKulcs;
    }
    get maxSorKulcs() {
        return this._maxSorKulcs;
    }
    set oszlopKulcs(value) {
        this._oszlopKulcs = value;
    }
    set sorKulcs(value) {
        this._sorKulcs = value;
    }
    set maxSorKulcs(value) {
        this._maxSorKulcs = value;
    }
}
export { Sor };
