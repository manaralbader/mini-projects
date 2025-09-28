const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === '') { // Check if input is empty
        alert("You must write something!");
    } else {
        let li = document.createElement("li"); // Create a new list item
        li.innerHTML = inputBox.value; // Set the input value as the list item's content
        listContainer.appendChild(li); // Display the new list item
        let span = document.createElement("span"); // Create a new span element so we can cross out the task
        span.innerHTML = "\u00d7"; // Set the content of the span to (×)
        li.appendChild(span); // Display the span in the list item
    }
    inputBox.value = ""; // Clear the input box
    saveData(); // Save the updated list to local storage
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") { // Check if the clicked element is a list item
        e.target.classList.toggle("checked"); // Toggle the "checked" class to cross out the task
        saveData(); // Save the updated list to local storage
    } else if(e.target.tagName === "SPAN") { // Check if the clicked element is a span (the ×)
        e.target.parentElement.remove(); // Remove the parent list item (the task)
        saveData(); // Save the updated list to local storage
    }
}, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask(); // Load and display the saved tasks when the page loads