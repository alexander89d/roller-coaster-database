/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '7994';

/* Display table data once DOM content has loaded */
document.addEventListener("DOMContentLoaded", displayCoastersTable);

/* Function to make an AJAX request to API to display data table. */
function displayCoastersTable () {
    /* Initialize Ajax Request */
    var req = new XMLHttpRequest();
    req.open("GET", FLIP + PORT + "/select-all-coasters", true);
    
    req.addEventListener("load", function generateRows() {
        /* If there was no error, display rows. */
        if (req.status >= 200 && req.status < 400) {
            var res = JSON.parse(req.responseText);
            
            /* If there are no rows to display, inform the user */
            if (res.length == 0) {
                var noDataMessage = document.getElementById('no_data_rcdb_coasters');
                noDataMessage.style.display = 'block';
            }
            
            /* Otherwise, create a table with the coasters data. */
            else {
                var coasterTable = document.getElementById('coaster_table');
                coasterTable.style.display = 'block';
                for (var row of res) {
                    var newRow = document.createElement("tr");
                    
                    newRow.id = row.id;
            
                    var nameCell = document.createElement("td");
                    nameCell.textContent = row.name;
                    newRow.appendChild(nameCell);
            
                    var parkCell = document.createElement("td");
                    parkCell.textContent = row.park;
                    newRow.appendChild(parkCell);
            
                    var manufacturerCell = document.createElement("td");
                    manufacturerCell.textContent = row.manufacturer;
                    newRow.appendChild(manufacturerCell);
                    
                    var yearOpenedCell = document.createElement("td");
                    yearOpenedCell.textContent = row.year_opened;
                    newRow.appendChild(yearOpenedCell);
                    
                    var heightCell = document.createElement("td");
                    heightCell.textContent = row.height;
                    newRow.appendChild(heightCell);
                    
                    var maxSpeedCell = document.createElement("td");
                    maxSpeedCell.textContent = row.max_speed;
                    newRow.appendChild(maxSpeedCell);
                    
                    var inOperationCell = document.createElement("td");
                    if (row.in_operation) {
                        inOperationCell.textContent = "Yes";
                    }
                    else {
                        inOperationCell.textContent = "No";
                    }
                    newRow.appendChild(inOperationCell);
                    
                    var editCell = document.createElement("td");
                    var editButton = document.createElement("button");
                    editButton.className = "inlineButton";
                    editButton.textContent = "Edit Basic Features";
                    editCell.appendChild(editButton);
                    newRow.appendChild(editCell);
                    
                    var deleteCell = document.createElement("td");
                    var deleteButton = document.createElement("button");
                    deleteButton.className = "inlineButton";
                    deleteButton.textContent = "Delete";
                    deleteCell.appendChild(deleteButton);
                    newRow.appendChild(deleteCell);
                    
                    var specialFeaturesCell = document.createElement("td");
                    var specialFeaturesButton = document.createElement("button");
                    specialFeaturesButton.className = "inlineButton";
                    specialFeaturesButton.textContent = "Special Features";
                    specialFeaturesCell.appendChild(specialFeaturesButton);
                    newRow.appendChild(specialFeaturesCell);
                    document.getElementById("coaster_table_body").appendChild(newRow);
                }
            }
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(null);
}