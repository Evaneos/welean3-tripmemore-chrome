document.getElementById('tripmemore-pinpage').addEventListener('click', function (){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

		chrome.tabs.executeScript(tabs[0].id, {file:"scripts/lightbox.js"});
		chrome.tabs.sendMessage(tabs[0].id, {type: "startLightbox"});


  //   	chrome.storage.sync.get('tripmemore', function (result) {
		// 	if (result.tripmemore && result.tripmemore.api) {
		// 		TripmemoreAPI.pin(result.tripmemore.api);
		// 	}
		// });

		// console.log(tabs[0].url);

		// var xhr = new XMLHttpRequest();
		// xhr.open("GET", "http://api.example.com/data.json", true);
		// xhr.onreadystatechange = function() {
		//   if (xhr.readyState == 4) {
		//     console.log('oh ! yes !!')
		//   }
		// }
		// xhr.send();
	});
}, false);
