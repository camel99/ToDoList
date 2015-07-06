window.onload = function () {
  var newTask = document.getElementById("newTaskEntry"),
      table = document.getElementById("outcomeTable");

  newEntry.startTime();// first run to be sure that there is no delay in current time
  setInterval (function(){
  newEntry.startTime();
  }, 1000);

  newEntry.execute(newTask,table);
  newEntry.retrieveFromLocalStorage(newTask,table);

  function displayTask() {
    newEntry.startTime();
    newEntry.createWarningMessage();
    newEntry.retrieveTask();
    pageElements.getRowsAmount();
    newEntry.disableTaskEntry();
  }
};

