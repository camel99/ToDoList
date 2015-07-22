var newEntry = {
    /**
     *
     * @param newTask retrieved from  text area
     *
     * @param table indicates where the rows should appear
     *
     */
    retrieveTask: function (table) {
        var self = this,
            task = document.getElementById("newTaskEntry").value,
            state = 'not-crossed';
        if (document.getElementById('warningAlert')) {
            self.removeWarningMessage();
        }
        self.displayNewTask(task, table,state);

    },
    /** Displaying new task in newly created row *
     * @param newTask the text that appears as a added task
     * @param table indicates the table where new row is to be added
     *
     */

    displayNewTask: function (newTask, table, state) {
        var self = this;
        if (newTask.replace(/\s/g, '')) {
            var newCells = self.createNewEntryRow(table);
            newCells.text = document.createTextNode(newTask);
            newCells.newCheckBox = pageElements.createNewCheckBox(state);
            newCells.removeBtn = pageElements.createNewDeleteButton(newCells.row);
            newCells.row.childNodes[0].appendChild(newCells.text); // task
            newCells.row.childNodes[2].appendChild(newCells.newCheckBox); //checkBox
            newCells.row.childNodes[3].appendChild(newCells.removeBtn); //deleteBtn

            /** Creating task details */
            var info = self.getTaskDetails(newCells.row);// appended to row instead of "td" to be sure that only done task is crossed
            /**Displaying task details */
            newCells.row.childNodes[1].onmouseenter = function () {
                self.displayTaskDetails(newCells.row.childNodes[1]);
            };

            newCells.row.childNodes[1].onmouseleave = function () {
                self.displayTaskDetails(newCells.row.childNodes[1]);
            };

            return newCells.row;
        } else {
            self.displayWarningMessage();
        }
    },
    /** Create new row and add classes name for row's cells */
    createNewEntryRow: function (table) {
        var self = this;
        var row = self.insertRowCells(table, 4),
            text,// here needs to be value
            newCheckBox,
            removeBtn;
        row.childNodes[0].className = 'taskOutcome';
        row.childNodes[1].className = 'fa fa-info-circle fa-2x';
        row.childNodes[2].className = 'checkBoxOutcome';
        row.childNodes[3].className = 'deleteOutcome';

        return {
            row: row,
            text: text,
            newCheckBox: newCheckBox,
            removeBtn: removeBtn
        }
    },

    /** Inserting rows into table
     *  @param table indicates table where row is to be inserted
     *
     *  @param cellsAmount indicates the amount od cells within row
     */

    insertRowCells: function (table, cellsAmount) {
        var row = table.insertRow();
        row.className = 'newTaskEntry';
        for (var i = 0; i < cellsAmount; i++) {
            row.insertCell(i);
        }

        return row;
    },
    /**
     * Creating task details
     *
     * @param task string indicates the new task for which details are created
     */
    getTaskDetails: function (task) {
        var taskDetail = document.createElement('div'),
            currentDate = this.currentDatum(),
            message = document.createTextNode('Task created: ' + currentDate);
        taskDetail.className = "alert alert-info";
        taskDetail.appendChild(message);
        var icon = document.createElement('div');
        icon.className = 'fa fa-lightbulb-o';
        task.appendChild(taskDetail);
        taskDetail.appendChild(icon);
    },
    /**
     * Creating new date
     *
     * @returns {string} formated date: Mon, dd-M-YYYY H24:Mi:ss
     */
    currentDatum: function () {
        function leadingZero(i) {
            return (i < 10) ? '0' + i : i;
        }

        var daysMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var monthMapping = ["Jan.", "Feb.", "Mar", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        var curDate = new Date(),
            year = curDate.getFullYear(),
            month = curDate.getMonth(),
            dayNo = leadingZero(curDate.getDate()),
            day = curDate.getDay(),
            hour = leadingZero(curDate.getHours()),
            min = leadingZero(curDate.getMinutes()),
            sec = leadingZero(curDate.getSeconds()),
            full = daysMapping[day] + ", " + dayNo + "-" + monthMapping[month] + "-" + year + " " + hour + ":" + min + ":" + sec;

        return full;
    },
    // jak ta funkcje wywolac tu a nie w HTML-u
    /** Remove all tasks from the list */
    removeAllTasks: function () {
        var parent = document.getElementById('outcomeTable');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        pageElements.getRowsAmount();
        storeItems.removeItemsFromLocalStorage('task');
        storeItems.removeItemsFromLocalStorage('btnState');
    },
    /**
     * Crossing the done task
     * @param newNote string indicates the newly created task
     */
    crossTask: function (newNote) {
        newNote.setAttribute("style", "text-decoration:line-through")

    },
    /**
     * Undo task that has been completed
     * @param newNote string indicates the newly created task
     */
    removeCrossedTask: function (newNote) {
        newNote.setAttribute("style", "text-decoration:none")
    },
    /**
     * Cross completed task or undo done task
     * @param e
     */
    taskCrossing: function (e) {
        var checkTask = e.target,
            x = checkTask.parentNode.parentNode.getElementsByClassName('taskOutcome')[0],
            value = '.taskOutcome',
            name = 'task';
        if (checkTask.checked) {
            this.crossTask(x);
            pageElements.addCrossedState(checkTask, 'crossed');
            storeItems.saveInLocalStorage(value,name);
        } else {
            this.removeCrossedTask(x);
            pageElements.addCrossedState(checkTask, 'not-crossed');
            storeItems.saveInLocalStorage(value, name);
        }
    },

    /**Function enable to add only 4 new task*/
    disableTaskEntry: function () {
        var rowsAmount = pageElements.getRowsAmount(),
            taskEntry = document.getElementById('newTaskEntry'),
            newPlaceholder = document.createTextNode("You are allowed to add only 4 tasks.");
        if (rowsAmount == 4) {
            document.getElementById('newTaskEntry').disabled = true;
            document.getElementById('submit').disabled = true;
            taskEntry.appendChild(newPlaceholder);
        }
        else {
            document.getElementById('newTaskEntry').disabled = false;
            document.getElementById('submit').disabled = false;
        }

    },
    /**Checking whether task is empty or not*/
    createWarningMessage: function () {
        this.newTask = document.getElementById("newTaskEntry").value;
        if (this.newTask.replace(/\s/g, '') == 0) {
            var paragraph = document.createElement("P"),
                warningMessage = document.createTextNode("* Task box cannot be empty. Please enter new task.");
            paragraph.className = "alert-warning";
            paragraph.id = "warningAlert";
            paragraph.appendChild(warningMessage);
            document.getElementById("attention").appendChild(paragraph);
            //var spiner = document.createElement('div');
            //spiner.className = 'fa fa-spinner fa-pulse';
            //paragraph.appendChild(spiner);

        }
    },
    /** Creating new warning message if any exists */
    displayWarningMessage: function () {
        var warningAmount = document.getElementsByClassName("alert-warning").length;
        if (warningAmount === 0) {
            this.createWarningMessage();
        }
    },
    /** Removing displayed warning message if a new task is not empty */
    removeWarningMessage: function () {
        var warning = document.querySelector('#warningAlert');
        warning.parentNode.removeChild(warning);
    },
    /** Displaying current time */
    startTime: function () {
        var today = new Date(),
            hour = today.getHours(),
            minute = today.getMinutes(),
            second = today.getSeconds();
        hour = (hour < 10 ? "0" : "") + hour;
        minute = (minute < 10 ? "0" : "") + minute;
        second = (second < 10 ? "0" : "") + second;
        var currentTime = hour + ":" + minute + ":" + second;
        document.getElementById("currentTime").innerHTML = currentTime;
    },
    /**
     * Running functions which are triggered by "Add" button
     * @param table indicates the table where the newly created task is stored
     * @param items indicates the data stored in local storage
     * @param name indicates the local storage key name
     */
    execute: function (table, items, name) {
        var btn = document.querySelector("#submit"),
            self = this;
        btn.onclick = function () {
            self.retrieveTask(table);
            pageElements.getRowsAmount();
            self.disableTaskEntry();
            storeItems.saveInLocalStorage(items, name);
        }
    },
    /**
     * Display or hide task details. Function is run after clickng the "info" icon
     * @param taskInfo
     */
    displayTaskDetails: function (taskInfo) {
        var element = taskInfo.parentNode.querySelector('.alert');
        if (element.classList.contains('active')) {

            return element.classList.remove('active');
        } else {

            return element.classList.add('active');
        }
    }
};
