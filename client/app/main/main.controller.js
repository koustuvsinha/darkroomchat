'use strict';

angular.module('darkroomchatApp')
  .controller('MainCtrl', function ($scope, $http, $location, sharedProperties) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });


    $scope.submit = function() {
    	console.log($scope.user_name);
    	if($scope.user_name === ''||$scope.user_name == undefined) {
    		$scope.errorName = 'You must provide a name!';
    	}

    	if($scope.gender == undefined) {
    		$scope.errorGender = 'You must provide a gender!';
    	}

    	 else {
    		$scope.errorName = '';
    		$scope.errorGender = '';
    		sharedProperties.setProperty($scope.user_name);
    		sharedProperties.setGender($scope.gender);
    		$location.path('/chat');
    	}
    }

  });
