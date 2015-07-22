var storeItems = {
    /** Adding new task entry to local storage */
    saveInLocalStorage: function (value, keyName) {
        var text = document.querySelectorAll(value),
            items = [],
            self = this;
        for (var i = 0; i < text.length; i++) {
            var note = text[i].textContent;
            items.unshift(note);
        }
        var checkBoxStates = self.getCheckBoxState();
        localStorage.setItem(keyName, JSON.stringify(items));
        localStorage.setItem('btnState', JSON.stringify(checkBoxStates));

    },
    /** Removing all items from local storage */
    removeItemsFromLocalStorage: function (storageKeyName) {
        var localStorageName = storageKeyName;
        if (localStorageName) {
            localStorage.removeItem(localStorageName);
        }
    },
    /** Retrieving items from local storage */

    getLocalStorageItems: function (name) {
        if (localStorage.getItem(name)) {

            var tasks = JSON.parse(localStorage.getItem(name));
            var checkBoxStates = JSON.parse(localStorage.getItem('btnState'));

            return {
                tasks: tasks,
                checkBoxStates: checkBoxStates
            }
        }
    },
    /** Retrieve task from local storage */
    retrieveFromLocalStorage: function (table, name) {
        var self = this,
            localStorageItems = self.getLocalStorageItems(name);
        if (localStorageItems.tasks) {
            var itemsAmount = localStorageItems.tasks.length;
            for (var i = 0; i < itemsAmount; i++) {
                newEntry.displayNewTask(localStorageItems.tasks[i], table, localStorageItems.checkBoxStates[i]);
            }
        }
        pageElements.getCheckBoxState();
        pageElements.crossedAllCheckedTasks();
        pageElements.getRowsAmount();
    },
    getCheckBoxState: function () {
        var elements = document.querySelectorAll('.taskCheckBox'),
            checkBoxStates = [];
        for (var i = 0; i < elements.length; i++) {
            checkBoxStates.unshift(elements[i].getAttribute('data-state'));
        }

        return checkBoxStates;
    }
}





























