import { Student } from "./index.js";
class StudentInSor extends Student {
    constructor(student) {
        super();
        this._deskPosition = new Array(2);
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
    set deskPosition(value) {
        this._deskPosition = value;
    }
    set sorDeskPosition(value) {
        this._deskPosition[0] = value;
    }
    set oszlopDeskPosition(value) {
        this._deskPosition[1] = value;
    }
}
export { StudentInSor };
