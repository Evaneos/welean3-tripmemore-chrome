//@todo: should be more like a service
var TripmemoreAPI = {
	model: {
		'default': 'default data'
	},

	// Used to add a pin
	// Sended data will be made from TripmemoreAPI model attribute
	pin: function (url, data) {
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
		}
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url + "/pin", true);

		//adding data
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		    console.log('Pin created');
		  } else {
		  	console.log("well ... something's not right");
		  }
		}
		xhr.send();
	}
}
