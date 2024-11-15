document.addEventListener("DOMContentLoaded", loadTasks);
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach(task=> addTaskToDOM(task));
}
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === ""){
        alert("please enter a task.");
        return;
    }
    const task ={id: Date.now(), text: taskText };
    addTaskToDom(task);
    saveTaskToLocalStorage(task);

    taskInput.value ="";

}
function addTaskToDOM(task) { 
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.className= "task-item";
    listItem.setAttribute("data-id", task.id);
}

listItem.innerHTML = `
    <span>${task.text}</span>
    <div>
        <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
    </div>
`;
taskList.appendChild(listItem);

// Function to save task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit a task
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
    
    const newTaskText = prompt("Edit your task:", tasks[taskIndex].text);
    if (newTaskText === null || newTaskText.trim() === "") return;

    tasks[taskIndex].text = newTaskText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update the task in the DOM
    const taskListItem = document.querySelector(`li[data-id='${taskId}']`);
    if (taskListItem) {
        
        taskListItem.querySelector("span").textContent = newTaskText;
    }
}

// Delete a task
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Remove the task from the DOM
    const taskListItem = document.querySelector(`li[data-id='${taskId}']`);
    if (taskListItem) {
        taskListItem.remove();
    }
}
