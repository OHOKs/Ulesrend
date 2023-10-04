import { SorInterface, StudentInterface, Sor } from './index.js'

interface OszlopInterface {
    // an overcomplicated way of doing a 2d array lol, can be accessed like normal
    allSorKulcs: Array<number>;
    sorok: Array<Array<StudentInterface>>;
    oszlopKulcs: number;
    maxOszlopKulcs: number;

    createNextSor(): SorInterface;
    addSorToOszlop(sor: Array<StudentInterface>): void;
}

class Oszlop implements OszlopInterface {
    private _allSorKulcs: number[] = new Array<number>();
    private _sorok: Array<Array<StudentInterface>> = new Array<Array<StudentInterface>>();
    private _oszlopKulcs = 0;
    private _maxOszlopKulcs = 0;

    constructor(maxOszlopKulcs: number, allSorKulcs: number[]) {
        this._maxOszlopKulcs = maxOszlopKulcs;
        this._allSorKulcs = allSorKulcs;
    }

    createNextSor(): SorInterface {
        if (this.oszlopKulcs > this.maxOszlopKulcs) {
            throw new Error("Nem letezo oszlop")
        }

        const sor = new Sor(this._allSorKulcs[this._oszlopKulcs], this.oszlopKulcs);
        this._oszlopKulcs++;
        return sor;
    }

    addSorToOszlop(sor: Array<StudentInterface>): void {
        this._sorok.push(sor);
    }

    get allSorKulcs(): number[] {
        return this._allSorKulcs;
    }

    get sorok(): Array<Array<StudentInterface>> {
        return this._sorok;
    }

    get oszlopKulcs(): number {
        return this._oszlopKulcs;
    }

    get maxOszlopKulcs(): number {
        return this._maxOszlopKulcs;
    }

    set maxOszlopKulcs(value: number) {
        this._maxOszlopKulcs = value
    }
}

export { OszlopInterface, Oszlop }