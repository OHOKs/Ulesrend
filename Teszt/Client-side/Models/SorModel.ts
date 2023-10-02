import { StudentData, Student } from "./index.js"

interface SorInterface {
    students: Array<StudentData>;
    sorKulcs: number;

    addStudentToSor(student: StudentData): void;
}

class Sor implements SorInterface {
    private _students: StudentData[] = new Array<StudentData>();
    private _sorKulcs: number = 0;

    constructor(sorKulcs: number) {
        this._sorKulcs = sorKulcs;
    }

    addStudentToSor(student: StudentData): void {

    }

    get students(): Array<StudentData> {
        return this._students;
    }

    get sorKulcs(): number {
        return this._sorKulcs;
    }

    set sorKulcs(value: number) {
        this._sorKulcs = value;
    }
}

