(function () {
'use strict';
// ShoppingCart Module
angular.module('ShoppingCartApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

//ToBuyController
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.toBuyItems = ShoppingListCheckOffService.toBuyItems();
  //event handler
  toBuy.addItem = function(name, quantity, index){
    ShoppingListCheckOffService.addItemToAlreadyBought(name, quantity, index);
  }

  toBuy.emptyList = function () {
    return (ShoppingListCheckOffService.toBuyItems().length == 0 ? true:false);
  }
}


// AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService){
  var shopList = this;
  shopList.alreadyBought = ShoppingListCheckOffService.alreadyBoughtItems();

}

// service
function ShoppingListCheckOffService(){
  var service = this;
  var toBuy = [{ name: "Cookies", quantity: 10 },
                { name: "Snickers", quantity: 20 },
               { name: "Chips", quantity: 5 },
              { name: "Apples", quantity: 7 },
            { name: "Bananas", quantity: 8 }];
  var alreadyBought = [];
  // add item to list

  // add item to alreadyBought
  service.addItemToAlreadyBought = function(name, quantity,index){
         var item = {
           name: name,
           quantity:quantity
         };
         alreadyBought.push(item);
         //remove item
         toBuy.splice(index,1);
  }
  // get toBuy items
  service.toBuyItems = function() {
    return toBuy;
  }

  // get alreadyBought items
  service.alreadyBoughtItems = function() {
    return alreadyBought;
  }

}


})();
