/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '17994';

/* Constant for redirect to coaster page. */
const COASTER_REDIRECT = "http://web.engr.oregonstate.edu/~densmora/rcdb/Roller_Coasters.html";

/* Extract id of this coaster from the query string in the URL and store in a global constant for access throughout this function */

/* Extract the querystring from the URL. */
let queryString = window.location.search;

/* Declare a variable to keep track of current position in string; initialize to 4 (index where id begins). */
let pos = 4;

/* Read in id from queryString. */

let id = "";
while (queryString.charAt(pos) !== "&") {
    id += queryString.charAt(pos);
    pos++;
}

const COASTER_ID = id;

document.addEventListener("DOMContentLoaded", bindUpdateSubmit);

document.addEventListener("DOMContentLoaded", generateFormDropdowns);

/* Function to bind updatesubmit button */
function bindUpdateSubmit() {
    document.getElementById("updatesubmit").addEventListener("click", function(event) {
        event.preventDefault();
        updateCoaster();
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
                        prefillForm();
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

function prefillForm() {
    /* Initialize Ajax Request */
    let req = new XMLHttpRequest();
    req.open("GET", FLIP + PORT + "/search-coasters-by-id?id=" + COASTER_ID, true);

    req.addEventListener("load", function addRetrievedData() {
        /* If there was no error, prefill form with data. */
        if (req.status >= 200 && req.status < 400) {
            let res = JSON.parse(req.responseText)[0];

            document.getElementById("nameIn").value = res.name;

            /* If the park is not null, update the value of the "park" field with the correct park. */
            if (res.park !== null) {
                document.getElementById("parkIn").value = res.park;
            }

            document.getElementById("manufacturerIn").value = res.manufacturer;

            document.getElementById("yearOpenedIn").value = res.year_opened;

            document.getElementById("heightIn").value = res.height;

            document.getElementById("maxSpeedIn").value = res.max_speed;

            document.getElementById("inOperationIn").value = res.in_operation;
        }
        else {
            alert("An error occurred getting data from the server.");
        }
    });
    req.send(null);
}

/* Function to make an AJAX request to update a coaster. */
function updateCoaster (idIn) {
    /* Flag initialized to true and set to false if invalid data is provided in any field. */
    let validInput = true;
    
    let nameIn = document.getElementById("nameIn").value;
    if (nameIn === "") {
        document.getElementById("noNameIn").style.display = "block";
        validInput = false;
    }
    
    let parkIn = document.getElementById("parkIn").value;
    if (Number(parkIn) === 0) {
        parkIn = null;
    }
    
    let manufacturerIn = document.getElementById("manufacturerIn").value;
    
    let yearOpenedIn = document.getElementById("yearOpenedIn").value;
    if (yearOpenedIn === "") {
        document.getElementById("noYearIn").style.display = "block";
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
    
    let req = new XMLHttpRequest();
    req.open("POST", FLIP + PORT + "/update-coaster");
    req.setRequestHeader("Content-Type", "application/json");

    let reqBody = {
        "nameIn":nameIn,
        "parkIn":parkIn,
        "manufacturerIn":manufacturerIn,
        "yearOpenedIn":yearOpenedIn,
        "heightIn":heightIn,
        "maxSpeedIn":maxSpeedIn,
        "inOperationIn":inOperationIn,
        "idIn":COASTER_ID
    };

    reqBody = JSON.stringify(reqBody);

    req.addEventListener("load", function redirectToCoastersPage() {
        /* If there was no error, display alert informing user updating was successful, and return to the homepage. */
        if (req.status >= 200 && req.status < 400) {
            alert("This coaster's information has been successfully updated.");
            window.location.replace(COASTER_REDIRECT);
        }
        else {
            alert("An error occurred submitting data to the server.");
        }
    });
    req.send(reqBody);
}