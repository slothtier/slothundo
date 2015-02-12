'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});
$scope.removed = '';
chrome.tabs.onRemoved.addListener(function(tabId){
  $scope.removed = tabId;
  alert('closed!')
})
chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
