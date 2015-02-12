angular.module('myApp', [])
  .controller('MainCtrl', function($scope, $timeout) {
    // Build the date object
    $scope.date = {};

    // Update function
    var updateTime = function() {
      $scope.date.raw = new Date();
      $timeout(updateTime, 1000);
    }

    //$scope.test = chrome.history.getVisits();


    $scope.histories = [];
    $scope.visits = [];
    var resultLimit = 15;
    chrome.tabs.get(778, function(tabInfo){
      $scope.tab = tabInfo;
    })

    chrome.history.search({text:'', maxResults:resultLimit}, function(historyItems) {
      var historiesProcessed = 0;
      for (var i = 0; i < historyItems.length; i++) {
        $scope.histories.push(historyItems[i]);
        chrome.history.getVisits({url: historyItems[i].url}, function(visitItems) {
          for (var i = 0; i < visitItems.length; i++) {
            $scope.visits.push(visitItems[i]);
          }
          historiesProcessed++;
          if (historiesProcessed === historyItems.length) {
            console.log($scope.visits.length + ' visits');
          }
        });
      }

      console.log($scope.histories.length + ' histories');
    });


    // Kick off the update function
    updateTime();
  });