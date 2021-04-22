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

document.addEventListener("DOMContentLoaded", generateFormDropdowns)

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
    let req = new XMLHttpRequest();
    req.open("GET", FLIP + PORT + "/select-all-coasters", true);
    
    req.addEventListener("load", function generateRows() {
        /* If there was no error, display rows. */
        if (req.status >= 200 && req.status < 400) {
            let res = JSON.parse(req.responseText);
            
            /* If there are no rows to display, inform the user */
            if (res.length == 0) {
                let coasterTable = document.getElementById('coaster_table');
                coasterTable.style.display = 'none';
                
                let noDataMessage = document.getElementById('no_data_rcdb_coasters');
                noDataMessage.style.display = 'block';
                
                let noSearchResultsMessage = document.getElementById('no_search_results');
                noSearchResultsMessage.style.display = 'none';
            }
            
            /* Otherwise, create a table with the coasters data. */
            else {
                let coasterTable = document.getElementById('coaster_table');
                coasterTable.style.display = 'block';
               
                let noDataMessage = document.getElementById('no_data_rcdb_coasters');
                noDataMessage.style.display = 'none';
                
                let noSearchResultsMessage = document.getElementById('no_search_results');
                noSearchResultsMessage.style.display = 'none';
                
                /* Delete all current rows from HTML table (results of any search) before adding in all current rows in rcdb_coasters table. */
                let tableBody = document.getElementById('coaster_table_body');
                    let childrenArr = Array.from(tableBody.children);
                    for (let child of childrenArr) {
                        tableBody.removeChild(child);
                    }
                
                for (let row of res) {
                    let newRow = document.createElement("tr");
                    
                    newRow.id = row.id;
                    let id = row.id;
                    
                    let nameCell = document.createElement("td");
                    nameCell.textContent = row.name;
                    newRow.appendChild(nameCell);
            
                    let parkCell = document.createElement("td");
                    if (row.park === null) {
                        parkCell.textContent = "(not applicable)";
                    }
                    else {
                        parkCell.textContent = row.park;
                    }
                    newRow.appendChild(parkCell);
            
                    let manufacturerCell = document.createElement("td");
                    manufacturerCell.textContent = row.manufacturer;
                    newRow.appendChild(manufacturerCell);
                    
                    let yearOpenedCell = document.createElement("td");
                    yearOpenedCell.textContent = row.year_opened;
                    newRow.appendChild(yearOpenedCell);
                    
                    let heightCell = document.createElement("td");
                    heightCell.textContent = row.height;
                    newRow.appendChild(heightCell);
                    
                    let maxSpeedCell = document.createElement("td");
                    maxSpeedCell.textContent = row.max_speed;
                    newRow.appendChild(maxSpeedCell);
                    
                    let inOperationCell = document.createElement("td");
                    if (row.in_operation) {
                        inOperationCell.textContent = "Yes";
                    }
                    else {
                        inOperationCell.textContent = "No";
                    }
                    newRow.appendChild(inOperationCell);
                    
                    let editCell = document.createElement("td");
                    let editForm = document.createElement("form");
                    
                    editForm.method = "get";
                    editForm.action = "Edit_Coaster.html";
                    
                    let idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";
                    idInput.value = id;
                    editForm.appendChild(idInput);
                    
                    let editButton = document.createElement("input");
                    editButton.type = "submit";
                    editButton.name = "edit";
                    editButton.value = "Edit Basic Features";
                    editButton.className = "inlineButton";
                    editForm.appendChild(editButton);
                    
                    editCell.appendChild(editForm);
                    newRow.appendChild(editCell);
                    
                    let deleteCell = document.createElement("td");
                    let deleteForm = document.createElement("form");
                    deleteForm.addEventListener('click', function(event) {

                        let current = id;
                        deleteEntry(current, event);
                        }
                    );
                    
                    idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";
                    idInput.value = newRow.id;
                    deleteForm.appendChild(idInput);
                    
                    let deleteButton = document.createElement("input");
                    deleteButton.type = "submit";
                    deleteButton.name = "delete";
                    deleteButton.value = "Delete";
                    deleteButton.className = "inlineButton";
                    deleteForm.appendChild(deleteButton);
                    
                    deleteCell.appendChild(deleteForm);
                    newRow.appendChild(deleteCell);
                    
                    let specialFeaturesCell = document.createElement("td");

                    let viewForm = document.createElement("form");
                    
                    viewForm.method = "get";
                    viewForm.action = "Coaster_Features.html";
                    
                    idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";
                    idInput.value = id;
                    viewForm.appendChild(idInput);
                    
                    let viewButton = document.createElement("input");
                    viewButton.type = "submit";                    			   viewButton.value = "Special Features";
                    viewButton.className = "inlineButton";
                    viewForm.appendChild(viewButton);

                    specialFeaturesCell.appendChild(viewForm);
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

/* Function to bind the search button to its functionality */
function bindSearchButton () {
    document.getElementById("search").addEventListener("click", function(event) {
        event.preventDefault();
        
        /* Display the clear_search button. */
        document.getElementById("clear_search").style.display = "inline";
        
        /* Get search term */
        let nameToSearch = document.getElementById("name_to_search").value;
        
        /* Initialize Ajax Request */
        let req = new XMLHttpRequest();
        req.open("GET", FLIP + PORT + "/search-coasters?name=" + nameToSearch, true);

        req.addEventListener("load", function generateRows() {
            /* If there was no error, display rows. */
            if (req.status >= 200 && req.status < 400) {
                let res = JSON.parse(req.responseText);

                /* If there are no rows to display, inform the user */
                if (res.length == 0) {
                    let noDataMessage = document.getElementById('no_data_rcdb_coasters');
                    noDataMessage.style.display = 'none';
                    
                    let noSearchResultsMessage = document.getElementById('no_search_results');
                    noSearchResultsMessage.style.display = 'block';
                    
                    let coasterTable = document.getElementById("coaster_table");
                    coasterTable.style.display = "none";
                }

                /* Otherwise, create a table with the coasters data. */
                else {
                    let noDataMessage = document.getElementById('no_data_rcdb_coasters');
                    noDataMessage.style.display = 'none';
                    
                    let noSearchResultsMessage = document.getElementById('no_search_results');
                    noSearchResultsMessage.style.display = 'none';
                    
                    let coasterTable = document.getElementById("coaster_table");
                    coasterTable.style.display = "block";
                    
                    /* Delete all current rows from HTML table before adding just the row(s) corresponding to the search results. */
                    let tableBody = document.getElementById('coaster_table_body');
                    let childrenArr = Array.from(tableBody.children);
                    for (let child of childrenArr) {
                        tableBody.removeChild(child);
                    }
                        
                    for (let row of res) {
                        let newRow = document.createElement("tr");

                        newRow.id = row.id;
                        let id = row.id;

                        let nameCell = document.createElement("td");
                        nameCell.textContent = row.name;
                        newRow.appendChild(nameCell);

                        let parkCell = document.createElement("td");
                        if (row.park === null) {
                            parkCell.textContent = "(not applicable)";
                        }
                        else {
                            parkCell.textContent = row.park;
                        }
                        newRow.appendChild(parkCell);

                        let manufacturerCell = document.createElement("td");
                        manufacturerCell.textContent = row.manufacturer;
                        newRow.appendChild(manufacturerCell);

                        let yearOpenedCell = document.createElement("td");
                        yearOpenedCell.textContent = row.year_opened;
                        newRow.appendChild(yearOpenedCell);

                        let heightCell = document.createElement("td");
                        heightCell.textContent = row.height;
                        newRow.appendChild(heightCell);

                        let maxSpeedCell = document.createElement("td");
                        maxSpeedCell.textContent = row.max_speed;
                        newRow.appendChild(maxSpeedCell);

                        let inOperationCell = document.createElement("td");
                        if (row.in_operation) {
                            inOperationCell.textContent = "Yes";
                        }
                        else {
                            inOperationCell.textContent = "No";
                        }
                        newRow.appendChild(inOperationCell);

                        let editCell = document.createElement("td");
                        let editForm = document.createElement("form");

                        editForm.method = "get";
                        editForm.action = "Edit_Coaster.html";

                        let idInput = document.createElement("input");
                        idInput.type = "hidden";
                        idInput.name = "id";
                        idInput.value = id;
                        editForm.appendChild(idInput);

                        let editButton = document.createElement("input");
                        editButton.type = "submit";
                        editButton.name = "edit";
                        editButton.value = "Edit Basic Features";
                        editButton.className = "inlineButton";
                        editForm.appendChild(editButton);

                        editCell.appendChild(editForm);
                        newRow.appendChild(editCell);

                        let deleteCell = document.createElement("td");
                        let deleteForm = document.createElement("form");
                        deleteForm.addEventListener('click', function(event) {

                            let current = id;
                            /* TESTING ONLY */
                            console.log("Calling deleteEntry on row id=" + id);
                            deleteEntry(current, event);
                            }
                        );
                    
                        idInput = document.createElement("input");
                        idInput.type = "hidden";
                        idInput.name = "id";
                        idInput.value = newRow.id;
                        deleteForm.appendChild(idInput);

                        let deleteButton = document.createElement("input");
                        deleteButton.type = "submit";
                        deleteButton.name = "delete";
                        deleteButton.value = "Delete";
                        deleteButton.className = "inlineButton";
                        deleteForm.appendChild(deleteButton);

                        deleteCell.appendChild(deleteForm);
                        newRow.appendChild(deleteCell);

                                            let specialFeaturesCell = document.createElement("td");

                        let viewForm = document.createElement("form");
                    
                    viewForm.method = "get";
                    viewForm.action = "Coaster_Features.html";
                    
                    idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";
                    idInput.value = id;
                    viewForm.appendChild(idInput);
                    
                    let viewButton = document.createElement("input");
                    viewButton.type = "submit";                    			   viewButton.value = "Special Features";
                    viewButton.className = "inlineButton";
                    viewForm.appendChild(viewButton);

                    specialFeaturesCell.appendChild(viewForm);
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
    });
}

/* Function to generate dropdown lists for addCoaster form. */
function generateFormDropdowns() {
    /* Generate dropdown options for park name. */
    /* Initialize Ajax Request */
    let reqPark = new XMLHttpRequest();
    reqPark.open("GET", FLIP + PORT + "/select-all-parks", true);
    
    reqPark.addEventListener("load", function generateParkDropdown() {
        /* If there was no error, display rows. */
        if (reqPark.status >= 200 && reqPark.status < 400) {
            let res = JSON.parse(reqPark.responseText);
            
            for (let row of res) {
                let parkOption = document.createElement("option");
                parkOption.value = row.id;
                parkOption.textContent = row.name;
                document.getElementById("parkIn").appendChild(parkOption);
            }
            
             /* Generate dropdown options for manufacturer name. */
            /* Initialize Ajax Request */
            let reqManufacturer= new XMLHttpRequest();
            reqManufacturer.open("GET", FLIP + PORT + "/select-all-manufacturers", true);

            reqManufacturer.addEventListener("load", function generateParkDropdown() {
                /* If there was no error, display rows. */
                if (reqManufacturer.status >= 200 && reqManufacturer.status < 400) {
                    let res = JSON.parse(reqManufacturer.responseText);

                    for (let row of res) {
                        let manufacturerOption = document.createElement("option");
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
       location.reload(true);
    });
}

/* Function to make an AJAX request to add a coaster. */
function addCoaster () {
    document.getElementById("noNameIn").style.display = "none";
    document.getElementById("invalidYear").style.display = "none";
    document.getElementById("invalidHeight").style.display = "none";
    document.getElementById("invalidSpeed").style.display = "none";
    
    /* Flag initialized to true and set to false if invalid data is provided in any field. */
    let validInput = true;
    
    /* Flag intialized to true and set to false if no park name is provided. */
    let hasAPark = true;
    
    let nameIn = document.getElementById("nameIn").value;
    if (nameIn === "") {
        document.getElementById("noNameIn").style.display = "block";
        validInput = false;
    }
    
    let parkIn = document.getElementById("parkIn").value;
    if (Number(parkIn) === 0) {
        hasAPark = false;
    }
    
    let manufacturerIn = document.getElementById("manufacturerIn").value;
    
    /* Validate that yearOpenedIn is between 1900 and current year. Get current year. */
    
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    
    let yearOpenedIn = document.getElementById("yearOpenedIn").value;
    let yearOpenedNum = Number(yearOpenedIn);
    if (yearOpenedIn === "" || yearOpenedNum < 1900 || yearOpenedNum > currentYear) {
        let invalidYearMsg = document.getElementById("invalidYear");
        invalidYearMsg.textContent = "The year in which the coaster opened must be between 1900 and " + currentYear.toString() + ".";
        invalidYearMsg.style.display = "block";
        validInput = false;
    }
    
    let heightIn = document.getElementById("heightIn").value;
    let heightNum = Number(heightIn);
    if (heightIn === "" || heightNum < 10 || heightNum > 999) {
        document.getElementById("invalidHeight").style.display = "block";
        validInput = false;
    }
    
    let maxSpeedIn = document.getElementById("maxSpeedIn").value;
    let maxSpeedNum = Number(maxSpeedIn);
    if (maxSpeedIn === "" || maxSpeedNum < 10 || maxSpeedNum > 149) {
        document.getElementById("invalidSpeed").style.display = "block";
        validInput = false;
    }
    
    let inOperationIn = document.getElementById("inOperationIn").value;
    
    /* If the input is invalid in any way, return from the function now that the relevant messages have been posted. */
    if (!validInput) {
        return;
    }
    
    /* Otherwise, make an AJAX request based on whether or not the coaster has a park. */
    
    if (hasAPark) {
        /* Make AJAX request to server to add data. */
        let req = new XMLHttpRequest();
        req.open("POST", FLIP + PORT + "/add-coaster-with-park");
        req.setRequestHeader("Content-Type", "application/json");

        let reqBody = {
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
            /* If there was no error, refresh page to display updated data. */
            if (req.status >= 200 && req.status < 400) {
                location.reload(true);
            }
            else {
                alert("An error occurred submitting data to the server.");
            }
        });
        req.send(reqBody);
    }
    
    else {
        /* Make AJAX request to server to add data. */
        let req = new XMLHttpRequest();
        req.open("POST", FLIP + PORT + "/add-coaster-no-park");
        req.setRequestHeader("Content-Type", "application/json");

        let reqBody = {
            "nameIn":nameIn,
            "manufacturerIn":manufacturerIn,
            "yearOpenedIn":yearOpenedIn,
            "heightIn":heightIn,
            "maxSpeedIn":maxSpeedIn,
            "inOperationIn":inOperationIn
        };

        reqBody = JSON.stringify(reqBody);

        req.addEventListener("load", function showTableAfterAdd() {
            /* If there was no error, refresh page to display updated data. */
            if (req.status >= 200 && req.status < 400) {
                location.reload(true);
            }
            else {
                alert("An error occurred submitting data to the server.");
            }
        });
        req.send(reqBody);
    }
}

// delete function to remove park from the database
function deleteEntry(id, event) {

	let tail = "?id=" + id;

	let req = new XMLHttpRequest();
		req.open('GET', FLIP + PORT + '/delete-coaster' + tail, true);
		req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){

			
			displayCoastersTable();	
			
			event.preventDefault();
			return;	

	      } else {
        	console.log("Error in network request: " + req.statusText);
	      }});
	    req.send();
	    event.preventDefault();
}