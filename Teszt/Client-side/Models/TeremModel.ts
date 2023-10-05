
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

import * as fs from 'fs'
import { StudentData, SorInterface, OszlopInterface, StudentInSor, Student, Oszlop, StudentInterface } from './index.js';

interface TeremInterface {
    currentSor: SorInterface;
    oszlop: OszlopInterface;

    createStudent(osztaly: string, name: string, group: string): StudentData;

    addStudentToSor(student: StudentData): void;
    skipChairs(numberOfChairs: number): void;
    moveToNextSor(): void;

    addStudentByPosition(student: StudentData, x: number, y: number): void;
    addStudentsByCsvFile(csvFilePaths: string): void;

    getStudentByPosition(x: number, y: number): StudentData;
    getStudentsBySor(oszlopKulcs: number): Array<StudentData>;
    getStudentsByOszlop(sorKulcs: number): Array<StudentData>;
    getAllStudents(): Array<Array<StudentInterface>>;
}

class Terem implements TeremInterface {
    private _oszlop: OszlopInterface;
    private _currentSor: SorInterface;


    constructor(capacityByRow: Array<number>) {
        if (capacityByRow.length < 1) {
            throw new Error("Array must contain at least one element")
        }

        this._oszlop = new Oszlop(capacityByRow.length, capacityByRow)
        this._currentSor = this._oszlop.createNextSor()
    }

    createStudent(osztaly: string, name: string, group: string): StudentData {
        const student = new Student();

        student.class = osztaly;
        student.name = name;
        student.group = group;

        return student;
    }

    /**
     * El skippeli a szekeket
     * @param numberOfChairs Hany szeket szeretnenk kihagyni
     */
    skipChairs(numberOfChairs: number): void {
        this._currentSor.skipChairs(numberOfChairs);
    }

    /**
     * Append-elni a megadott tanulot a jelenleg aktiv sorhoz, a 0-dikkal kezdi a szamolast
     * @param student A tanulo @interface StudentData formaban 
     */
    addStudentToSor(student: StudentData): void {
        this._currentSor.addStudentToSor(student)
    }

    /**
     * Tovabb lepteti jelenleg aktiv sort
     */
    moveToNextSor(): void {
        this._oszlop.addSorToOszlop(this._currentSor.students);
        this._currentSor = this._oszlop.createNextSor();
    }

    /**
     * Elrakja x,y koordinatara a tanulot. 0,0 a bal elsot jelenti
     * @param student A tanulo @interface StudentData formaban
     * @param x Hanyadik a helyen ul a padban / sorban
     * @param y Hanyadik oszlopban ul
     */
    addStudentByPosition(student: StudentData, x: number, y: number): void {
        const currentStudent = new StudentInSor(student)
        currentStudent.sorDeskPosition = x;
        currentStudent.oszlopDeskPosition = y;
        this._oszlop.sorok[y][x] = currentStudent;
    }


    addStudentsByCsvFile(csvFilePath: string): void {
        const allContent = fs.readFileSync(csvFilePath, "utf-8")
        let i: number = 0;
        let numberOfOszlop: number = 0;

        // i wanna go kms
        // TODO finish this
        allContent.split('/n?/r').forEach((line) => {
            line.split(';').forEach((value) => {
                if (i == 0 && value) {
                    numberOfOszlop++;
                }

                this.addStudentToSor()

            })
            this.moveToNextSor()
            i++;
        })
        i++;
    }

    /**
     * Visszaadja a tanulot sor es oszlop alapjan. 0,0 legfelul a bal elsot jelenti
     * @param x Hanyadik a helyen ul a padban / sorban
     * @param y Hanyadik oszlopban ul
     * @returns A tanulo adatai @interface StudentData formaban
     */
    getStudentByPosition(x: number, y: number): StudentData {
        return this._oszlop.sorok[y][x];
    }

    /**
     * Visszadaja a tanulokat az alapjan hanyadik sorban ulnek
     * @param oszlopKulcs Hanyadik sorban ulnek. 0 a legfelsot jelenti
     * @returns A tanulok adatai @interface StudentData[] formaban
     */
    getStudentsBySor(oszlopKulcs: number): StudentData[] {
        return this._oszlop.sorok[oszlopKulcs]
    }

    /**
     * Visszadaja a tanulokat az alapjan hanyadik oszlopban ulnek
     * @param sorKulcs Hanyadik oszlopban ulnek. 0 a bal oldalit jelenti
     * @returns A tanulok adatai @interface StudentData[] formaban  
     */
    getStudentsByOszlop(sorKulcs: number): StudentData[] {
        let oszlopStudentData: StudentInterface[] = new Array<StudentInterface>();

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

    getAllStudents(): StudentInterface[][] {
        return this._oszlop.sorok
    }

    get currentSor(): SorInterface {
        return this._currentSor;
    }

    get oszlop(): OszlopInterface {
        return this._oszlop;
    }

    set currentSor(value: SorInterface) {
        this._currentSor = value;
    }

    set oszlop(value: OszlopInterface) {
        this._oszlop = value
    }
}