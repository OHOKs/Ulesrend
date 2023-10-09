import { StudentInSor, StudentInterface, StudentData } from "./index.js"

interface SorInterface {
    students: Array<StudentInterface>;
    oszlopKulcs: number;
    sorKulcs: number;
    maxSorKulcs: number;

    addStudentToSor(student: StudentData): void;
    skipChairs(numberOfChairs: number, isDisabled?: boolean): void;
}

class Sor implements SorInterface {
    private _students: Array<StudentInterface> = new Array<StudentInterface>();
    private _oszlopKulcs: number = 0;
    private _sorKulcs: number = 0;
    private _maxSorKulcs: number = 0;

    constructor(maxSorKulcs: number, oszlopKulcs: number) {
        this._maxSorKulcs = maxSorKulcs;
        this._oszlopKulcs = oszlopKulcs;
    }

    addStudentToSor(student: StudentData): void {
        if (this.oszlopKulcs > this.maxSorKulcs) {
            throw new Error("Nem letezo hely")
        }

        const studentInSor = new StudentInSor(student);
        studentInSor.oszlopDeskPosition = this.oszlopKulcs;
        studentInSor.sorDeskPosition = this.sorKulcs;

        this._students.push(studentInSor);
        this._sorKulcs++;
    }

    // TODO this WILL cause bugs, cus accessing objects skipped by this mehtod should return undefined or most likely an empty object in the array
    // idk if this is still true, but i will leave this here
    skipChairs(numberOfChairs: number, isDisabled?: boolean): void {
        for (let i = 0; i <= numberOfChairs; i++) {
            let studentInSor;
            if (isDisabled) {
                studentInSor = new StudentInSor(false);
            } else {
                studentInSor = new StudentInSor(true);
            }

            studentInSor.oszlopDeskPosition = this.oszlopKulcs;
            studentInSor.sorDeskPosition = this.sorKulcs;

            this._students.push(studentInSor);
            this._sorKulcs++;
        }
    }

    get students(): Array<StudentInterface> {
        return this._students;
    }

    get oszlopKulcs(): number {
        return this._oszlopKulcs;
    }

    get sorKulcs(): number {
        return this._sorKulcs;
    }

    get maxSorKulcs(): number {
        return this._maxSorKulcs;
    }

    set oszlopKulcs(value: number) {
        this._oszlopKulcs = value;
    }

    set sorKulcs(value: number) {
        this._sorKulcs = value;
    }

    set maxSorKulcs(value: number) {
        this._maxSorKulcs = value;
    }

}

export { SorInterface, Sor }
