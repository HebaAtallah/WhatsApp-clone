'use strict';

/**
 * @ngdoc function
 * @name whatsAppCloneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whatsAppCloneApp
 */
angular.module('whatsAppCloneApp')
  .controller('ChatCtrl', function ($scope, $http) {

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
        var getTime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();


    		var data = {
    				messages :$scope.chatData.messages

        };

        data.messages.push({details:$scope.message,'time':getTime,'type':'message-out'});

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
