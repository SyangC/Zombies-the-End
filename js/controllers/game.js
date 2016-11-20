angular
  .module("EndClothing")
  .controller("GameController", GameController)

  function GameController($scope, $http, $state, $timeout) {

    $http.get("../zombies.json")
      .success(function(data, status, headers, config) {
        $scope.zombiesAll = data;
        console.log(data)
      }).
      error(function(data, status, headers, config) {
      });

    $scope.zombiesDead = []

    $scope.header = 'name';
    $scope.reverse = true;

    $scope.sortBy = function(header) {
      $scope.reverse = ($scope.header === header) ? ! $scope.reverse : false;
      $scope.header = header;
    };

    $scope.shotsFired = 0

    var currentTarget

    $scope.shoot = function() {

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

      console.log($scope.zombiesAll)

      console.log("Target is:" + currentTarget.name + ". Its hp is:" + currentTarget.hp)
      console.log($scope.zombiesAll.length)
      $scope.shotsFired += 1
    }

    $scope.checkWinner = function() {
      if ($scope.zombiesAll.length === 0 || currentTarget.name === "MASTER ZOMBIE") {
        console.log("you have won the game!")
        $state.go("winner");
        $timeout(function() {
          $state.go("home");
          }, 10000);
      }
    }
  }