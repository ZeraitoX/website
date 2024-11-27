// Extended Task Manager Application with Additional Features

// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('tasks');
const clearCompletedButton = document.getElementById('clear-completed');
const filterAllButton = document.getElementById('filter-all');
const filterCompletedButton = document.getElementById('filter-completed');
const filterPendingButton = document.getElementById('filter-pending');
const filterPriorityButton = document.getElementById('filter-priority');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');
const taskDescriptionInput = document.getElementById('task-description');
const taskTagsInput = document.getElementById('task-tags');
const backupButton = document.getElementById('backup-btn');
const restoreButton = document.getElementById('restore-btn');
const userLoginButton = document.getElementById('login-btn');
const userLogoutButton = document.getElementById('logout-btn');
const darkModeButton = document.getElementById('dark-mode-btn');
const taskProgressInput = document.getElementById('task-progress');
const categorySelect = document.getElementById('category-select');
const taskHistoryButton = document.getElementById('task-history-btn');
const calendarViewButton = document.getElementById('calendar-view-btn');
const tagFilterButton = document.getElementById('tag-filter-btn');
const taskChartButton = document.getElementById('task-chart-btn');
const taskCategoryInput = document.getElementById('task-category-input');
const taskSubtaskButton = document.getElementById('subtask-btn');
const taskTagsSearchInput = document.getElementById('tags-search-input');
const loginModal = document.getElementById('login-modal');
const signUpButton = document.getElementById('signup-btn');
const darkModeSwitch = document.getElementById('dark-mode-switch');
const taskNotificationButton = document.getElementById('task-notification-btn');

// Store tasks in an array (could use backend or Firebase for storage)
let tasks = [];
let taskHistory = [];
let categories = ['Work', 'Personal', 'Urgent'];
let tags = [];
let subtasks = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// User login validation function with password encryption
function validateUserCredentials(username, password) {
    const user = users.find(u => u.username === username);
    if (user && decryptPassword(user.password) === password) {
        return user;
    }
    return null;
}

// Simple password encryption (for demonstration purposes)
function encryptPassword(password) {
    return btoa(password);  // Basic Base64 encoding as "encryption"
}

// Simple password decryption (for demonstration purposes)
function decryptPassword(encryptedPassword) {
    return atob(encryptedPassword);  // Base64 decoding to retrieve the password
}

// Function to register a new user
function registerUser() {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    const encryptedPassword = encryptPassword(password);
    const newUser = { username, password: encryptedPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
}

// Function to login a user
function loginUser() {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    const user = validateUserCredentials(username, password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        checkUserStatus();
        loadTasks();
    } else {
        alert('Invalid login credentials');
    }
}

// Function to logout a user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    checkUserStatus();
}

// Check user login status
function checkUserStatus() {
    if (currentUser) {
        document.getElementById('welcome-message').textContent = `Welcome, ${currentUser.username}`;
        userLoginButton.style.display = 'none';
        userLogoutButton.style.display = 'inline';
    } else {
        document.getElementById('welcome-message').textContent = 'Please log in';
        userLoginButton.style.display = 'inline';
        userLogoutButton.style.display = 'none';
    }
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const category = taskCategoryInput.value;
    const tagsInput = taskTagsInput.value.trim().split(',').map(tag => tag.trim());
    const progress = taskProgressInput.value.trim() || '0%';

    if (taskText && currentUser) {
        const newTask = {
            text: taskText,
            priority,
            completed: false,
            dueDate,
            category,
            tags: tagsInput,
            progress,
            description: "",
            subtasks: []
        };
        tasks.push(newTask);
        taskInput.value = '';
        taskTagsInput.value = '';
        taskProgressInput.value = '0%';
        renderTasks();
        saveToLocalStorage();
        logHistory('added', newTask);
    } else {
        alert('Please log in or enter a valid task.');
    }
}

// Render tasks based on filters and state
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item');
        if (task.completed) taskElement.classList.add('completed');
        taskElement.classList.add(`priority-${task.priority}`);
        taskElement.classList.add(`category-${task.category.toLowerCase()}`);
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <span class="due-date">${task.dueDate ? `Due: ${task.dueDate}` : ''}</span>
            <span class="category">${task.category}</span>
            <span class="tags">${task.tags.join(', ')}</span>
            <span class="progress">${task.progress}</span>
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="showSubtasks(${index})">Subtasks</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Toggle task completion state
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveToLocalStorage();
    logHistory('toggled', tasks[index]);
}

// Delete a task
function deleteTask(index) {
    const task = tasks.splice(index, 1)[0];
    renderTasks();
    saveToLocalStorage();
    logHistory('deleted', task);
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    taskDescriptionInput.value = task.description;
    taskTagsInput.value = task.tags.join(', ');
    taskProgressInput.value = task.progress;
    taskCategoryInput.value = task.category;
    modal.style.display = 'block';

    modalCloseButton.onclick = () => {
        task.description = taskDescriptionInput.value;
        task.tags = taskTagsInput.value.split(',').map(tag => tag.trim());
        task.progress = taskProgressInput.value.trim();
        task.category = taskCategoryInput.value;
        renderTasks();
        saveToLocalStorage();
        logHistory('edited', task);
        modal.style.display = 'none';
    };
}

// Task History Log
function logHistory(action, task) {
    const timestamp = new Date().toLocaleString();
    taskHistory.push({ action, task, timestamp });
    localStorage.setItem('taskHistory', JSON.stringify(taskHistory));
}

// Filter tasks by due date, priority, etc.
function filterTasksByCriteria(criteria, value) {
    return tasks.filter(task => task[criteria] === value);
}

// Save tasks to local storage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Backup and restore tasks
function backupTasks() {
    const blob = new Blob([JSON.stringify(tasks)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks_backup.json';
    link.click();
}

function restoreTasks(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        tasks = JSON.parse(reader.result);
        renderTasks();
        saveToLocalStorage();
    };
    reader.readAsText(file);
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
clearCompletedButton.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));
filterAllButton.addEventListener('click', () => renderTasks(tasks));
filterCompletedButton.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));
filterPendingButton.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));
filterPriorityButton.addEventListener('click', () => renderTasks(tasks.sort((a, b) => a.priority.localeCompare(b.priority))));
searchInput.addEventListener('input', (e) => renderTasks(tasks.filter(task => task.text.toLowerCase().includes(e.target.value.toLowerCase()))));
backupButton.addEventListener('click', backupTasks);
restoreButton.addEventListener('change', restoreTasks);
userLoginButton.addEventListener('click', loginUser);
userLogoutButton.addEventListener('click', logoutUser);
darkModeButton.addEventListener('click', toggleDarkMode);
taskHistoryButton.addEventListener('click', () => console.log(taskHistory));

// Load tasks and user status on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    checkUserStatus();
});

