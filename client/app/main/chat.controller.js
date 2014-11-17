'use strict';

angular.module('darkroomchatApp')
  .controller('ChatCtrl', function ($scope, $http, socket, sharedProperties,$location) {
      
    $scope.msgs = [];

    //redirect to main page if values not provided
    if(sharedProperties.getProperty()==''||sharedProperties.getGender=='') {
        $location.path('/');
    }

    console.log("Got from Service : " + sharedProperties.getProperty());

    
    var gender = sharedProperties.getGender();
    if(gender=='M') gender = 'male';
    if(gender=='F') gender = 'female';

    var adj = ["adaptable", "adventurous", "affable", 
    "affectionate", "agreeable", "ambitious", "amiable", "amicable", "amusing", 
    "brave", "bright", "broad-minded", "calm", "careful", "charming", "communicative",
     "compassionate ", "conscientious", "considerate", "convivial", "courageous",
      "courteous", "creative", "decisive", "determined", "diligent", "diplomatic",
       "discreet", "dynamic", "easygoing", "emotional", "energetic", "enthusiastic",
        "exuberant", "fair-minded", "faithful", "fearless", "forceful", "frank", "friendly",
         "funny", "generous", "gentle", "good", "gregarious", "hard-working", "helpful",
          "honest", "humorous", "imaginative", "impartial", "independent", "intellectual",
           "intelligent", "intuitive", "inventive", "kind", "loving", "loyal", "modest", 
           "neat", "nice", "optimistic", "passionate", "patient", "persistent ", "pioneering", 
           "philosophical", "placid", "plucky", "polite", "powerful", "practical", "pro-active",
            "quick-witted", "quiet", "rational", "reliable", "reserved", "resourceful", "romantic",
             "self-confident", "self-disciplined", "sensible", "sensitive", "shy", "sincere", "sociable",
              "straightforward", "sympathetic", "thoughtful", "tidy", "tough", "unassuming",
               "understanding", "versatile", "warmhearted", "willing", "witty"];

    var sender = adj[Math.floor(Math.random() * adj.length) + 1] + " " + gender;
    $scope.sender = sender;

    $scope.sendMsg = function() {
    	if($scope.sender == '') $scope.sender = 'Anonymous';
    	var payload = {chat : $scope.chat.msg, sender : $scope.sender };
    	//console.log(payload);
    	socket.emit('send msg', payload);
    	$scope.chat.msg = '';
    };

    socket.on('get msg',function(data) {
    	$scope.msgs.push(data);
    	$scope.$digest();
    });

  });