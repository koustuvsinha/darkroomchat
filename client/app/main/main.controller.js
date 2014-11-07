'use strict';

angular.module('darkroomchatApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.msgs = [];

    $scope.sendMsg = function() {
    	if($scope.chat.sender == '') $scope.chat.sender = 'Anonymous';
    	var payload = {chat : $scope.chat.msg, sender : $scope.chat.sender };
    	//console.log(payload);
    	socket.emit('send msg', payload);
    	$scope.chat.msg = '';
    };

    socket.on('get msg',function(data) {
    	$scope.msgs.push(data);
    	$scope.$digest();
    });

  });
