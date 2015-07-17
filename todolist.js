
var newEntry = {
/**
*
* @param newTask retrieved from  text area
*
* @param table indicates where the rows should appear
*
* @returns {HTMLElement} function return row that is added to the table
*/
  retrieveTask: function(newTask, table) {
        var self = this;
        if (document.getElementById('warningAlert')) {
            self.removeWarningMessage();
        }
    if (newTask.value.length !== 0) {

        obj = createNewEntryRow();
        obj.row

        var row = table.insertRow(0),
          task = row.insertCell(0),
          infoIcon = row.insertCell(1),
          checkBox = row.insertCell(2),
          removeTask = row.insertCell(3),
          text = document.createTextNode(newTask.value),
          newCheckBox = pageElements.createNewCheckBox(),
          removeBtn = pageElements.createNewDeleteButton(row);
/** Creating new classes for the table elements */
          row.className = 'newTaskEntry';
          task.className = 'taskOutcome';
          infoIcon.className = 'fa fa-info-circle fa-2x';
          checkBox.className = 'checkBoxOutcome';
          removeTask.className = 'deleteOutcome';

           task.appendChild(text);
           checkBox.appendChild(newCheckBox);
           removeTask.appendChild(removeBtn);
/** Creating task details */
        var info = this.getTaskDetails(row);// appended to row instead of "td" to be sure that only done task is crossed
/**Displaying task details */
        infoIcon.onmouseenter = function () {
            self.displayTaskDetails(infoIcon);
        };

        infoIcon.onmouseleave = function () {
            self.displayTaskDetails(infoIcon);
        };

        return row;
      } else {
           this.createWarningMessage();
       }

    },
/** spytaj roberta jak to zmieni� */
    createNewEntryRow: function(table) {
            var row = table.insertRow(0),
                task = row.insertCell(0),
                infoIcon = row.insertCell(1),
                checkBox = row.insertCell(2),
                removeTask = row.insertCell(3)
                //text = document.createTextNode(textValue), // her needs to be value
                //newCheckBox =  pageElements.createNewCheckBox(),
                //removeBtn = pageElements.createNewDeleteButton(row);
;
        return {
            row: row,
            task: task,
            infoIcon: infoIcon
        }[row,task,infoIcon,checkBox,removeTask];
    },
/**
* Creating task details
*
* @param task string indicates the new task for which details are created
*/
    getTaskDetails:function(task) {
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
    // jak ta funkcje wywolac tu a nie w HTML-u
/** Remove all tasks from the list */
  removeAllTasks: function (){
      var parent = document.getElementById('outcomeTable');
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
        pageElements.getRowsAmount();
        storeItems.removeItemsFromLocalStorage('task');
    },
/**
* Crossing the done task
* @param newNote string indicates the newly created task
*/
  crossTask: function (newNote){
        newNote.setAttribute("style", "text-decoration:line-through")

    },
/**
* Undo task that has been completed
* @param newNote string indicates the newly created task
*/
  removeCrossedTask: function (newNote){
        newNote.setAttribute("style", "text-decoration:none")
    },
/**
* Cross completed task or undo done task
* @param e
*/
  taskCrossing: function (e){
      var checkTask = e.target,
        x = checkTask.parentNode.parentNode.getElementsByClassName('taskOutcome')[0];
      if (checkTask.checked) {
        this.crossTask(x);
      } else {
        this.removeCrossedTask(x);
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
  isTaskBoxEmpty: function () {
      this.newTask = document.getElementById("newTaskEntry").value;
      if (this.newTask.length <= 0) {
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
  createWarningMessage: function (){
      var warningAmount = document.getElementsByClassName("alert-warning").length;
      if (warningAmount > 0) {

        return;
      }
      else {
        this.isTaskBoxEmpty();
      }
    },
/** Removing displayed warning message if a new task is not empty */
    removeWarningMessage: function(){
        var warning = document.querySelector('#warningAlert');
        warning.parentNode.removeChild(warning);
    },
/** Displaying current time */
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
/**
* Running functions which are triggered by "Add" button
* @param newTask string indicates the newly created task
* @param table indicates the table where the newly created task is stored
*/
  execute: function(newTask, table, items, name){
    var btn = document.querySelector("#submit"),
        self = this;
        btn.onclick = function () {
      self.retrieveTask(newTask, table);
      pageElements.getRowsAmount();
      self.disableTaskEntry();
      storeItems.saveInLocalStorage(items,name);
    }
  },
/**
* Display or hide task details. Function is run after clickng the "info" icon
* @param taskInfo
*/
    displayTaskDetails: function (taskInfo) {
        var element = taskInfo.parentNode.querySelector('.alert');
        if(element.classList.contains('active')){

            return element.classList.remove('active');
        } else {

            return element.classList.add('active');
        }
    },
/** Retrieve task from local storage */
    retrieveFromLocalStorage: function (newTask, table,name) {
  var localStorageItems = storeItems.getLocalStorageItems(name);
  if (localStorageItems) {
      var itemsAmount = localStorageItems.length;
            for (var i = 0; i < itemsAmount; i++){
                 var self = this,
                     row = table.insertRow(0),
                     task = row.insertCell(0),
                     infoIcon = row.insertCell(1),
                     checkBox = row.insertCell(2),
                     removeTask = row.insertCell(3),
                     text = document.createTextNode(localStorageItems[i]),
                     newCheckBox = pageElements.createNewCheckBox(),
                     removeBtn = pageElements.createNewDeleteButton(row);
/** Creating new classes for the table elements */
            row.className = 'newTaskEntry';
            task.className = 'taskOutcome';
            infoIcon.className = 'fa fa-info-circle fa-2x';
            checkBox.className = 'checkBoxOutcome';
            removeTask.className = 'deleteOutcome';

            task.appendChild(text);
            checkBox.appendChild(newCheckBox);
            removeTask.appendChild(removeBtn);
/** Creating task details */
            var info = this.getTaskDetails(row);// appended to row instead of "td" to be sure that only done task is crossed
/**Displaying task details */
            infoIcon.onmouseenter = function () {
                self.displayTaskDetails(infoIcon);
            };
            infoIcon.onmouseleave = function () {
                self.displayTaskDetails(infoIcon);
                };
            }
        }
    pageElements.getRowsAmount();
    }
};
