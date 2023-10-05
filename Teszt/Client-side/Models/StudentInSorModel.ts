import { StudentData, Student } from "./index.js";

interface StudentInterface extends StudentData {
    deskPosition: Array<number>;
    sorDeskPosition: number;
    oszlopDeskPosition: number;
    disabled: boolean;

    // Can't do this here, cus interfaces are inherently public
    // addStudentData(student: StudentData): void;
}

class StudentInSor extends Student implements StudentInterface {
    private _deskPosition: Array<number> = new Array<number>(2);
    private _disabled: boolean = false;

    constructor(student: StudentData | boolean) {
        super();
        // This will let throught any boolean, can cause bugs, i don't care
        if (typeof student === 'boolean') {
            this._disabled = true;
            return
        }

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

    get disabled(): boolean {
        return this._disabled;
    }

    set deskPosition(value: number[]) {
        this._deskPosition = value;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    set sorDeskPosition(value: number) {
        this._deskPosition[0] = value
    }

    set oszlopDeskPosition(value: number) {
        this._deskPosition[1] = value
    }

}

export { StudentInterface, StudentInSor }