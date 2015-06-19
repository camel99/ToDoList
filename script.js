/*
 * Display new task
 */
function displayTask() {
	createWarningMessage();
	retrieveTask();
	getRowsAmount();
	disableTaskEntry();
}
/*
 * Retrieve text from textArea
 */
function retrieveTask() {
	var newTask = document.getElementById("newTaskEntry").value;
	if(newTask.length != 0) {

		var table = document.getElementById("outcomeTable"),
			row = table.insertRow(0),
			taskCell = row.insertCell(0),
			checkBoxCell = row.insertCell(1),
			deleteCell = row.insertCell(2),
			newTask = document.getElementById("newTaskEntry").value,
			text = document.createTextNode(newTask),
			newCheckBox = createNewCheckBox(),
			deleteBtn = createNewDeleteButton(row);

		row.className = 'newTaskEntry';
		taskCell.className = 'taskOutcome';
		checkBoxCell.className = 'checkBoxOutcome';
		deleteCell.className = 'deleteOutcome';

		taskCell.appendChild(text);
		//taskCell.parentNode.appendChild(taskCell);
		checkBoxCell.appendChild(newCheckBox);
		deleteCell.appendChild(deleteBtn);

		return row;
	}
}
/*
 * CheckBox indicates that task has been done
 */
function createNewCheckBox() {
	var checkBox = document.createElement("INPUT");
	checkBox.type = 'checkBox';
	checkBox.name = 'isDone';
	checkBox.className='taskCheckBox';
	checkBox.setAttribute("onClick", "taskCrossing(event)");

	return checkBox;
}
/*
 * Create new cancel button and refresh rows amount
 *
 * @param parentElement indicate the row to which certain td belongs
 */
function createNewDeleteButton(parentElement){
	var btn = document.createElement("i");
    btn.className='fa fa-times fa-2x';
	btn.onclick = function () {

    parentElement.parentNode.removeChild(parentElement);

		getRowsAmount();
		disableTaskEntry();

  };

	return btn;

}
/*
 * Removing all displayed tasks and clearing rows amount
 */
function removeAllTasks()
{
	var parent = document.getElementById('outcomeTable');
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}

	getRowsAmount();
}

function deleteTask(parentElement){
	var element = document.getElementsByClassName('fa fa-times fa-2x');
	element.onclick = function () {

		parentElement.parentNode.removeChild(parentElement);

	};
}
/*
 * Removing task from the list
 *
 * @param elementId indicates the attribute from which text should be removed
 */
function clearEntry(elementId) {
	document.getElementById(elementId).setAttribute("text","");
}
/*
 * Strike the done task.
 */
function crossTask(parametr) {
	parametr.setAttribute("style", "text-decoration:line-through")
}
/*
 * Set text-decoration none
 */
function removeCrossedTask(parametr) {
	parametr.setAttribute("style", "text-decoration:none")
}
/*
 * Function used to check whether the task is completed or not
 */
function taskCrossing(e){
	console.log(e);
	var checkTask = e.target;
	console.log(checkTask);
	var x = checkTask.parentNode.parentNode.getElementsByClassName('taskOutcome')[0];
	if (checkTask.checked) {
		crossTask(x);
	} else {
		removeCrossedTask(x);
	}
}
/*
 * Displaying warning message if task box is empty
 */
function isTaskBoxEmpty(){
	var newTask = document.getElementById("newTaskEntry").value;
	if(newTask.length <= 0){
	var paragraph = document.createElement("P"),
		node = document.createTextNode("* Task box cannot be empty. Please enter new task.");
		paragraph.className= "warningMessage";
		paragraph.appendChild(node);
	document.getElementById("todoList").appendChild(paragraph);

	}
}
/*
 * Check if warning message exists, if no create new one
 */
function createWarningMessage(){
	var hasClass = document.getElementsByClassName("warningMessage").length;
	if(hasClass >0){
		return;
	}
	else{
		isTaskBoxEmpty();
	}
}
/*
 * Display current time
 */
function startTime() {
	var today = new Date(),
		hour = today.getHours(),
		minute = today.getMinutes(),
		second = today.getSeconds();
	hour = (hour < 10 ? "0" : "") + hour;
	minute =(minute <10 ? "0" : "") + minute;
	second = (second < 10 ? "0" : "") + second;
	var currentTime = hour + ":" + minute + ":" + second;
	document.getElementById("currentTime").innerHTML = currentTime;
}

/*
 * Get amount of rows in tableOutcome
 */
function getRowsAmount(){
	var rowsAmount = document.getElementsByTagName("tr").length;
	document.getElementById("countRows").innerHTML = rowsAmount;

	return rowsAmount;
}

/*
 * Disable new task field and submit button if added rows are equal to 4
 */
function disableTaskEntry(){
	var rowsAmount = getRowsAmount(),
	    taskEntry = document.getElementById('newTaskEntry'),
	    newPlaceholder = document.createTextNode("You are allowed to add only 4 tasks.");
	if(rowsAmount == 4){
		document.getElementById('newTaskEntry').disabled =true;
		document.getElementById('submit').disabled = true;
		taskEntry.appendChild(newPlaceholder);
	}
	else{
		document.getElementById('newTaskEntry').disabled = false;
		document.getElementById('submit').disabled = false;
	}

}



