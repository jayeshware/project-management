// Get references to DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
let tasks = getTasksFromLocalStorage();


// Debounce Function 
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }
  

  function filterTasks(searchTerm) {
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(taskItem => {
      const text = taskItem.querySelector('span').textContent.toLowerCase();
      if (text.includes(searchTerm.toLowerCase())) {
        taskItem.style.display = 'flex';
      } else {
        taskItem.style.display = 'none';
      }
    });
  }
  
  searchInput.addEventListener('input', debounce((event) => {
    const searchTerm = event.target.value.trim();
    filterTasks(searchTerm);
  }, 300)); // 300ms delay
  


function createTaskElement(taskText) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
  
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('delete-btn');
  
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn);
  
    return taskItem;
  }
  

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
      const taskElement = createTaskElement(taskText);
      taskList.appendChild(taskElement);
  
      tasks.push(taskText); // Add to array
      saveTasksToLocalStorage(tasks); // Save updated array
  
      taskInput.value = '';
    } else {
      alert('Please enter a task!');
    }
  });
  
  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector('span').textContent;
  
      // Remove from array
      tasks = tasks.filter(task => task !== taskText);
      saveTasksToLocalStorage(tasks);
  
      // Remove from UI
      taskList.removeChild(taskItem);
    }
  });
  


  // Save tasks to LocalStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Get tasks from LocalStorage
  function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
  

  // Load tasks from LocalStorage on page load
function loadTasks() {
    tasks.forEach(taskText => {
      const taskElement = createTaskElement(taskText);
      taskList.appendChild(taskElement);
    });
  }
  
  loadTasks();
  