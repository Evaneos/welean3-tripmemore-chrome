console.log('Oh ! Man ! You loaded me !')

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Oh ! Man ! You clicked me !')
});