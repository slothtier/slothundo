'use strict';
angular.module('myApp', [])
.run(function() {
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
      console.log('closed: '+tabId)
    });
  console.log('Im running!');
});



