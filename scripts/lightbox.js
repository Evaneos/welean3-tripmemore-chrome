// this lightbox creation is really, REALLY dirty and need some refactor
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		// checking reauest type to see if lightbox is already opened or not
		if (request.type == "startLightbox") {
			if (document.getElementById('tripmemore_lightbox_background')) {
				return ;
			}

			// close lightbox function
			closeScriptureLightbox = function() {
				var lb = document.getElementById('tripmemore_lightbox_background');
				lb.parentNode.removeChild( lb );
			}

			// the lightbox background
			background = document.createElement('div');
			background.id = "tripmemore_lightbox_background";
			document.body.appendChild(background);

			// binding lightbox to backround
			lightbox = document.createElement('div');
			lightbox.id = "tripmemore_lightbox";
			lightbox.innerHTML = '<h1>Where should I pin it ?</h1><p><label for="tripmemore-localisation"><input type="text" id="tripmemore-localisation" name="tripmemore-localisation" placeholder="Enter a location" /><input id="tripmemore-localisation-send" type="submit" /></label></p>';
			background.appendChild( lightbox );

			// appending close button to lightbox
			button = document.createElement('button');
			button.onclick=closeScriptureLightbox;
			button.textContent='Close';
			lightbox.appendChild(button);

			// Adding google place callback
			googleInitializer = document.createElement('script');
			googleInitializer.type = 'text/javascript';
			googleInitializer.innerHTML = 'function initialize () {window.tripmemore_autocomplete = new google.maps.places.Autocomplete((document.getElementById("tripmemore-localisation")));document.getElementById("tripmemore-localisation-send").addEventListener("click", function () {var place = tripmemore_autocomplete.getPlace();var event = new CustomEvent("tripmemore-localisation-selected", {"detail" : {"place": place}});document.dispatchEvent(event);}, false);}';
			document.body.appendChild(googleInitializer);

			// Lazy loading google place script
			// will launch initialize function when loaded
			googlePlace = document.createElement('script');
			googlePlace.type = 'text/javascript';
			googlePlace.src = 'http://maps.google.com/maps/api/js?libraries=places&sensor=false&callback=initialize';
			document.body.appendChild(googlePlace);

			// No need, to remove
			sendResponse({farewell: "goodbye"});
		}
	}
);

var TripmemoreAPI = {
	model: {
		'default': 'default data'
	},

	// Used to add a pin
	// Sended data will be made from TripmemoreAPI model attribute
	pin: function (url, data) {
		for (var i = 0; i < data.length; i++) {
			var xhr = new XMLHttpRequest();

			xhr.open("POST", url + "/api/pins", true);
			xhr.setRequestHeader("Content-Type","application/json");

			xhr.onreadystatechange = function() {
			  if (xhr.readyState == 4) {
			    window.closeScriptureLightbox();
			  }
			}
			xhr.send(JSON.stringify(data[i]));
		}
	}
}

// Will be called when a pin is added
document.addEventListener("tripmemore-localisation-selected", function(e) {
		chrome.storage.sync.get('tripmemore', function (result) {
			if (result.tripmemore && result.tripmemore.api) {
				TripmemoreAPI.pin(result.tripmemore.api, [{"origin": e.srcElement.URL, "place": e.detail.place, "media": {"type": "page", "content": ""}}]);
			}
		});
});
