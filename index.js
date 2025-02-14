// Grocery list functionality
let groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];

const groceryList = document.getElementById('groceryList');
const groceryItemInput = document.getElementById('groceryItemInput');
const addGroceryButton = document.getElementById('addGroceryButton');
const removeGroceryListButton = document.getElementById('removeGroceryListButton');

// Load grocery items from localStorage
groceryItems.forEach(item => createGroceryElement(item));

addGroceryButton.addEventListener('click', function() {
    const groceryValue = groceryItemInput.value.trim();

    if (groceryValue === '') {
        alert('Please enter a grocery item.');
        return;
    }

    if (groceryItems.length >= 2) {
        alert('You can only add a maximum of 2 items at the moment.');
        return;
    }

    createGroceryElement(groceryValue);
    groceryItems.push(groceryValue);
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    groceryItemInput.value = '';

    if (groceryItems.length === 2) {
        removeGroceryListButton.style.display = 'block'; // Show the remove button when 2 items are added
    }
});

removeGroceryListButton.addEventListener('click', function() {
    groceryList.innerHTML = ''; // Clear the grocery list
    groceryItems = [];
    localStorage.removeItem('groceryItems'); // Clear grocery items from localStorage
    removeGroceryListButton.style.display = 'none'; // Hide remove button
});

function createGroceryElement(groceryValue) {
    const li = document.createElement('li');
    li.innerText = groceryValue;

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.addEventListener('click', function() {
        groceryList.removeChild(li);
        groceryItems.splice(groceryItems.indexOf(groceryValue), 1);
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems));

        if (groceryItems.length < 2) {
            removeGroceryListButton.style.display = 'none'; // Hide remove button if less than 2 items
        }
    });

    li.appendChild(removeButton);
    groceryList.appendChild(li);
}

// Agenda functionality
const agendaItemsContainer = document.getElementById('agendaItems');
const agendaItemInput = document.getElementById('agendaItemInput');
const agendaDateInput = document.getElementById('agendaDateInput');
let agendaItems = JSON.parse(localStorage.getItem('agendaItems')) || [];

// Load agenda items from localStorage
agendaItems.forEach(item => createAgendaElement(item));

document.getElementById('addAgendaButton').addEventListener('click', function() {
    const agendaItem = agendaItemInput.value.trim();
    const date = agendaDateInput.value;

    if (agendaItem && date) {
        createAgendaElement({ item: agendaItem, date: date });
        agendaItems.push({ item: agendaItem, date: date });
        localStorage.setItem('agendaItems', JSON.stringify(agendaItems));
        agendaItemInput.value = '';
        agendaDateInput.value = ''; // Reset date picker
    } else {
        alert('Please provide both an agenda item and a date.');
    }
});

function createAgendaElement(agenda) {
    const li = document.createElement('li');
    li.innerText = `${agenda.item} - ${agenda.date}`;

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.addEventListener('click', function() {
        agendaItemsContainer.removeChild(li);
        agendaItems = agendaItems.filter(item => item.item !== agenda.item || item.date !== agenda.date);
        localStorage.setItem('agendaItems', JSON.stringify(agendaItems));
    });

    li.appendChild(removeButton);
    agendaItemsContainer.appendChild(li);
}

// Planner functionality
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => createTaskElement(task));

addTaskButton.addEventListener('click', function() {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task.');
        return;
    }

    createTaskElement(taskValue);
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
});

function createTaskElement(taskValue) {
  const li = document.createElement('li');
  li.innerText = taskValue;

  const removeButton = document.createElement('button');
  removeButton.innerHTML = '<i class="fas fa-check"></i>';
  removeButton.addEventListener('click', function() {
      taskList.removeChild(li);
      const index = tasks.indexOf(taskValue);
      if (index > -1) {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
      }
  });

  li.appendChild(removeButton);
  taskList.appendChild(li);
}

// Navigation functions
document.getElementById('plannerButton').addEventListener('click', function() {
  showPlanner();
});

document.getElementById('agendaButton').addEventListener('click', function() {
  showAgenda();
});

document.getElementById('groceryButton').addEventListener('click', function() {
  showGroceryList();
});

// Function to show the planner section
function showPlanner() {
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('plannerContainer').style.display = 'block';
  document.getElementById('agendaContainer').style.display = 'none';
  document.getElementById('groceryContainer').style.display = 'none';
}

// Function to show the agenda section
function showAgenda() {
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('plannerContainer').style.display = 'none';
  document.getElementById('agendaContainer').style.display = 'block';
  document.getElementById('groceryContainer').style.display = 'none';
}

// Function to show the grocery list section
function showGroceryList() {
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('plannerContainer').style.display = 'none';
  document.getElementById('agendaContainer').style.display = 'none';
  document.getElementById('groceryContainer').style.display = 'block';
}

// Function to show the home section
function showHome() {
  document.getElementById('homeContainer').style.display = 'block';
  document.getElementById('plannerContainer').style.display = 'none';
  document.getElementById('agendaContainer').style.display = 'none';
  document.getElementById('groceryContainer').style.display = 'none';
}