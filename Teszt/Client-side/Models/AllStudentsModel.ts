import { StudentData } from './index.js'

interface AllStudentsInterface {
    allStudents: Array<StudentData>
    addStudent(student: StudentData): void
}

class AllStudents implements AllStudentsInterface {
    private _allStudents: Array<StudentData> = new Array<StudentData>

    addStudent(student: StudentData): void {
        this._allStudents.push(student)
    }

    get allStudents(): Array<StudentData> {
        return this._allStudents
    }
}

export { AllStudents, AllStudentsInterface }