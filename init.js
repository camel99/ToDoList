window.onload = function () {
  var
      table = document.getElementById("outcomeTable"),
      value = '.taskOutcome',
      name = 'task';

  newEntry.startTime();// first run to be sure that there is no delay in current time
  setInterval (function(){
  newEntry.startTime();
  }, 1000);

  newEntry.execute(table,value, name);
  storeItems.retrieveFromLocalStorage(table,name);

};

