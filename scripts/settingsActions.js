document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.sync.get('tripmemore', function (result) {
		if (result.tripmemore && result.tripmemore.api) {
			document.getElementById('tripmemore-settings-api').value = result.tripmemore.api;
		}
	});
}, false);

document.getElementById('tripmemore-settings-save').addEventListener('click', function (e){
	e.preventDefault();
    chrome.storage.sync.set(
    	{
    		'tripmemore': {
    			"api" : document.getElementById('tripmemore-settings-api').value
    		}
    	}, function() {
      		console.log('Settings saved');
    	}
	);
}, false);