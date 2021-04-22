/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '7994';

/* Display table data once DOM content has loaded */
document.addEventListener("DOMContentLoaded", displayFeaturesTable);

/* Bind addsubmit button once DOM content has loaded */
document.addEventListener("DOMContentLoaded", bindAddSubmit());

function bindAddSubmit() {
    document.getElementById("addsubmit").addEventListener("click", function(event) {
        event.preventDefault();
        addFeature();
    });
}

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
                
                var tableBody = document.getElementById('features_table_body')
                /* Remove old table rows from HTML (useful if updating the table so that there aren't duplicate rows).*/
                var childrenArr = Array.from(tableBody.children);
                for (var child of childrenArr) {
                    tableBody.removeChild(child);
                }
                
                /* Display table data. */
                for (var row of res) {
                    var newRow = document.createElement("tr");
                    
                    newRow.id = row.id;
            
                    var nameCell = document.createElement("td");
                    nameCell.textContent = row.name;
                    newRow.appendChild(nameCell);
                    tableBody.appendChild(newRow);
                }
            }
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(null);
}

/* Function to make an AJAX request to API to add a feature. */
function addFeature () {
    var nameIn = document.getElementById("nameIn").value;
    
    /* If the name field is blank, display a message informing the user and do not submit form. */
    if (nameIn === "") {
        document.getElementById("noNameIn").style.display = "block";
        return;
    }
    
    document.getElementById("noNameIn").style.display = "none";
    
    /* Make AJAX request to server to add data. */
    var req = new XMLHttpRequest();
    req.open("POST", FLIP + PORT + "/add-feature");
    req.setRequestHeader("Content-Type", "application/json");
    
    var reqBody = {
        "nameIn":nameIn
    };
    
    reqBody = JSON.stringify(reqBody);
    
    req.addEventListener("load", function showTableAfterAdd() {
        /* If there was no error, refresh page to display updated data. */
        if (req.status >= 200 && req.status < 400) {
            location.reload(true);
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(reqBody);
}