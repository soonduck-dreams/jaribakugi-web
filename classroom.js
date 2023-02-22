class Classroom {
    maleStudentList = [];
    femaleStudentList = [];

    maleTableList = [];
    femaleTableList = [];

    #isShuffling = false;

    make() {
        this.maleStudentList = document.getElementById("people-male").value.split(/\s*,\s*/);
        this.femaleStudentList = document.getElementById("people-female").value.split(/\s*,\s*/);

        this.#emptyBlankArray(this.maleStudentList);
        this.#emptyBlankArray(this.femaleStudentList);

        this.#cleanTableList();

        if (document.getElementById("pairing-mf").checked === false) {
            this.#makeTable();
        } else {
            this.#makeTableWithPairingMF();
        }

        layoutManager.refitSpace();
        this.#saveToLocalStroage();
    }

    shuffle() {
        const drum = new Audio("drumroll.mp3");

        this.#setIsShuffling(true);

        drum.play();
        drum.addEventListener('ended', () => {
            this.#setIsShuffling(false);
        });

        if (document.getElementById("pairing-mf").checked === false) {
            let combinedTableList = this.maleTableList.concat(this.femaleTableList);
            this.#swapTwoTable(combinedTableList);
        } else {
            this.#swapTwoTable(this.maleTableList);
            this.#swapTwoTable(this.femaleTableList);
        }
    }

    discloseAll() {
        this.#setDisplayAll(this.maleTableList, "name");
        this.#setDisplayAll(this.femaleTableList, "name");
    }

    #cleanTableList() {
        for (let i = this.maleTableList.length; i > 0; i--) {
            this.maleTableList[i - 1].remove();
            this.maleTableList.pop();
        }

        for (let i = this.femaleTableList.length; i > 0; i--) {
            this.femaleTableList[i - 1].remove();
            this.femaleTableList.pop();
        }
    }

    #emptyBlankArray(arr) {
        let test = arr[0].replace(/\s+/g, '');

        if (arr && arr.length == 1 && test === "") {
            arr.pop();
        }
    }

    #makeTable() {
        let tableColumn = parseInt(document.getElementById("table-column").value);
        let tableX = FIRST_TABLE_X;
        let tableY = FIRST_TABLE_Y;
        let tableIndex = 0;

        for (let i = 0; i < this.maleStudentList.length; i++) {
            let t = new Table({x: tableX, y: tableY}, this.maleStudentList[i]);
            this.maleTableList.push(t);

            if ((tableIndex + 1) % tableColumn === 0) {
                tableX = FIRST_TABLE_X;
                tableY += TABLE_ADDER_Y;
            } else {
                tableX += TABLE_ADDER_X;
            }

            tableIndex++;
        }

        for (let i = 0; i < this.femaleStudentList.length; i++) {
            let t = new Table({x: tableX, y: tableY}, this.femaleStudentList[i]);
            this.femaleTableList.push(t);

            if ((tableIndex + 1) % tableColumn === 0) {
                tableX = FIRST_TABLE_X;
                tableY += TABLE_ADDER_Y;
            } else {
                tableX += TABLE_ADDER_X;
            }

            tableIndex++;
        }
    }

    #makeTableWithPairingMF() {
        let tableColumn = parseInt(document.getElementById("table-column").value);
        let tableX = FIRST_TABLE_X;
        let tableY = FIRST_TABLE_Y;
        let tableIndex = 0;

        let combinedLength = this.maleStudentList.length + this.femaleStudentList.length;
        let maleIndex = 0;
        let femaleIndex = 0;
        let nowFor = Gender.MALE;

        for (let i = 0; i < combinedLength; i++) {
            let student = null;
            let tableList = null;

            if ( (nowFor == Gender.MALE && maleIndex < this.maleStudentList.length)
                    || femaleIndex >= this.femaleStudentList.length) {
                student = this.maleStudentList[maleIndex++];
                tableList = this.maleTableList;
                nowFor = Gender.FEMALE;
            } else if ( (nowFor == Gender.FEMALE && femaleIndex < this.femaleStudentList.length)
                        || maleIndex >= this.maleStudentList.length) {
                student = this.femaleStudentList[femaleIndex++];
                tableList = this.femaleTableList;
                nowFor = Gender.MALE;
            } else {
                console.log("makeTableWithPairingMF(): this is not happening hopefully");
            }

            let t = new Table({x: tableX, y: tableY}, student);
            tableList.push(t);

            if ((tableIndex + 1) % tableColumn === 0) {
                tableX = FIRST_TABLE_X;
                tableY += TABLE_ADDER_Y;
            } else {
                tableX += TABLE_ADDER_X;
            }

            tableIndex++;
        }
    }

    #setDisplayAll(tableList, type) {
        for (let i = 0; i < tableList.length; i++) {
            tableList[i].setDisplay(type);
        }
    }

    #swapTwoTable(tableList) {
        let a = randomIndex(tableList);
        let b = randomIndex(tableList);

        let tempPos = tableList[a].getPos();
        tableList[a].setPos(tableList[b].getPos());
        tableList[b].setPos(tempPos);

        setTimeout(() => {
            if (this.#isShuffling == true) {
                this.#swapTwoTable(tableList);
            }
        }, 1);
    }

    #setIsShuffling(value) {
        this.#isShuffling = value;
        
        if (value == true) {
            document.querySelectorAll(".sidebar-button").forEach(button => {
                button.disabled = true;
            });
        } else if (value == false) {
            let postTableDisplay = document.getElementById("post-table-display").value;

            this.#setDisplayAll(this.maleTableList, postTableDisplay);
            this.#setDisplayAll(this.femaleTableList, postTableDisplay);

            sidebarManager.shuffled = true;
            sidebarManager.refreshShufflePage();
        } else {
            console.log("setIsShuffling: 들어온 값이 boolean하지 않네요..");
        }
    }

    #saveToLocalStroage() {
        localStorage.setItem('maleString', document.getElementById("people-male").value);
        localStorage.setItem('femaleString', document.getElementById("people-female").value);
        localStorage.setItem('tableColumn', document.getElementById("table-column").value);
        localStorage.setItem('pairingMF', document.getElementById("pairing-mf").checked.toString());
    }
}