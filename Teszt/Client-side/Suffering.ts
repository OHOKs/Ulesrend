interface RandomStuffInterface {
    // TODO write that is implemented
}

// TODO fix all errors, there's like a hundred of them lol
class RandomStuff implements RandomStuffInterface {
    _classroom: Array<Array<string>>;
    _studentList: Array<string>;
    _classroomColloums: number;
    _classroomRows: number;

    constructor() {
        this._classroom = [
            ["Keskeny kevin", "Dancsik dávid", null, "Nobody", "Gábor"],
            ["Korom Levente", "Bogyó", null, "Nobody", "Gergő"],
            ["Bene Dominik", "Nobody", null, "Nobody", "Nobody"],
            ["Gere Csanad", "Jani Patrik", null, "Gyula", "Nobody"],
            ["Tanár", null, null, "Barna Máté", "Barta Máte"]
        ]

        //diaklista {JELENLEG IDEIGLENES} -- TODO
        this._studentList = [
            "Jani Patrik",
            "Gere Csanad",
            "Gyula",
            "Mate1",
            "Mate2"
        ]
        this._classroomColloums = 6 //oszlopok szama {JELENLEG IDEIGLENES} --  TODO
        this._classroomRows = 6 //sorok szama {JELENLEG IDEIGLENES} -- TODO

    }


    uploadStudentsList(fileName) {
        document.getElementById('file-chosen-SL').textContent = "-" + fileName + "-"
    }
    uploadClassroom(fileName) {
        document.getElementById('file-chosen-EC').textContent = "-" + fileName + "-"
    }

    allowDrop(customEvent) {
        customEvent.preventDefault();
    }

    drag(customEvent) {
        customEvent.dataTransfer.setData("text/plain", customEvent.target.id);
    }

    submitStudentsList() {
        let file = document.getElementById('uploadStudentsList-btn').files[0];
        //Itt feldolgozni a bekuldott file-t es aztan meghivni a createStudentsTable fuggvenyt. Az adat atadast ugy csinalod ahogy szeretned.
        createStudentsTable()
    }

    submitClassroom() {
        let file = document.getElementById('uploadClassroom-btn').files[0];
        //Itt feldolgozni a file-t es aztan meghivni a createClassroomTable fuggvenyt ami megcsinalja a tablat. ofc adatokat at kell adni neki, azt ahogy szeretned ugy csinald meg. jelenleg nem var semmit sem, atirhatod hogy varjon valamit vagy csak szimplan majd benne irsz at. m1
        //!!!FONTOS!!! Az oszlopok es sorok szamat ird be dinamikusan olvasasnal, hogy melyik mennyi. 102-103 sorba vannak jelenleg azok az adatok
        createClassroomTable()
    }

    drop(customEvent) {
        customEvent.preventDefault();

        var data = customEvent.dataTransfer.getData("text/plain");

        var draggedDiv = document.getElementById(data);

        var containsText = false;

        for (var i = 0; i < customEvent.target.childNodes.length; i++) {
            if (customEvent.target.childNodes[i].nodeName === '#text') {
                containsText = true;
                break;
            }
        }
        if (customEvent.target.id == "dragHere") {
            if (document.getElementById(draggedDiv.id + "-x")) {
                document.getElementById(draggedDiv.id + "-x").remove()
            }
            if (document.getElementById("Students-" + draggedDiv.id)) {
                document.getElementById("Students-" + draggedDiv.id).remove()
            }
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.setAttribute('class', 'availablePlace')
            cell.setAttribute('id', draggedDiv.id + "-x")
            cell.appendChild(draggedDiv)
            row.appendChild(cell);
            document.getElementById("Students").appendChild(row);
        } else {
            if (containsText == false && customEvent.target.id != "Students" && document.getElementById(customEvent.target.id).childNodes.length == 0) {
                customEvent.target.appendChild(draggedDiv);

                if (document.getElementById(draggedDiv.id + "-x")) {
                    document.getElementById(draggedDiv.id + "-x").remove()
                }
                if (document.getElementById("Students-" + draggedDiv.id)) {
                    document.getElementById("Students-" + draggedDiv.id).remove()
                }
            } else { alert("Itt már van valaki!") }
        }
    }

    createClassroomTable() {
        if (document.getElementById("classroom")) { document.getElementById("classroom").remove() }

        var table = document.createElement("table");
        table.setAttribute('id', 'classroom')
        table.setAttribute('class', 'classroomTable')

        var tbody = document.createElement("tbody");

        for (var i = 0; i < classroomRows - 1; i++) {

            var row = document.createElement("tr");

            for (var j = 0; j < classroomColloums - 1; j++) {

                var cell = document.createElement("td");
                cell.setAttribute('id', (i + 1) + "-" + (j + 1))

                if (classroom[i][j] != null) {

                    if (classroom[i][j] != "Nobody" && classroom[i][j] != "Tanár") {
                        var div = document.createElement("div")
                        div.setAttribute('id', (i + 1) + "x" + (j + 1))
                        div.setAttribute('draggable', 'true')
                        div.setAttribute('class', 'draggable')
                        div.appendChild(document.createTextNode(classroom[i][j]))
                        cell.appendChild(div);
                    } if (classroom[i][j] != "Tanár") {
                        cell.addEventListener('dragover', allowDrop);
                        cell.addEventListener('drop', drop);
                        cell.setAttribute('class', 'availablePlace')
                    } else {
                        cell.setAttribute('class', 'teacherPlace')
                        cell.appendChild(document.createTextNode(classroom[i][j]))
                    }
                } else {
                    cell.setAttribute('class', "nullPlace")
                    cell.appendChild(document.createTextNode("Folyoso"))
                }
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        document.body.appendChild(table);

        var draggableDivs = document.querySelectorAll('.draggable');

        draggableDivs.forEach((div) => {
            div.addEventListener('dragstart', drag);
        });
    }

    createStudentsTable() {
        if (document.getElementById("studentList")) { document.getElementById("dragHereTable").remove(); document.getElementById("dragHere").remove() }
        if (!document.getElementById("classroom")) { alert("A megfelelő működés érdekében a tanterem generálásának kell először megtörténnie") }
        else {
            var table = document.createElement("table");
            table.setAttribute('id', 'studentList')
            table.setAttribute('class', 'studentsTable')

            var tbody = document.createElement("tbody");
            tbody.setAttribute('id', 'Students');

            for (var i = 0; i < studentList.length; i++) {
                if (!checkDuplactedStudents(classroom, studentList[i])) {
                    var row = document.createElement("tr");
                    var cell = document.createElement("td");
                    cell.setAttribute('id', "Students-" + i)
                    cell.addEventListener('dragover', allowDrop);
                    cell.addEventListener('drop', drop);
                    cell.setAttribute('class', 'availablePlace')
                    var div = document.createElement("div")
                    div.setAttribute('id', i)
                    div.setAttribute('draggable', 'true')
                    div.setAttribute('class', 'draggable')
                    div.appendChild(document.createTextNode(studentList[i]))
                    cell.appendChild(div);
                    row.appendChild(cell);
                    tbody.appendChild(row);
                }
            }

            table.appendChild(tbody);

            document.body.appendChild(table);

            var table = document.createElement("table");
            table.setAttribute('class', 'dragHereTable')
            var tbody = document.createElement("tbody");
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.setAttribute('class', 'dragHereCell')
            cell.setAttribute('id', 'dragHere')
            cell.appendChild(document.createTextNode("Visszahelyezés"))
            cell.addEventListener('dragover', allowDrop);
            cell.addEventListener('drop', drop);
            row.appendChild(cell);
            tbody.appendChild(row);
            table.appendChild(tbody);
            document.body.appendChild(table);

            var draggableDivs = document.querySelectorAll('.draggable');

            draggableDivs.forEach((div) => {
                div.addEventListener('dragstart', drag);
            });
        }
    }

    save() {
        if (!document.getElementById("classroom")) { alert("A megfelelő működés érdekében a tanterem generálásának kell először megtörténnie") }
        else {
            let classroomSave = createDynamicArray(classroomRows, classroomColloums)

            for (var i = 0; i < classroomRows - 1; i++) {
                for (var j = 0; j < classroomColloums - 1; j++) {

                    let id = (i + 1) + "-" + (j + 1);
                    let element = document.getElementById(id);

                    if (element.childNodes.length != 0) {
                        if (element.textContent != "Folyoso") {
                            classroomSave[i][j] = element.textContent
                        } else {
                            classroomSave[i][j] = null
                        }
                    }
                    if (element.childNodes.length == 0 && element.className != "null") {
                        classroomSave[i][j] = "Nobody"
                        console.log(element.value)
                    }
                }
            }

            let downloadableFile = ""

            for (var i = 0; i < classroomSave.length; i++) {
                if (i != 0) { downloadableFile += "\n" }
                for (var j = 0; j < classroomSave[i].length; j++) {
                    downloadableFile += classroomSave[i][j] + ";"
                }
            }
            const link = document.createElement("a");

            const file = new Blob([downloadableFile], { type: 'text/plain' });

            link.href = URL.createObjectURL(file);

            link.download = "Classroom.json"

            link.click();

            URL.revokeObjectURL(link.href);
        }
    }

    createDynamicArray(Rows, Colloums) {
        let classroomSave = new Array(classroomRows - 1)
        for (var i = 0; i < classroomRows - 1; i++) {
            classroomSave[i] = new Array(classroomColloums - 1)
            for (var j = 0; j < classroomColloums - 1; j++) {
                classroomSave[i][j] = null
            }
        }

        return classroomSave;
    }

    checkDuplactedStudents(classroom, student) {
        let exist = false

        for (var i = 0; i < classroomRows - 1; i++) {
            for (var j = 0; j < classroomColloums - 1; j++) {
                if (classroom[i][j] == student) { exist = true }
            }
        }

        return exist
    }
}