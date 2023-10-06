import { Student } from "./index.js";
class StudentInSor extends Student {
    constructor(student) {
        super();
        this._deskPosition = new Array(2);
        this._disabled = false;
        // This will let throught any boolean, can cause bugs, i don't care
        if (typeof student === 'boolean') {
            if (student === false) {
                this._disabled = true;
                return;
            }
            else {
                return;
            }
        }
        this.addStudentData(student);
    }
    addStudentData(student) {
        this.class = student.class;
        this.name = student.name;
        this.group = student.group;
    }
    get deskPosition() {
        return this._deskPosition;
    }
    get disabled() {
        return this._disabled;
    }
    set deskPosition(value) {
        this._deskPosition = value;
    }
    set disabled(value) {
        this._disabled = value;
    }
    set sorDeskPosition(value) {
        this._deskPosition[0] = value;
    }
    set oszlopDeskPosition(value) {
        this._deskPosition[1] = value;
    }
}
export { StudentInSor };
