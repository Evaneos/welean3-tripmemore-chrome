//@todo: should be more like a service
var TripmemoreAPI = {
	model: {
		'default': 'default data'
	},
	pin: function (url, data) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);

		//adding data

		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		    console.log('Pin created')
		  }
		}
		xhr.send();
	}
}
