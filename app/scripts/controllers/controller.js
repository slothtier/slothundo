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
    $scope.his = $scope.histories[0];

    chrome.history.search({text:'', maxResults:50}, function(historyItems) {
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
      $scope.his = $scope.histories[1].title;
      console.log($scope.histories.length + ' histories');
    });


    // Kick off the update function
    updateTime();
  });