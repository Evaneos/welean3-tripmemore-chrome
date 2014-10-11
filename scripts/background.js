chrome.contextMenus.create({
  title: "Pin this",
  contexts: ["image"],
  onclick : function (info) {
  	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.tabs.executeScript(tabs[0].id, {file:"scripts/lightbox.js"});
			chrome.tabs.sendMessage(tabs[0].id, {type: "startLightbox"});
		});
  }
});
