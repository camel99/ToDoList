var pageElements = {
    /**
     * Create new checkBox and cross the completed task
     * @returns {Element}
     */
    createNewCheckBox: function () {
        var checkBox = document.createElement("INPUT");
        checkBox.type = 'checkBox';
        checkBox.name = 'isDone';
        checkBox.className = 'taskCheckBox';
        checkBox.setAttribute("onClick","newEntry.taskCrossing(event)");

        return checkBox;
    },
    /**
     * Create new delete button and remove task
     * @param parentElement
     * @returns {Element} newly created button
     */
    createNewDeleteButton: function (parentElement) {
        var btn = document.createElement("i"),
            self = this;
        btn.className = 'fa fa-times fa-2x';
        btn.onclick = function () {
           parentElement.parentNode.removeChild(parentElement);
           self.getRowsAmount();
           newEntry.disableTaskEntry();

        };

        return btn;
    },
    /**
     * Count added tasks
     * @return int rowsAmount the number of added tasks
     */
    getRowsAmount: function() {
        var rowsAmount = document.getElementsByTagName("tr").length;
        document.getElementById("countRows").innerHTML = rowsAmount;

        return rowsAmount;
    },
    /** Adding new task entry to local storage */
    saveInLocalStorage: function (value, name) {
        //var text = document.querySelectorAll('.taskOutcome');
        var items = [];
        for (var i = 0; i < value.length; i++) {
            var note = value[i].textContent;
            items.unshift(note);
        }
        localStorage.setItem(name, JSON.stringify(items));
    }
}