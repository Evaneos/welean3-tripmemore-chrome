chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.type == "startLightbox") {
			if (document.getElementById('tripmemore_lightbox_background')) {
				return ;
			}

			background = document.createElement('div');
			background.id = "tripmemore_lightbox_background";
			lightbox = document.createElement('div');
			lightbox.id = "tripmemore_lightbox";
			lightbox.innerHTML = '<h1>Where should I pin it ?</h1><p><label for="tripmemore-localisation"><input type="text" id="tripmemore-localisation" name="tripmemore-localisation" placeholder="Enter a location" /><input id="tripmemore-localisation-send" type="submit" /></label></p>';

			document.body.appendChild(background);

			background.appendChild( lightbox );

			closeScriptureLightbox = function() {
				var lb = document.getElementById('tripmemore_lightbox_background');
				lb.parentNode.removeChild( lb );
			}

			button = document.createElement('button');
			button.onclick=closeScriptureLightbox;
			button.textContent='Close';
			lightbox.appendChild(button);

			googleInitializer = document.createElement('script');
			googleInitializer.type = 'text/javascript';
			googleInitializer.innerHTML = 'function initialize () {	window.tripmemore_autocomplete = new google.maps.places.Autocomplete((document.getElementById("tripmemore-localisation")));	document.getElementById('tripmemore-localisation-send').addEventListener('click', function () {		var place = tripmemore_autocomplete.getPlace();		console.log(place);		var event = document.createEvent("Event");event.initEvent("tripmemore-localisation-selected");		document.dispatchEvent(event);	}, false);}';
			document.body.appendChild(googleInitializer);

			googlePlace = document.createElement('script');
			googlePlace.type = 'text/javascript';
			googlePlace.src = 'http://maps.google.com/maps/api/js?libraries=places&sensor=false&callback=initialize';

			document.body.appendChild(googlePlace);

			sendResponse({farewell: "goodbye"});
		}
	}
);

document.addEventListener("tripmemore-localisation-selected", function(data) {
		chrome.storage.sync.get('tripmemore', function (result) {
			if (result.tripmemore && result.tripmemore.api) {
				TripmemoreAPI.pin(result.tripmemore.api);
			}
		});
});
