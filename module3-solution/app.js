(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

//directive

function FoundItems() {
  var ddo = {
    template: '<li ng-repeat="item in narrowItDownController.items">  {{ item.name }},{{item.short_name}}, {{ item.description }} <button ng-click="narrowItDownController.onRemove({index: $index});"> Don\'t want this one! </button></li>',
    scope: {
      items: '<',
      onRemove: '&'
    },
   controller: FoundItemsDirectiveController,
   controllerAs: 'narrowItDownController',
   bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];

//Controller
function NarrowItDownController(MenuSearchService) {
  var narrowItDownController = this;
  //event handler
  narrowItDownController.searchMenu = function(searchTerm){
       narrowItDownController.found = MenuSearchService.getMatchedMenuItems(searchTerm);
       var a = 10;
  }

  narrowItDownController.removeItem = function(index){
    narrowItDownController.found.splice(index,1);
  }

}

// service
MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http,ApiBasePath){
  var service = this;
  // service
  service.getMatchedMenuItems = function (searchTerm) {
     var resultArray = new Array();
     $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then(function (result) {
         // process result and only keep items that match
         var foundItems = result.data.menu_items;
         // return processed items
         for(var i =0; i < foundItems.length; i++){
           if (foundItems[i].description.indexOf(searchTerm) != -1){
             resultArray.push(foundItems[i]);
           }

         }
     }).catch(function (error) {
      console.log(error);
    });

     return resultArray;
   };
}
})();
