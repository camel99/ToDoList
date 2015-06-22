var pageElements = {
    createNewCheckBox: function () {
        var checkBox = document.createElement("INPUT");
        checkBox.type = 'checkBox';
        checkBox.name = 'isDone';
        checkBox.className = 'taskCheckBox';
        checkBox.setAttribute("onClick", "taskCrossing(event)");

        return checkBox;
    },
    createNewDeleteButton: function (parentElement) {
        var btn = document.createElement("i");
        btn.className = 'fa fa-times fa-2x';
        btn.onclick = function () {

            parentElement.parentNode.removeChild(parentElement);

           this.getRowsAmount();
            disableTaskEntry();

        };

        return btn;

    },
    getRowsAmount: function() {
        var rowsAmount = document.getElementsByTagName("tr").length;
        document.getElementById("countRows").innerHTML = rowsAmount;

        return rowsAmount;
    },


}