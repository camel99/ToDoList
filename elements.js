var pageElements = {
    /**
     * Create new checkBox and cross the completed task
     * @returns {Element}
     */
    createNewCheckBox: function (state) {
        var checkBox = document.createElement("INPUT");
        checkBox.type = 'checkBox';
        checkBox.name = 'isDone';
        checkBox.className = 'taskCheckBox';
        checkBox.setAttribute('data-state', state);
        checkBox.onclick = function () {
            newEntry.taskCrossing(event);
        };

        return checkBox;
    },
    /**
     * Create new delete button and remove task
     * @param parentElement
     * @returns {Element} newly created button
     */
    createNewDeleteButton: function (parentElement) {
        var btn = document.createElement("i"),
            value = '.taskOutcome',
            keyName = 'task',
            self = this;
        btn.className = 'fa fa-times fa-2x';
        btn.onclick = function () {
            parentElement.parentNode.removeChild(parentElement);
            storeItems.removeItemsFromLocalStorage('task');
            storeItems.saveInLocalStorage(value, keyName);
            self.getRowsAmount();
            newEntry.disableTaskEntry();

        };

        return btn;
    },
    /**
     * Count added tasks
     * @return int rowsAmount the number of added tasks
     */
    getRowsAmount: function () {
        var rowsAmount = document.querySelectorAll('.newTaskEntry').length;
        document.getElementById("countRows").innerHTML = rowsAmount;

        return rowsAmount;
    },
    /** Adding data-state to checkBox to know whether the checkBox is checked or not
     * @param element indicates the checkBOx to which state is to be assign
     * @param state indicates checkBox state: checked or not-checked
     * */
    addCrossedState: function (element, state) {
        element.setAttribute('data-state', state);
    },
    /** Get check box state - use in local storage */
    getCheckBoxState: function () {
        var checkBoxes = document.querySelectorAll('.taskCheckBox');
        for (var k = 0; k < checkBoxes.length; k++) {
            if (checkBoxes[k].getAttribute('data-state') === 'crossed') {
                checkBoxes[k].checked = true;
            }
        }
    },
    /** If checkBox has crossed data-state then set style line-through to the task */
    crossedAllCheckedTasks: function() {
        var tasks = document.querySelectorAll('.taskOutcome'),
            checkBox =  document.querySelectorAll('.taskCheckBox');
        for(var i = 0; i < tasks.length; i++){
            if(checkBox[i].getAttribute('data-state') === 'crossed'){
                tasks[i].setAttribute("style", "text-decoration:line-through");
            }
        }
    }
}