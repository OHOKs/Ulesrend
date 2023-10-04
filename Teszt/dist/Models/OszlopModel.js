import { Sor } from './index.js';
class Oszlop {
    constructor(maxOszlopKulcs, allSorKulcs) {
        this._allSorKulcs = new Array();
        this._sorok = new Array();
        this._oszlopKulcs = 0;
        this._maxOszlopKulcs = 0;
        this._maxOszlopKulcs = maxOszlopKulcs;
        this._allSorKulcs = allSorKulcs;
    }
    createNextSor() {
        if (this.oszlopKulcs > this.maxOszlopKulcs) {
            throw new Error("Nem letezo oszlop");
        }
        const sor = new Sor(this._allSorKulcs[this._oszlopKulcs], this.oszlopKulcs);
        this._oszlopKulcs++;
        return sor;
    }
    addSorToOszlop(sor) {
        this._sorok.push(sor);
    }
    get allSorKulcs() {
        return this._allSorKulcs;
    }
    get sorok() {
        return this._sorok;
    }
    get oszlopKulcs() {
        return this._oszlopKulcs;
    }
    get maxOszlopKulcs() {
        return this._maxOszlopKulcs;
    }
    set maxOszlopKulcs(value) {
        this._maxOszlopKulcs = value;
    }
}
export { Oszlop };
