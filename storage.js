var storeItems = {
    /** Adding new task entry to local storage */
    saveInLocalStorage: function () {
        var text = document.querySelectorAll('.taskOutcome');
        var items = [];
        for (var i = 0; i < text.length; i++) {
            var note = text[i].textContent;
            items.unshift(note);
        }
        localStorage.setItem('task', JSON.stringify(items));
    }
// items ='.taskOutcome'
    //storageName ='task'

}