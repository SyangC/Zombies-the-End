// angular
//   .module("EndClothing")
//   .controller("ZombiesController", ZombiesController)

// function ZombiesController($scope, $http) {

//   $http.get("../zombies.json")
//     .success(function(data, status, headers, config) {
//       $scope.zombiesAll = data;
//       console.log(data)
//     }).
//     error(function(data, status, headers, config) {
//       // log error
//     });

//   $scope.header = 'name';
//   $scope.reverse = true;

//   $scope.sortBy = function(header) {
//     console.log("is this working?")
//     $scope.reverse = ($scope.header === header) ? ! $scope.reverse : false;
//     $scope.header = header;
//   };

// }