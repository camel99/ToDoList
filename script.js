/*
 * Display new task
 */
function displayTask() {
	createWarningMessage();
	retrieveTask();
	getRowsAmount();
	disableTaskEntry();
	//createTaskDetails();
}
/*
 * Retrieve text from textArea
 */
function retrieveTask() {
	var newTask = document.getElementById("newTaskEntry").value;
	if(newTask.length != 0) {

		var table = document.getElementById("outcomeTable"),
			row = table.insertRow(0),
			task = row.insertCell(0),
			taskInfo = row.insertCell(1),
			checkBox = row.insertCell(2),
			removeTask = row.insertCell(3),
			text = document.createTextNode(newTask),
			newCheckBox = createNewCheckBox(),
			removeBtn = createNewDeleteButton(row);

		row.className = 'newTaskEntry';
		row.id = 'rowNumber_' + getRowsAmount();
		task.className = 'taskOutcome';
		taskInfo.className = 'fa fa-info-circle fa-2x';
		taskInfo.id = 'info'+getRowsAmount();
		checkBox.className = 'checkBoxOutcome';
		removeTask.className = 'deleteOutcome';
		task.appendChild(text);
		checkBox.appendChild(newCheckBox);
		removeTask.appendChild(removeBtn);
		var info = getTaskDetails();

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
/*
 * Display information about task
 */

 function getTaskDetails(){
	 var taskDetail = document.createElement('div');
	     taskDetail.className = "alert alert-info";
	 	taskDetail.id= 'detail'+getRowsAmount();
	 var currentDate = currentDatum();
	 var message = document.createTextNode('Task created: ' + currentDate);
	 taskDetail.appendChild(message);
	 console.log(taskDetail);
	 var row = getRowsAmount();
	 var parent = document.querySelector("#rowNumber_"+row);
	     parent.appendChild(taskDetail);

	 //return taskDetail;
 }

/*
 * Return current formated date and hour
 */
function currentDatum(){
	function leadingZero(i){
		return (i<10) ? '0'+i : i ;
	}
	var daysMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var monthMapping =["Jan.","Feb.","Mar","Apr.","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."];
	var curDate = new Date(),
		year = curDate.getFullYear(),
		month = curDate.getMonth(),
		dayNo = leadingZero(curDate.getDate()),
		day = curDate.getDay(),
		hour =leadingZero(curDate.getHours()),
		min = leadingZero(curDate.getMinutes()),
		sec = leadingZero(curDate.getSeconds()),
		full = daysMapping[day] +", " + dayNo +"-" + monthMapping[month] +"-" + year +" " + hour + ":" + min + ":" + sec ;

	return full;
}

function click(){
	var x = document.getElementById('tester');
	    x.onclick = alert("doopa");
}