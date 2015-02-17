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

        $scope.$apply();
        chrome.tabs.getAllInWindow(function (tabs){
          console.log('tabs: '+tabs.length)
          angular.forEach(tabs, function(tab){
            $scope.allOpenTabs.push(tab.url)


          })
          console.log('open tab url: '+$scope.allOpenTabs)
          console.log('open tab url[0]: '+$scope.allOpenTabs[0])
          console.log('filter1: '+$filter('filter')($scope.allOpenTabs, "",false))
          var bla = 0;

          angular.forEach($scope.histories,function(history){
            $scope.$apply();
            //console.log("history.url: "+history.url)
            //console.log("$scope.allOpenTabs: "+$scope.allOpenTabs[bla])

            console.log("--------------------------------")
            if (($filter('filter')($scope.allOpenTabs, history.url, true)) == history.url) {
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
            } else {
              console.log("--------------------------------")
              console.log("not")
              console.log("history.url: "+history.url)
              console.log("filter result: "+($filter('filter')($scope.allOpenTabs,history.url)))
              console.log("--------------------------------")
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

    $scope.test()

    // Kick off the update function

  });