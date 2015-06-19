
var app = app || {};


app.todolist = (function () {

  var textarea,
    btn;


  return  {

    init: function (textareaEl, btnEl) {

      /*
       * tu sobie przypisuje elementy ktore przekazuje
       * sobie w init.js do moich lokalnych zmiennych ktore widzisz na gorze
       * textarea, btn
       *
       */
      textarea = textareaEl;
      btn = btnEl;

    },

    bindEvents: function () {

      /**
       * Wiem ze init zostalo wykonane w pliku init.js
       * Dlatego wiem, ze btn jest tym przyciskiem do dodawania taskow
       * wiec dodaje sobie akcje na onclick;
       */
      btn.onclick = function () {
        alert(textarea.value);
      }

    }

  }
}());