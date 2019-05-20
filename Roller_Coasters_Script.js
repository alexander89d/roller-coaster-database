/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '7994';

/* Display table data once DOM content has loaded */
document.addEventListener("DOMContentLoaded", displayCoastersTable);

/* Bind search button once DOM content has loaded. */
document.addEventListener("DOMContentLoaded", bindSearchButton);

document.addEventListener("DOMContentLoaded", bindClearSearchButton);

document.addEventListener("DOMContentLoaded", bindAddSubmit);

/* Function to bind addsubmit button */
function bindAddSubmit() {
    document.getElementById("addsubmit").addEventListener("click", function(event) {
        event.preventDefault();
        addCoaster();
    });
}

/* Function to make an AJAX request to API to display data table of all coasters. */
function displayCoastersTable () {
    /* Hide clear_search button until a search is initiated. */
    document.getElementById("clear_search").style.display = "none";
    
    /* Initialize Ajax Request */
    var req = new XMLHttpRequest();
    req.open("GET", FLIP + PORT + "/select-all-coasters", true);
    
    req.addEventListener("load", function generateRows() {
        /* If there was no error, display rows. */
        if (req.status >= 200 && req.status < 400) {
            var res = JSON.parse(req.responseText);
            
            /* If there are no rows to display, inform the user */
            if (res.length == 0) {
                var coasterTable = document.getElementById('coaster_table');
                coasterTable.style.display = 'none';
                
                var noDataMessage = document.getElementById('no_data_rcdb_coasters');
                noDataMessage.style.display = 'block';
                
                var noSearchResultsMessage = document.getElementById('no_search_results');
                noSearchResultsMessage.style.display = 'none';
            }
            
            /* Otherwise, create a table with the coasters data. */
            else {
                var coasterTable = document.getElementById('coaster_table');
                coasterTable.style.display = 'block';
               
                var noDataMessage = document.getElementById('no_data_rcdb_coasters');
                noDataMessage.style.display = 'none';
                
                var noSearchResultsMessage = document.getElementById('no_search_results');
                noSearchResultsMessage.style.display = 'none';
                
                /* Delete all current rows from HTML table (results of any search) before adding in all current rows in rcdb_coasters table. */
                var tableBody = document.getElementById('coaster_table_body');
                    var childrenArr = Array.from(tableBody.children);
                    for (var child of childrenArr) {
                        tableBody.removeChild(child);
                    }
                
                for (var row of res) {
                    var newRow = document.createElement("tr");
                    
                    newRow.id = row.id;
            
                    var nameCell = document.createElement("td");
                    nameCell.textContent = row.name;
                    newRow.appendChild(nameCell);
            
                    var parkCell = document.createElement("td");
                    if (row.park === null) {
                        parkCell.textContent = "(not applicable)";
                    }
                    else {
                        parkCell.textContent = row.park;
                    }
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
            generateFormDropdowns();
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(null);
}

/* Function to bind the search button to its functionality */
function bindSearchButton () {
    document.getElementById("search").addEventListener("click", function(event) {
        event.preventDefault();
        
        /* Display the clear_search button. */
        document.getElementById("clear_search").style.display = "inline";
        
        /* Get search term */
        var nameToSearch = document.getElementById("name_to_search").value;
        
        /* Initialize Ajax Request */
        var req = new XMLHttpRequest();
        req.open("GET", FLIP + PORT + "/search-coasters?name=" + nameToSearch, true);

        req.addEventListener("load", function generateRows() {
            /* If there was no error, display rows. */
            if (req.status >= 200 && req.status < 400) {
                var res = JSON.parse(req.responseText);

                /* If there are no rows to display, inform the user */
                if (res.length == 0) {
                    var noDataMessage = document.getElementById('no_data_rcdb_coasters');
                    noDataMessage.style.display = 'none';
                    
                    var noSearchResultsMessage = document.getElementById('no_search_results');
                    noSearchResultsMessage.style.display = 'block';
                    
                    var coasterTable = document.getElementById("coaster_table");
                    coasterTable.style.display = "none";
                }

                /* Otherwise, create a table with the coasters data. */
                else {
                    var noDataMessage = document.getElementById('no_data_rcdb_coasters');
                    noDataMessage.style.display = 'none';
                    
                    var noSearchResultsMessage = document.getElementById('no_search_results');
                    noSearchResultsMessage.style.display = 'none';
                    
                    var coasterTable = document.getElementById("coaster_table");
                    coasterTable.style.display = "block";
                    
                    /* Delete all current rows from HTML table before adding just the row(s) corresponding to the search results. */
                    var tableBody = document.getElementById('coaster_table_body');
                    var childrenArr = Array.from(tableBody.children);
                    for (var child of childrenArr) {
                        tableBody.removeChild(child);
                    }
                        
                    for (var row of res) {
                        var newRow = document.createElement("tr");

                        newRow.id = row.id;

                        var nameCell = document.createElement("td");
                        nameCell.textContent = row.name;
                        newRow.appendChild(nameCell);

                        var parkCell = document.createElement("td");
                        if (row.park === null) {
                            parkCell.textContent = "(not applicable)";
                        }
                        else {
                            parkCell.textContent = row.park;
                        }
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
                generateFormDropdowns();
            }
            else {
                alert("An error occurred getting data from the server.");
            }
        });
        req.send(null);
    });
}

/* Function to generate dropdown lists for addCoaster form. */
function generateFormDropdowns() {
    /* Generate dropdown options for park name. */
    /* Initialize Ajax Request */
    var reqPark = new XMLHttpRequest();
    reqPark.open("GET", FLIP + PORT + "/select-all-parks", true);
    
    reqPark.addEventListener("load", function generateParkDropdown() {
        /* If there was no error, display rows. */
        if (reqPark.status >= 200 && reqPark.status < 400) {
            var res = JSON.parse(reqPark.responseText);
            
            for (var row of res) {
                var parkOption = document.createElement("option");
                parkOption.value = row.id;
                parkOption.textContent = row.name;
                document.getElementById("parkIn").appendChild(parkOption);
            }
            
             /* Generate dropdown options for manufacturer name. */
            /* Initialize Ajax Request */
            var reqManufacturer= new XMLHttpRequest();
            reqManufacturer.open("GET", FLIP + PORT + "/select-all-manufacturers", true);

            reqManufacturer.addEventListener("load", function generateParkDropdown() {
                /* If there was no error, display rows. */
                if (reqManufacturer.status >= 200 && reqManufacturer.status < 400) {
                    var res = JSON.parse(reqManufacturer.responseText);

                    for (var row of res) {
                        var manufacturerOption = document.createElement("option");
                        manufacturerOption.value = row.id;
                        manufacturerOption.textContent = row.name;
                        document.getElementById("manufacturerIn").appendChild(manufacturerOption);
                    }
                }
                else {
                    alert("An error occurred getting data from the server.");
                }
            });
            reqManufacturer.send(null);
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    reqPark.send(null);
}

/* function to activate clear_search button to clear search results and display full table again. */
function bindClearSearchButton() {
    document.getElementById("clear_search").addEventListener("click", function (event){
       event.preventDefault();
        displayCoastersTable();
    });
}

/* Function to make an AJAX request to add a coaster. */
function addCoaster () {
    document.getElementById("noNameIn").style.display = "none";
    document.getElementById("noYearIn").style.display = "none";
    document.getElementById("invalidHeight").style.display = "none";
    document.getElementById("invalidSpeed").style.display = "none";
    
    /* Flag initialized to true and set to false if invalid data is provided in any field. */
    var validInput = true;
    
    /* Flag intialized to true and set to false if no park name is provided. */
    var hasAPark = true;
    
    var nameIn = document.getElementById("nameIn").value;
    if (nameIn === "") {
        document.getElementById("noNameIn").style.display = "block";
        validInput = false;
    }
    
    var parkIn = document.getElementById("parkIn").value;
    if (Number(parkIn) === 0) {
        hasAPark = false;
    }
    
    var manufacturerIn = document.getElementById("manufacturerIn").value;
    
    var yearOpenedIn = document.getElementById("yearOpenedIn").value;
    if (yearOpenedIn === "") {
        document.getElementById("noYearIn").style.display = "block";
        validInput = false;
    }
    
    var heightIn = document.getElementById("heightIn").value;
    var heightNum = Number(heightIn);
    if (heightIn === "" || heightNum < 10 || heightNum > 999) {
        document.getElementById("invalidHeight").style.display = "block";
        validInput = false;
    }
    
    var maxSpeedIn = document.getElementById("maxSpeedIn").value;
    var maxSpeedNum = Number(maxSpeedIn);
    if (maxSpeedIn === "" || maxSpeedNum < 10 || maxSpeedNum > 149) {
        document.getElementById("invalidSpeed").style.display = "block";
        validInput = false;
    }
    
    var inOperationIn = document.getElementById("inOperationIn").value;
    
    /* If the input is invalid in any way, return from the function now that the relevant messages have been posted. */
    if (!validInput) {
        return;
    }
    
    /* Otherwise, make an AJAX request based on whether or not the coaster has a park. */
    
    if (hasAPark) {
        /* Make AJAX request to server to add data. */
        var req = new XMLHttpRequest();
        req.open("POST", FLIP + PORT + "/add-coaster-with-park");
        req.setRequestHeader("Content-Type", "application/json");

        var reqBody = {
            "nameIn":nameIn,
            "parkIn":parkIn,
            "manufacturerIn":manufacturerIn,
            "yearOpenedIn":yearOpenedIn,
            "heightIn":heightIn,
            "maxSpeedIn":maxSpeedIn,
            "inOperationIn":inOperationIn
        };

        reqBody = JSON.stringify(reqBody);

        req.addEventListener("load", function showTableAfterAdd() {
            /* If there was no error, display rows. */
            if (req.status >= 200 && req.status < 400) {
                displayCoastersTable();
            }
            else {
                alert("An error occurred submitting data to the server.");
            }
        });
        req.send(reqBody);
    }
    
    else {
        /* Make AJAX request to server to add data. */
        var req = new XMLHttpRequest();
        req.open("POST", FLIP + PORT + "/add-coaster-no-park");
        req.setRequestHeader("Content-Type", "application/json");

        var reqBody = {
            "nameIn":nameIn,
            "manufacturerIn":manufacturerIn,
            "yearOpenedIn":yearOpenedIn,
            "heightIn":heightIn,
            "maxSpeedIn":maxSpeedIn,
            "inOperationIn":inOperationIn
        };

        reqBody = JSON.stringify(reqBody);

        req.addEventListener("load", function showTableAfterAdd() {
            /* If there was no error, display rows. */
            if (req.status >= 200 && req.status < 400) {
                displayCoastersTable();
            }
            else {
                alert("An error occurred submitting data to the server.");
            }
        });
        req.send(reqBody);
    }
}