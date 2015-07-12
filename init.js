window.onload = function () {
  var newTask = document.getElementById("newTaskEntry"),
      table = document.getElementById("outcomeTable"),
      value = '.taskOutcome',
      name = 'task';

  newEntry.startTime();// first run to be sure that there is no delay in current time
  setInterval (function(){
  newEntry.startTime();
  }, 1000);

  newEntry.execute(newTask,table,value, name);
  newEntry.retrieveFromLocalStorage(newTask,table);

  function displayTask() {
    newEntry.startTime();
    newEntry.createWarningMessage();
    newEntry.retrieveTask(newTask, table);
    pageElements.getRowsAmount();
    newEntry.disableTaskEntry();
  }
};

