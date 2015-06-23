window.onload = function () {
  var newTask = document.getElementById("newTaskEntry"),
      table = document.getElementById("outcomeTable");


  newEntry.startTime();// first run to be sure that there is not deley in time
  setInterval (function(){
    newEntry.startTime();
  }, 1000);

  newEntry.execute(newTask,table);

  function displayTask() {
    newEntry.startTime();
    newEntry.createWarningMessage();
    newEntry.retrieveTask();
    pageElements.getRowsAmount();
    newEntry.disableTaskEntry();
  }
};

