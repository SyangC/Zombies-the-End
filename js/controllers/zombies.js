angular
  .module("EndClothing")
  .controller("ZombiesController", ZombiesController)

// function ZombiesController($scope, $http) {
//   $http({
//     method: "POST",
//     url: "../zombies.json"
//   }).success(function(data) {
//     $scope.zombies = data;
//   });
// }

function ZombiesController($scope, $http) {
  $http.get("../zombies.json")
    .success(function(data, status, headers, config) {
      $scope.zombies = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
}