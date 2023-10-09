class AllStudents {
    constructor() {
        this._allStudents = new Array;
    }
    addStudent(student) {
        this._allStudents.push(student);
    }
    get allStudents() {
        return this._allStudents;
    }
}
export { AllStudents };
