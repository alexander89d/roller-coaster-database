/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '9896';

// function to load the table when the page has loaded
document.addEventListener("DOMContentLoaded", pageSetup() );

// function to add functionality to the "Add Park" button
document.getElementById('addpark').addEventListener('click', function(event) {

	document.getElementById('badinput').innerHTML = '';
	addEntry(event);
});


// function to load the parks table and to also populate the
// owner's selection dropdown in the new park submission form
function pageSetup() {

	loadTable();
	addOwners();

}

// function to fill in the park owner options in the new park     // form
function addOwners() {
	
	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-owner-names-ids', true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){
	
		var response = JSON.parse(req.responseText);
		let table = JSON.parse(response.results);		

		// for each row in the owner table, add the row to the  		// selection dropdown
		let length = table.length;

		for(var i = 0; i < length; i++)	{

			let select = document.getElementById('ownerselect');

			let option = document.createElement('option');

			option.innerHTML = table[i].name;
			option.value = table[i].id;

			select.appendChild(option);
	
		}

      }    else {
        	console.log("Error in network request: " + req.statusText);
      }});
    req.send();
};


// function to check validity of user input and then add the new // park to the database
function addEntry(event) {
	
	let name = document.getElementById('name').value;
	let city = document.getElementById('city').value;
	let state = document.getElementById('state').value;
	let country = document.getElementById('country').value;
	let owner = document.getElementById('ownerselect').value;

	if(name == ""){
		document.getElementById('badinput').innerHTML="Name is required. New Park not added.";
		event.preventDefault();
		return;
	}
	else if(city == ""){
		document.getElementById('badinput').innerHTML="City is required. New Park not added.";
		event.preventDefault();
		return;
	}
	else if(state == ""){
		document.getElementById('badinput').innerHTML="State is required. New Park not added.";
		event.preventDefault();
		return;
	}
	else if(country == ""){
		document.getElementById('badinput').innerHTML="Country is required. New Park not added.";
		event.preventDefault();
		return;
	}
	
	let tail = '?' + 'name=' + name + '&city=' + city + '&state=' + state + '&country=' + country + '&owner=' + owner;

	var req = new XMLHttpRequest();
	req.open('GET', FLIP + PORT + '/add-park' + tail, true);
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



// delete function to remove park from the database
function deleteEntry(id, event) {

	let tail = "?id=" + id;

	var req = new XMLHttpRequest();
		req.open('GET', FLIP + PORT + '/delete-park' + tail, true);
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



// function to fill in the table for parks with data from the  
// parks table in database
function loadTable() {
	
	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-all-parks', true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){

		// remove all of the elements currently displayed by 			// the table
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

		// for each row in the park table, add the row to the HTML table
		let length = table.length;

		for(var i = 0; i < length; i++)	{

			let tableBody = document.getElementById('tablebody');

			let row = document.createElement('tr');

			// read the data for this manufacturer
			let id = table[i].id;
			let name = table[i].name;
			let city = table[i].city;
			let state = table[i].state_province;
			let country = table[i].country;
			let owner = table[i].owner;
		
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

			element = document.createElement('td');
			element.innerHTML = owner
			row.appendChild(element);

			tableBody.appendChild(row);

			let form = document.createElement('form');
			form.addEventListener('click', function(event) {

				let current = id;

				deleteEntry(current, event);
				}
			);
		

			let input = document.createElement('input');
			input.type = "hidden";
			input.name = "id";
			input.value = id;

			form.appendChild(input);
		
			input = document.createElement('input');
			input.type = "submit";
			input.value = "Delete";

			form.appendChild(input);

			element = document.createElement('td');

			element.appendChild(form);

			row.appendChild(element);
		}

      }    else {
        	console.log("Error in network request: " + req.statusText);
      }});
    req.send();
};