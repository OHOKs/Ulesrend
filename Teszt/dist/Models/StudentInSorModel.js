import { Student } from "./index.js";
class StudentInSor extends Student {
    constructor() {
        super();
        this._deskPosition = new Array(2);
    }
    get deskPosition() {
        return this._deskPosition;
    }
    set deskPosition(value) {
        this._deskPosition = value;
    }
    set sorDeskPosition(value) {
        this._deskPosition[0] = value;
    }
    set oszlopDeskPosition(value) {
        this._deskPosition[1] = value;
    }
}
export { StudentInSor };
