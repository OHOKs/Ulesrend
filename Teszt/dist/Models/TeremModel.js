/*
    StudentInSor represents a student class in a row, adds extra information:
        - what is the X position for a student
        - automatically sets the X deskPosition
    
    Sor contains the actual StudentInSor objects:
    [StudentInSor, StudentInSor, StudentInSor, StudentInSor]

    Oszlop contains the Sor objects like so:
    [Sor, Sor, Sor]
        - this will also set the Y position for the StudentInSor object
    
    Terem accesses the array containing the Sor objects
        - this is where search function will be
*/
import * as fs from 'fs';
import { StudentInSor, Student, Oszlop } from './index.js';
class Terem {
    constructor(capacityByRow) {
        if (capacityByRow.length < 1) {
            throw new Error("Array must contain at least one element");
        }
        this._oszlop = new Oszlop(capacityByRow.length, capacityByRow);
        this._currentSor = this._oszlop.createNextSor();
    }
    createStudent(osztaly, name, group) {
        const student = new Student();
        student.class = osztaly;
        student.name = name;
        student.group = group;
        return student;
    }
    /**
     * El skippeli a szekeket
     * @param numberOfChairs Hany szeket szeretnenk kihagyni
     * @param isDisabled Lehet-e a helyre ulni, vagy csak ures | True = nem lehet oda ulni
     */
    skipChairs(numberOfChairs, isDisabled) {
        this._currentSor.skipChairs(numberOfChairs, isDisabled);
    }
    /**
     * Append-elni a megadott tanulot a jelenleg aktiv sorhoz, a 0-dikkal kezdi a szamolast
     * @param student A tanulo @interface StudentData formaban
     */
    addStudentToSor(student) {
        this._currentSor.addStudentToSor(student);
    }
    /**
     * Tovabb lepteti jelenleg aktiv sort
     */
    moveToNextSor() {
        this._oszlop.addSorToOszlop(this._currentSor.students);
        this._currentSor = this._oszlop.createNextSor();
    }
    /**
     * Elrakja x,y koordinatara a tanulot. 0,0 a bal elsot jelenti
     * @param student A tanulo @interface StudentData formaban
     * @param x Hanyadik a helyen ul a padban / sorban
     * @param y Hanyadik oszlopban ul
     */
    addStudentByPosition(student, x, y) {
        const currentStudent = new StudentInSor(student);
        currentStudent.sorDeskPosition = x;
        currentStudent.oszlopDeskPosition = y;
        this._oszlop.sorok[y][x] = currentStudent;
    }
    addStudentsByCsvFile(csvFilePath) {
        const allContent = fs.readFileSync(csvFilePath, "utf-8");
        let i = 0;
        let numberOfOszlop = 0;
        // i wanna go kms
        // TODO fix this SHIT, IT SUCKS but works so i dont give a fuck
        allContent.split('/n?/r').forEach((line) => {
            line.split(';').forEach((value) => {
                if (i == 0 && value) {
                    numberOfOszlop++;
                }
                if (value == '-1') {
                    this.skipChairs(1, true);
                    return;
                }
                if (value == '0') {
                    this.skipChairs(1, false);
                    return;
                }
                const valueAsJson = JSON.parse(value);
                const studnet = new Student();
                studnet.class = valueAsJson.class;
                studnet.name = valueAsJson.name;
                studnet.group = valueAsJson.group;
                this.addStudentToSor(studnet);
            });
            this.moveToNextSor();
            i++;
        });
        numberOfOszlop++;
    }
    /**
     * Visszaadja a tanulot sor es oszlop alapjan. 0,0 legfelul a bal elsot jelenti
     * @param x Hanyadik a helyen ul a padban / sorban
     * @param y Hanyadik oszlopban ul
     * @returns A tanulo adatai @interface StudentData formaban
     */
    getStudentByPosition(x, y) {
        return this._oszlop.sorok[y][x];
    }
    /**
     * Visszadaja a tanulokat az alapjan hanyadik sorban ulnek
     * @param oszlopKulcs Hanyadik sorban ulnek. 0 a legfelsot jelenti
     * @returns A tanulok adatai @interface StudentData[] formaban
     */
    getStudentsBySor(oszlopKulcs) {
        return this._oszlop.sorok[oszlopKulcs];
    }
    /**
     * Visszadaja a tanulokat az alapjan hanyadik oszlopban ulnek
     * @param sorKulcs Hanyadik oszlopban ulnek. 0 a bal oldalit jelenti
     * @returns A tanulok adatai @interface StudentData[] formaban
     */
    getStudentsByOszlop(sorKulcs) {
        let oszlopStudentData = new Array();
        // most inefficienct search algorithm ever
        for (const oszlop of this._oszlop.sorok) {
            for (const sor of oszlop) {
                if (sor.deskPosition[0] == sorKulcs) {
                    oszlopStudentData.push(sor);
                    break;
                }
            }
        }
        return oszlopStudentData;
    }
    getAllStudents() {
        return this._oszlop.sorok;
    }
    /**
     * Visszadaja a leghosszabb oszlopot
     */
    get largestOszlop() {
        return this._oszlop.maxOszlopKulcs;
    }
    /**
     * Visszadaja a leghosszabb sort
     */
    get largestSor() {
        return Math.max.apply(this._oszlop.allSorKulcs);
    }
    get currentSor() {
        return this._currentSor;
    }
    get oszlop() {
        return this._oszlop;
    }
    set currentSor(value) {
        this._currentSor = value;
    }
    set oszlop(value) {
        this._oszlop = value;
    }
}
