document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to all edit buttons
    var editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            editRow(button.closest("tr"));
        });
    });

    // Add event listeners to all save buttons
    var saveButtons = document.querySelectorAll(".saveBtn");
    saveButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            saveRow(button.closest("tr"));
        });
    });
});

function editRow(row) {
    // Get the cells of the row
    var cells = row.cells;

    // Replace cell content with input fields for editing
    for (var i = 0; i < cells.length - 1; i++) {
        var currentValue = cells[i].textContent.trim();
        cells[i].innerHTML = "<input type='text' value='" + currentValue + "'>";
    }

    // Change the edit button to a save button
    var editButton = row.querySelector(".editBtn");
    editButton.classList.add("d-none");

    var saveButton = row.querySelector(".saveBtn");
    saveButton.classList.remove("d-none");
}

function saveRow(row) {
    // Get the cells of the row
    var cells = row.cells;

    // Extract values from input fields
    var newData = [];
    for (var i = 0; i < cells.length - 1; i++) {
        var inputValue = cells[i].querySelector("input").value.trim();
        newData.push(inputValue);
    }

    // Update cell content with new values
    for (var i = 0; i < cells.length - 1; i++) {
        cells[i].textContent = newData[i];
    }

    // Change the save button to an edit button
    var saveButton = row.querySelector(".saveBtn");
    saveButton.classList.add("d-none");

    var editButton = row.querySelector(".editBtn");
    editButton.classList.remove("d-none");
}
