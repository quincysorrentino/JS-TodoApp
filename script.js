// Task class definition
class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}

// Global variables
let tasks = [];

// Utility function to update the current date display
function setDate() {
    let date = new Date().toLocaleString();
    document.getElementById("currentDateDisplay").textContent = date;
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks in the task list
function renderTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) {
        console.error("Error: taskList element not found!");
        return;
    }

    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        let listItem = document.createElement("li");

        // Check if the due date has passed and set the color to red if it has
        let dueDateStyle = isDueDatePassed(task.dueDate) ? 'background-color: rgb(255, 50, 50);' : '';

        // Create the custom task item structure
        listItem.innerHTML = `
            <div id="taskDisplayContainer" style="${dueDateStyle}">
                <div id="taskDisplayTextContainer" style="${dueDateStyle}">
                    <p class="taskDisplayText">${task.title}</p>
                    <p class="taskDisplayText">${task.description}</p>
                    <p class="taskDisplayText">${task.dueDate}</p>
                </div>
                <input type="checkbox" id="statusCheckBox-${index}" data-index="${index}">
            </div>
        `;

        taskList.prepend(listItem); // Add new tasks to the front

        // Attach event listener to the checkbox for removing tasks
        listItem.querySelector(`#statusCheckBox-${index}`).addEventListener("change", function () {
            setTimeout(() => {
                removeTask(index);
            }, 200);
        });
    });
}

// Function to add a new task
function addTask() {
    let name = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionInput").value;
    let dueDate = new Date(document.getElementById("dueDateInput").value).toLocaleString("en-US");

    // Input validation
    if (!name) {
        alert("Please enter a task name");
        return;
    }

    if (!description) {
        alert("Please enter a task description");
        return;
    }

    if (!dueDate) {
        alert("Please select a due date");
        return;
    }

    // Create and add the new task
    let newTask = new Task(name, description, dueDate);
    tasks.push(newTask);

    saveTasks();

    renderTasks();

    // Clear input fields
    document.getElementById("titleInput").value = null;
    document.getElementById("descriptionInput").value = null;
    document.getElementById("dueDateInput").value = null;
}

// Function to remove a task by index
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to check if the due date has passed
function isDueDatePassed(dueDate) {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate; // Returns true if due date is in the past
}

// Initialize the app on window load
window.onload = () => {
    // Load persistent storage
    loadTasks()
    // Update the current date every second
    setInterval(setDate, 1000);

    renderTasks();

    // Attach event listener to the "Add Task" button
    document.getElementById("addTaskButton").addEventListener("click", addTask);
};
