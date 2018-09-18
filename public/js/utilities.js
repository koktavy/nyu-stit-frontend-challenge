var yelpKey = config.YELP_KEY;
var rapidYelpApp = config.RAPID_YELP_APP;
var rapidYelpKey = config.RAPID_YELP_KEY;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getUserData, showError);
	}
}

function getUserData(position) {
	//console.log(position);
	let data = [];
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let timeStart = dateString(0);
	let timeEnd = dateString(1);
	data.push(lat);
	data.push(long);
	data.push(timeStart);
	data.push(timeEnd);
	//console.log(data);
	send({
		'data': data
	});
	// After waiting for location permissions, let the server run
	setTimeout(function() {
		// after 2 seconds, could be faster?
		window.location = "/api/";
	}, 2000)
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			// Kimmel's lat/long: 40.7299, -73.9978
			var lat = 40.7299;
			var long = -73.9978;
			document.body.innerHTML = "Location permissions are required to use this service.<br>" +
				"Showing you events centered around the Kimmel Center.<br>";
			var pos = {coords:{"latitude": lat, "longitude": long}};
			//console.log(pos);
			getUserData(pos); // Call with default values if permission denied.
			break;
		case error.POSITION_UNAVAILABLE:
			document.body.innerHTML = "Your location information is unavailable. Please try again."
			break;
		case error.TIMEOUT:
			document.body.innerHTML = "The request to get your location timed out. Please try again."
			break;
		case error.UNKNOWN_ERROR:
			document.body.innerHTML = "An unknown error occurred. Sorry about that."
			break;
	}
}

function dateString(end) {
	let date = new Date()
	let d = ''
	let y = date.getFullYear()
	d += y
	d += "-" + (date.getMonth() + 1)
	d += "-" + date.getDate()
	if (end == 1) { // Return one second from midnight tonight
		d += " 23:59:59"
		return d
	} else { // Return the current time
		d += " " + date.getHours()
		d += ":" + ('0' + date.getMinutes()).slice(-2) // getMinutes Returns '0' to '59', so for digit consistency,
		d += ":" + ('0' + date.getSeconds()).slice(-2) // add a 0 but use only the rightmost two numbers.
		return d
	}
}

function send(_data) {
	console.log(_data)
	$.ajax({
		// 'http://localhost:5000/'
		url: 'https://nyu-stit-frontend-challenge.herokuapp.com/',
		method: 'POST',
		data: _data,
		dataType: 'json'
	}).done((data) => {
		alert(data.message)
	})
}
