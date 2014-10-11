chrome.contextMenus.create({
	"title": "Pin this !",
	"contexts": ["page", "selection", "image", "link"],
	"onclick" : clickHandler
});
