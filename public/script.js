angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$compileProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $compileProvider, $httpProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('indigo')
	.accentPalette('red');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	// Performance boost
	$compileProvider.debugInfoEnabled(false);
	$compileProvider.commentDirectivesEnabled(false);
	$compileProvider.cssClassDirectivesEnabled(false);
	$httpProvider.useApplyAsync(true);


	// States
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

	$scope.update = function () {
		console.log('update');
	};

	$scope.load = function (file) {
		$http.get(file.path)
		.then(function (data) {
			$scope.loaded = true;
			$scope.selectedFile = data;
			Interpreter(data.data);
		});
	};

	function Interpreter(text) {
		text = text.replace(/(\r\n|\n|\r)/gm, "\n");
		var lines = text.split('\n');
		$scope.languages = lines.shift();
		$scope.languages = $scope.languages.split(',');
		$scope.languages.shift();
		$scope.filterLanguages = angular.copy($scope.languages);
		$scope.keywords = [];
		lines.forEach(function (line) {
			if(line.indexOf(',')>0) $scope.keywords.push(line.substr(0, line.indexOf(',')));
		});
		$scope.keywords.map(function (line) {
			return {title: line};
		});
	}
}]);
