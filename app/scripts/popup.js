angular.module('myApp', [])
  .controller('MainCtrl', function($scope, $filter) {
    // Build the date object


    //$scope.test = chrome.history.getVisits();


    $scope.histories = [];
    $scope.visits = [];
    $scope.allOpenTabs = []
    var resultLimit = 30;
    chrome.tabs.get(778, function(tabInfo){
      $scope.tab = tabInfo;
    })

    $scope.test = function(){
      $scope.histories = [];
      $scope.visits = [];
      $scope.allOpenTabs = []
      chrome.history.search({text:'', maxResults:resultLimit}, function(historyItems) {
        for (var i = 0; i < historyItems.length; i++) {
          $scope.histories.push(historyItems[i]);
        }

        $scope.$apply();
        chrome.tabs.getAllInWindow(function (tabs){
          console.log('tabs: '+tabs.length)
          angular.forEach(tabs, function(tab){
            $scope.allOpenTabs.push(tab.url)
          })

          var bla = 0;

          angular.forEach($scope.histories,function(history){
            $scope.$apply();


            console.log("--------------------------------")
            if ($scope.allOpenTabs.indexOf(history.url) != -1) {
              console.log("--------------------------------")
              console.log("found")
              console.log("history.url: "+history.url)
              console.log("filter result: "+($filter('filter')($scope.allOpenTabs,history.url)))
              console.log("im at: "+$scope.histories[bla].url)
              console.log("--------------------------------")
              console.log("length before splicing: "+$scope.histories.length)
              $scope.histories.splice(bla,1);
              console.log("length after splicing: "+$scope.histories.length)
              $scope.$apply();
            }
            bla+=1;
          })

        })



        $scope.$apply();
        console.log('filter3: '+$filter('filter')($scope.histories, {url: ""},false)[0].url)
      });


      console.log('filter2: '+$filter('filter')($scope.allOpenTabs, "",false))
      //angular.forEach($scope.histories,function(history){
      //  if (history.url)
      //    $filter('filter')($scope.allOpenTabs.url, expression, comparator)
      //})
    }
    $scope.filterAlreadyAdded = function(item) {
      return ($scope.allOpenTabs.indexOf(item.url) == -1);
    };


    $scope.test()

  });