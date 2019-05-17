/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '7994';

/* Display table data once DOM content has loaded */
document.addEventListener("DOMContentLoaded", displayFeaturesTable);

/* Function to make an AJAX request to API to display data table. */
function displayFeaturesTable () {
    /* Initialize Ajax Request */
    var req = new XMLHttpRequest();
    req.open("GET", FLIP + PORT + "/select-all-features", true);
    
    req.addEventListener("load", function generateRows() {
        /* If there was no error, display rows. */
        if (req.status >= 200 && req.status < 400) {
            var res = JSON.parse(req.responseText);
            
            /* If there are no rows to display, inform the user */
            if (res.length == 0) {
                var noDataMessage = document.getElementById('no_data_rcdb_features');
                noDataMessage.style.display = 'block';
            }
            
            /* Otherwise, create a table with the coasters data. */
            else {
                var featuresTable = document.getElementById('features_table');
                featuresTable.style.display = 'block';
                for (var row of res) {
                    var newRow = document.createElement("tr");
                    
                    newRow.id = row.id;
            
                    var nameCell = document.createElement("td");
                    nameCell.textContent = row.name;
                    newRow.appendChild(nameCell);
                    document.getElementById("features_table_body").appendChild(newRow);
                }
            }
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(null);
}