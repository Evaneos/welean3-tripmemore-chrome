document.getElementById('tripmemore-pinpage').addEventListener('click', function (){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		console.log(tabs[0].url);
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
