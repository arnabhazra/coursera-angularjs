(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];


function LunchCheckController($scope) {
  $scope.items = "";
  $scope.message = "";

// event handler for button
  $scope.CheckIfTooMuch = function(){
    // input data empty
    $scope.itemCount = 0;
    if($scope.items == ""){
      $scope.message = "Please enter data first";
    }
    // valid data
    else{
      var itemArray = $scope.items.trim().split(',');
      // ignoring empty items
      for(var i =0; i < itemArray.length; i++){
        if(itemArray[i].length != 0){
          $scope.itemCount ++;
        }
      }
      // less than 3 - show Enjoy
      if($scope.itemCount <= 3){
        $scope.message = "Enjoy!";
      }
      // Show Too Much
      else{
        $scope.message = "Too much!";
      }
    }

  }

}




})();
