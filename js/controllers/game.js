angular
  .module("EndClothing")
  .controller("GameController", GameController)

  function GameController($scope, $http, $state, $timeout) {

    $scope.zombiesAll = []
    $scope.zombiesDead = []

    // GET request from zombie.json

    $scope.getZombieData = function() {
      $http.get("../zombies.json")
        .success(function(data, status, headers, config) {
          $scope.zombiesAll = data;
          console.log(data)
        }).
        error(function(data, status, headers, config) {
        });
      $scope.zombiesDead = []
      $scope.shotsFired = 0
      $timeout.cancel($scope.timeout);
    }

    // sorting ng-repeat list

    $scope.sortBy = function(header) {
      $scope.reverse = ($scope.header === header) ? ! $scope.reverse : false;
      $scope.header = header;
    };

    // game logic

    var currentTarget

    $scope.shoot = function() {
      
      $scope.shotsFired += 1
      
      var randomNumber = Math.floor(Math.random() * $scope.zombiesAll.length)
      currentTarget = $scope.zombiesAll[randomNumber]
      currentTarget.hp -= currentTarget.damage

      var hpPercentage = 100/currentTarget.maxHp*currentTarget.hp
      if (hpPercentage < 70 && hpPercentage >= 40) {
        document.getElementById(currentTarget.name).className = "orange";
      } else if (hpPercentage < 40 && hpPercentage >= 1) {
        document.getElementById(currentTarget.name).className = "red"
      }

      if(currentTarget.hp <= 0) {
        currentTarget.hp = 0
        $scope.zombiesDead.push(currentTarget);
        $scope.zombiesAll.splice(randomNumber, 1);
        $scope.checkWinner();
      }
    }

    $scope.checkWinner = function() {
      if ($scope.zombiesAll.length === 0 || currentTarget.name === "MASTER ZOMBIE") {
        console.log("you have won the game!")
        $state.go("winner");
        $scope.timeout = $timeout(function() {
          $state.go("home");
        }, 10000)
      }
    }
  }