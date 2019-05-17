/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '9896';

// function to load the table when the page has loaded
document.addEventListener("DOMContentLoaded", loadTable() );

// function to add functionality to the "Add Owner" button
document.getElementById('addowner').addEventListener('click', function(event) {

	document.getElementById('badinput').innerHTML = '';
	addEntry(event);
});

// function to fill in the table for manufacturers with data from the owner table in database
function loadTable() {
	
	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-all-owners', true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){

		let table = document.getElementById('tablebody');
		while(table.firstChild)
		{
			table.removeChild(table.firstChild);
		}

		var response = JSON.parse(req.responseText);
		table = JSON.parse(response.results);		

		if(table.length === 0)
		{
			return;
		}

		// for each row in the owner table, add the row to the HTML table
		let length = table.length;

		for(var i = 0; i < length; i++)	{

			let tableBody = document.getElementById('tablebody');

			let row = document.createElement('tr');

			// read the data for this manufacturer
			let name = table[i].name;
			let city = table[i].city;
			let state = table[i].state_province;
			let country = table[i].country;
		
			// add the data to the HTML table
			let element = document.createElement('td');
			element.innerHTML = name;
			row.appendChild(element);

			element = document.createElement('td');
			element.innerHTML = city;
			row.appendChild(element);

			element = document.createElement('td');
			element.innerHTML = state;
			row.appendChild(element);

			element = document.createElement('td');
			element.innerHTML = country;
			row.appendChild(element);

			tableBody.appendChild(row);
	
		}

      }    else {
        	console.log("Error in network request: " + req.statusText);
      }});
    req.send();
};



// function to check validity of user input and then add the new // owner to the database
function addEntry(event) {
	
	let name = document.getElementById('name').value;
	let city = document.getElementById('city').value;
	let state = document.getElementById('state').value;
	let country = document.getElementById('country').value;

	if(name == ""){
		document.getElementById('badinput').innerHTML="Name is required. New Owner not added.";
		event.preventDefault();
		return;
	}
	else if(city == ""){
		document.getElementById('badinput').innerHTML="City is required. New Owner not added.";
		event.preventDefault();
		return;
	}
	else if(state == ""){
		document.getElementById('badinput').innerHTML="State is required. New Owner not added.";
		event.preventDefault();
		return;
	}
	else if(country == ""){
		document.getElementById('badinput').innerHTML="Country is required. New Owner not added.";
		event.preventDefault();
		return;
	}
	
	let tail = '?' + 'name=' + name + '&city=' + city + '&state=' + state + '&country=' + country;

	var req = new XMLHttpRequest();
	req.open('GET', FLIP + PORT + '/add-owner' + tail, true);
	req.addEventListener('load',function(){
	if(req.status >= 200 && req.status < 400){

		loadTable();			
	
		event.preventDefault();
		return;	

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send();
    event.preventDefault();
}
