/* Constant for flip base URL */
const FLIP = 'http://flip3.engr.oregonstate.edu:';

/* Constant for port number - can be changed to test on a different port */
const PORT = '9896';

// define the ID for the page upon loading
const urlParams = new URLSearchParams(window.location.search);
const ID = 1;
// const ID = urlParams.get('id');

// function to load the table when the page has loaded
document.addEventListener("DOMContentLoaded", pageSetup(ID) );

// function to add functionality to the "Add Feature" button
document.getElementById('addfeature').addEventListener('click', function(event) {

	addEntry(ID, event);
});


// function to load the features table and to also populate the
// features selection dropdown in the new feature submission form based on the
// ID of the coaster when the page was loaded
function pageSetup(ID) {

	loadTable(ID);
	addFeatures(ID);

}

// delete function to remove feature and coaster relationship from the database
function deleteEntry(feature, ID, event) {

	let tail = "?fid=" + feature + "&cid=" + ID;

	var req = new XMLHttpRequest();
		req.open('GET', FLIP + PORT + '/delete-feature-coaster' + tail, true);
		req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){

			
			pageSetup(ID);	
			
			event.preventDefault();
			return;	

	      } else {
        	console.log("Error in network request: " + req.statusText);
	      }});
	    req.send();
	    event.preventDefault();
}

// function to add a new coaster-feature relationship to the database
function addEntry(ID, event) {
	
	let feature = document.getElementById('featureselect').value;
	
	let tail = "?cid=" + ID + "&fid=" + feature;

	var req = new XMLHttpRequest();
	req.open('GET', FLIP + PORT + '/add-coaster-feature-relationship' + tail, true);
	req.addEventListener('load',function(){
	if(req.status >= 200 && req.status < 400){

		pageSetup(ID);			
	
		event.preventDefault();
		return;	

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send();
    event.preventDefault();
}

// function to fill in the table for features relating to the coaster with data from the  
// database
function loadTable(ID) {
	
	var tail = "?id=" + ID;

	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-features-for-coaster' + tail, true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){

		// remove all of the elements currently displayed in 			
		// the table
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

		// for each feature related to the coaster, add the row to the HTML table
		let length = table.length;

		for(var i = 0; i < length; i++)	{

			let tableBody = document.getElementById('tablebody');

			let row = document.createElement('tr');

			// read the data for this manufacturer
			let fid = table[i].id;
			let name = table[i].name;
		
			// add the data to the HTML table
			let element = document.createElement('td');
			element.innerHTML = name;
			row.appendChild(element);

			tableBody.appendChild(row);

			let form = document.createElement('form');
			form.addEventListener('click', function(event) {

				let feature = fid;

				deleteEntry(feature, ID, event);
				}
			);
		

			let input = document.createElement('input');
			input.type = "hidden";
			input.name = "id";
			input.value = fid;

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

function addFeatures(ID) {

	var tail = "?id=" + ID;

	var req = new XMLHttpRequest();
	req.open('POST', FLIP + PORT + '/select-unused-features' + tail, true);
	req.addEventListener('load',function(){
	    if(req.status >= 200 && req.status < 400){

		// remove the current entries from the features select option
		let select = document.getElementById('featureselect');
		while(select.firstChild)
		{
			select.removeChild(select.firstChild);
		}
	
		var response = JSON.parse(req.responseText);
		let table = JSON.parse(response.results);

		// for each row in the response, add the row to the  		
		// selection dropdown
		let length = table.length;

		for(var i = 0; i < length; i++)	{

			let select = document.getElementById('featureselect');

			let option = document.createElement('option');

			option.innerHTML = table[i].name;
			option.value = table[i].id;

			select.appendChild(option);
	
		}

      }    else {
        	console.log("Error in network request: " + req.statusText);
      }});
    req.send();



}