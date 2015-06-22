
var newEntry = {
  newTask: null,
  checkBox: null,
  table: null,

  retrieveTask: function(newTask) {

   if (this.newTask.length != 0) {
      var row = this.table.insertRow(0),
        taskCell = row.insertCell(0),
        checkBoxCell = row.insertCell(1),
        deleteCell = row.insertCell(2),
        text = document.createTextNode(newTask),
        newCheckBox = pageElements.createNewCheckBox(),
        deleteBtn = pageElements.createNewDeleteButton(row);

    row.className = 'newTaskEntry';
    taskCell.className = 'taskOutcome';
    checkBoxCell.className = 'checkBoxOutcome';
    deleteCell.className = 'deleteOutcome';

    taskCell.appendChild(text);
    checkBoxCell.appendChild(newCheckBox);
    deleteCell.appendChild(deleteBtn);

    return row;
  }
},
  removeAllTasks: function (){
  var parent = document.getElementById('outcomeTable');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  pageElements.getRowsAmount();
},
  deleteTask: function (parentElement){
  var element = document.getElementsByClassName('fa fa-times fa-2x');
  element.onclick = function () {

    parentElement.parentNode.removeChild(parentElement);

  };
},
  clearEntry: function (elementId) {
  document.getElementById(elementId).setAttribute("text", "");
},
  crossTask: function (parametr){
  parametr.setAttribute("style", "text-decoration:line-through")
},
  removeCrossedTask: function (parametr){
  parametr.setAttribute("style", "text-decoration:none")
},
  taskCrossing: function (e){
  var checkTask = e.target;
  var x = checkTask.parentNode.parentNode.getElementsByClassName('taskOutcome')[0];
  if (checkTask.checked) {
    this.crossTask(x);
  } else {
    this.removeCrossedTask(x);
  }
},
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
  isTaskBoxEmpty: function () {
  this.newTask = document.getElementById("newTaskEntry").value;
  if (this.newTask.length <= 0) {
    var paragraph = document.createElement("P"),
        node = document.createTextNode("* Task box cannot be empty. Please enter new task.");
    paragraph.className = "warningMessage";
    paragraph.appendChild(node);
    document.getElementById("todoList").appendChild(paragraph);

  }
},
  createWarningMessage: function (){
  var hasClass = document.getElementsByClassName("warningMessage").length;
  if (hasClass > 0) {
    return;
  }
  else {
    this.isTaskBoxEmpty();
  }
},
  startTime: function (){
  var today = new Date(),
      hour = today.getHours(),
      minute = today.getMinutes(),
      second = today.getSeconds();
  hour = (hour < 10 ? "0" : "") + hour;
  minute = (minute < 10 ? "0" : "") + minute;
  second = (second < 10 ? "0" : "") + second;
  var currentTime = hour + ":" + minute + ":" + second;
  document.getElementById("currentTime").innerHTML = currentTime;
}

};