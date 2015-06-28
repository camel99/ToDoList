var pageElements = {
    createNewCheckBox: function () {
        var checkBox = document.createElement("INPUT");
        checkBox.type = 'checkBox';
        checkBox.name = 'isDone';
        checkBox.className = 'taskCheckBox';
        checkBox.setAttribute("onClick","newEntry.taskCrossing(event)");

        return checkBox;
    },
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
    getRowsAmount: function() {
        var rowsAmount = document.getElementsByTagName("tr").length;
        document.getElementById("countRows").innerHTML = rowsAmount;

        return rowsAmount;
    }
}