
var newEntry = {
    /**
     *
     * @param newTask retrieved from  text area
     *
     * @param table indicates where the rows should appear
     *
     * @returns {HTMLElement} function return row that is addaed to the table
     */
  retrieveTask: function(newTask, table) {

       if (newTask.length != 0) {
          var row = table.insertRow(0),
          task = row.insertCell(0),
          taskInfo = row.insertCell(1),
          checkBox = row.insertCell(2),
          removeTask = row.insertCell(3),
          text = document.createTextNode(newTask.value),
          newCheckBox = pageElements.createNewCheckBox(),
          removeBtn = createNewDeleteButton(row);
          row.className = 'newTaskEntry';
          task.className = 'taskOutcome';
          taskInfo.className = 'fa fa-info-circle fa-2x';
          taskInfo.id = 'info' + getRowsAmount();
          checkBox.className = 'checkBoxOutcome';
          removeTask.className = 'deleteOutcome';

           task.appendChild(text);
           checkBox.appendChild(newCheckBox);
           removeTask.appendChild(removeBtn);
           var info = this.getTaskDetails(task);

        return row;
      }

    },
    getTaskDetails:function(task) {
    var taskDetail = document.createElement('div');
    taskDetail.className = "alert alert-info";
    taskDetail.id = 'detail' + getRowsAmount();
    var currentDate = this.currentDatum();
    var message = document.createTextNode('Task created: ' + currentDate);
    taskDetail.appendChild(message);
    console.log(taskDetail);
    var row = pageElements.getRowsAmount();

    task.appendChild(taskDetail);

},
    currentDatum:function() {
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
      var checkTask = e.target,
        x = checkTask.parentNode.parentNode.getElementsByClassName('taskOutcome')[0];
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
    },
  execute: function(newTask, table){
    var btn = document.querySelector("#submit"),
        self = this;
        btn.onclick = function () {

      self.retrieveTask(newTask, table);
      pageElements.getRowsAmount();
      self.disableTaskEntry();

    }
  }

};
