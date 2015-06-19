window.onload = function () {

  var watchEl = document.getElementById('currentTime'),
    textarea = document.getElementById('newTaskEntry'),
    addButton =  document.getElementById('submit');

  app.todolist.init(textarea, addButton);
  app.todolist.bindEvents();
  app.watch.initWatch(watchEl);

};