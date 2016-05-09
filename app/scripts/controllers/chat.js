'use strict';

/**
 * @ngdoc function
 * @name whatsAppCloneApp.controller:MainCtrl
 * @description
 * # ChatCtrl
 * Controller of the whatsAppCloneApp
 */
var app=angular.module('whatsAppCloneApp')
  app.controller('ChatCtrl', function ($scope, $http) {


 // get messages
  $scope.chatData=[];
    $http({
      method: 'GET',
      url: 'http://localhost:3000/data2/2'
    }).then(function successCallback(response) {

        $scope.chatData=response.data;
        console.log($scope.chatData);

      }, function errorCallback(response) {

        console.log("error");
      });


      // sendMessage
      $scope.sendMessage = function(){

        new Date($.now());
        var dt = new Date();
        var times = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    		var data = {
    				messages :$scope.chatData.messages

        };


      data.messages.push({details:$scope.message,'time':times,'type':'message-out',image:'images/'+$scope.image});

      var url = 'http://localhost:3000/data2/2';
        $http.patch(url, data).then(function (response) {
          console.log(response.data);

          $scope.message='';

            console.log('all is good', response.data);
        }, function (error) {

            console.log('an error occurred', error.data);
        });

      };
});
