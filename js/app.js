angular
  .module("EndClothing", ["ui.router"])
  .config(Router);

Router.$inject = ["$stateProvider", "$urlRouterProvider"]
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "templates/home.html"
    })
    .state("game", {
      url: "/game",
      templateUrl: "templates/game.html"
    })
    .state("winner", {
      url: "/game/winner",
      templateUrl: "templates/winner.html"
    });

  $urlRouterProvider.otherwise("/")
}