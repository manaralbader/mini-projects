# Todo List App

## Project Overview

This is a simple todo list application built with vanilla JavaScript, HTML, and CSS. It allows users to add, mark as complete, and delete tasks. The app uses the browser's localStorage to save data locally, so tasks persist even after closing the browser.

**Features:**
- Add new tasks to the list
- Mark tasks as complete (cross them out)
- Delete tasks permanently
- Data persistence using localStorage
- Simple and clean user interface

## JavaScript Breakdown

### DOM Element Selection
```javascript
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
```

**What is `getElementById`?**
- `document.getElementById()` finds and returns an HTML element by its unique ID
- `inputBox` refers to the text input where users type new tasks
- `listContainer` refers to the `<ul>` element that holds all the task items
- These create JavaScript references to HTML elements for manipulation

### Adding New Tasks
```javascript
function addTask() {
    if(inputBox.value === '') { // Check if input is empty
        alert("You must write something!");
    } else {
        let li = document.createElement("li"); // Create a new list item
        li.innerHTML = inputBox.value; // Set the input value as the list item's content
        listContainer.appendChild(li); // Display the new list item
        let span = document.createElement("span"); // Create a new span element
        span.innerHTML = "\u00d7"; // Set the content of the span to (×)
        li.appendChild(span); // Display the span in the list item
    }
    inputBox.value = ""; // Clear the input box
    saveData(); // Save the updated list to local storage
}
```

**Key concepts explained:**

- **Input validation**: Checks if the user entered something before creating a task
- **`document.createElement()`**: Creates new HTML elements dynamically
- **`innerHTML`**: Sets or gets the HTML content inside an element
- **`appendChild()`**: Adds a new element as a child to another element
- **`\u00d7`**: Unicode character for the × symbol (multiplication sign)

### Event Handling for Task Management
```javascript
listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") { // Check if the clicked element is a list item
        e.target.classList.toggle("checked"); // Toggle the "checked" class
        saveData(); // Save the updated list to local storage
    } else if(e.target.tagName === "SPAN") { // Check if the clicked element is a span (the ×)
        e.target.parentElement.remove(); // Remove the parent list item
        saveData(); // Save the updated list to local storage
    }
}, false);
```

**What does this do?**
- **Event delegation**: One event listener handles clicks on all tasks (current and future)
- **`e.target`**: The specific element that was clicked
- **`classList.toggle()`**: Adds or removes a CSS class (for styling completed tasks)
- **`parentElement.remove()`**: Deletes the entire task when the × is clicked

### Local Storage for Data Persistence
```javascript
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask(); // Load and display the saved tasks when the page loads
```

**What is localStorage?**
- **localStorage**: Browser storage that keeps data even after closing the browser
- **`setItem(key, value)`**: Saves data with a specific key name
- **`getItem(key)`**: Retrieves saved data using the key
- **Data persistence**: Tasks remain when you refresh or close the page

## Methods Used

### DOM Manipulation Methods
- `document.getElementById()` - Select elements by ID
- `document.createElement()` - Create new HTML elements
- `appendChild()` - Add elements to the page
- `innerHTML` - Set/get HTML content
- `classList.toggle()` - Add/remove CSS classes
- `remove()` - Delete elements from the page

### Event Handling Methods
- `addEventListener()` - Listen for user interactions
- Event delegation - Handle events on multiple elements efficiently

### Browser Storage Methods
- `localStorage.setItem()` - Save data locally
- `localStorage.getItem()` - Retrieve saved data

## Key Learning Outcomes

### 1. **DOM Manipulation**
- Creating and modifying HTML elements with JavaScript
- Understanding the relationship between HTML structure and JavaScript functionality

### 2. **Event Handling**
- Using event listeners to respond to user interactions
- Event delegation for efficient event management
- Understanding event objects and target elements

### 3. **Data Persistence with localStorage**
- Saving application state in the browser
- Retrieving and restoring saved data
- Understanding client-side storage limitations

### 4. **Input Validation**
- Checking user input before processing
- Providing feedback for invalid inputs

## Recommendations for Improvement

### 1. **Better Input Validation**
```javascript
function addTask() {
    const taskText = inputBox.value.trim();
    if(taskText === '') {
        alert("Please enter a task!");
        return;
    }
    // ... rest of the function
}
```

### 2. **Edit Functionality**
Add the ability to edit existing tasks by double-clicking them.

### 3. **Task Counter**
Display the number of total and completed tasks.

### 4. **Clear All Tasks**
Add a button to clear all tasks at once.

### 5. **Task Categories**
Allow users to organize tasks into different categories or lists.

### 6. **Due Dates**
Add date functionality to set deadlines for tasks.

## Next Steps for Learning

1. **Practice DOM manipulation** - Try creating more complex HTML structures with JavaScript
2. **Learn about CSS classes** - Understand how to style elements dynamically
3. **Explore more storage options** - Learn about sessionStorage vs localStorage
4. **Study event handling** - Practice with different types of events (keyboard, mouse, etc.)
5. **Learn about data structures** - Store tasks as objects instead of just HTML strings
