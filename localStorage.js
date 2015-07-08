var storeItems = {
    /** Adding new task entry to local storage */
    saveInLocalStorage: function (value, name) {
        var text = document.querySelectorAll(value);
        var items = [];
        for (var i = 0; i < text.length; i++) {
            var note = text[i].textContent;
            items.unshift(note);
        }
        localStorage.setItem(name, JSON.stringify(items));
    }
// items ='.taskOutcome'
    //storageName ='task'

}