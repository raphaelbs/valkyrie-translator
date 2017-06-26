angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('indigo')
	.accentPalette('red');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		views : {
			'main' : {
				templateUrl : '/views/home.html'
			}
		}
	});
}]);

angular.module('app').controller('app', ['$scope', '$http', function($scope, $http){
	$scope.files = [
		{
			path: 'https://raw.githubusercontent.com/NPBruce/valkyrie/development/unity/Assets/Resources/Text/Localization.txt',
			name: 'Resources'
		},
		{
			path: 'https://raw.githubusercontent.com/NPBruce/valkyrie/development/content/MoM/base/Localization.English.txt',
			name: 'MoM Base'
		}
	];

	$scope.filterLanguages = ["English","Spanish","French","German","Italian","Portuguese","Polish","Japanese","Chinese"];
	$scope.languages = ["English","Spanish","French","German","Italian","Portuguese","Polish","Japanese","Chinese"];
	$scope.keywords = [{title: "ABILITY"}, {title: "ABOUT"}, {title: "ABOUT_FFG"}];

	$scope.load = function (file) {
		$http.get(file.path)
		.then(function (data) {
			$scope.loaded = true;
			$scope.selectedFile = data;
		});
	};
}]);
