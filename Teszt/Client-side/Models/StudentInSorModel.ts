import { StudentData, Student } from "./index.js";

interface StudentInterface extends StudentData {
    deskPosition: Array<number>;
    sorDeskPosition: number;
    oszlopDeskPosition: number;

    // Can't do this here, cus interfaces are inherently public
    // addStudentData(student: StudentData): void;
}

class StudentInSor extends Student implements StudentInterface {
    private _deskPosition: Array<number> = new Array<number>(2);

    constructor(student: StudentData) {
        super();
        this.addStudentData(student);
    }

    addStudentData(student: StudentData) {
        this.class = student.class;
        this.name = student.name;
        this.group = student.group;
    }

    get deskPosition(): Array<number> {
        return this._deskPosition;
    }

    set deskPosition(value: number[]) {
        this._deskPosition = value;
    }

    set sorDeskPosition(value: number) {
        this._deskPosition[0] = value
    }

    set oszlopDeskPosition(value: number) {
        this._deskPosition[1] = value
    }

}

export { StudentInterface, StudentInSor }