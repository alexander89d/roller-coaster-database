/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '9895';

// function to load the table when the page has loaded
document.addEventListener("DOMContentLoaded", loadTable() );


// delete function to remove park from the database
// this is not implemented yet
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



// function to fill in the table for parks with data from the parks table in 
// database
function loadTable() {
	
	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-all-parks', true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){

		var response = JSON.parse(req.responseText);
		let table = JSON.parse(response.results);		

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