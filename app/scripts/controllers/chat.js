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

        // data object
        var data = {
              messages :$scope.chatData.messages

        };

        var image=$scope.image;
        var messageDetails=$scope.message;

        // get date
        new Date($.now());
        var dt = new Date();
        var times = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();


        // uploading functions
        var uploadOnlyImage = function() {
          data.messages.push({'time':times,'type':'message-out',image:'images/'+image});
          var url = 'http://localhost:3000/data2/2';
            $http.patch(url, data).then(function (response) {
              console.log(response.data);

              $scope.message='';

                console.log('all is good', response.data);
            }, function (error) {

                console.log('an error occurred', error.data);
            });
        };

        var uploadOnlyText = function() {
          data.messages.push({details:messageDetails,'time':times,'type':'message-out'});
          var url = 'http://localhost:3000/data2/2';
            $http.patch(url, data).then(function (response) {
              $scope.message='';

                console.log('all is good', response.data);
            }, function (error) {

                console.log('an error occurred', error.data);
            });
        };

        var uploadTextAndImage = function() {
          data.messages.push({details:messageDetails,'time':times,'type':'message-out',image:'images/'+image});
          var url = 'http://localhost:3000/data2/2';
            $http.patch(url, data).then(function (response) {
              console.log(response.data);

              $scope.message='';

                console.log('all is good', response.data);
            }, function (error) {

                console.log('an error occurred', error.data);
            });
        };


        // empty message
        if(messageDetails==undefined && image==undefined ){
          $scope.alertMessage=true;
          $scope.alertMessageContent="The message is empty";
        }

        if(messageDetails=='' && image==undefined){
          messageDetails=undefined;
          $scope.alertMessage=true;
          $scope.alertMessageContent="The message is empty";
        }

        if(messageDetails=='' && image !=undefined){
          messageDetails=undefined;

          var getImageExtension= image.substring(image.lastIndexOf('.') + 1).toLowerCase();
          var imageRightExtension=false;

          if (getImageExtension  == "gif" || getImageExtension == "png" || getImageExtension == "bmp"
                  || getImageExtension == "jpeg" || getImageExtension == "jpg") {

                imageRightExtension=true;
          }
          // right extension
          if (imageRightExtension==true) {

            $scope.alertMessage=false;
            uploadOnlyImage();

          }
          // wrong extension
          else if (imageRightExtension==false) {
            $scope.alertMessage=true;
            $scope.alertMessageContent="You should upload only images";
          }
        }

        // only text
        if (messageDetails !=undefined && image ==undefined){
              $scope.alertMessage=false;
              uploadOnlyText();
          }

        // only image and image validation
        if (messageDetails==undefined && image !=undefined) {

          var getImageExtension= image.substring(image.lastIndexOf('.') + 1).toLowerCase();
          var imageRightExtension=false;

          if (getImageExtension  == "gif" || getImageExtension == "png" || getImageExtension == "bmp"
                  || getImageExtension == "jpeg" || getImageExtension == "jpg") {

                imageRightExtension=true;
          }

          // right extension
          if (imageRightExtension==true) {

            $scope.alertMessage=false;
            uploadOnlyImage();

          }
          // wrong extension
          else if (imageRightExtension==false) {
            $scope.alertMessage=true;
            $scope.alertMessageContent="You should upload only images";
          }
        }

        // text and image
      if (messageDetails!=undefined && image !=undefined) {

        var getImageExtension= image.substring(image.lastIndexOf('.') + 1).toLowerCase();
        var imageRightExtension=false;

        if (getImageExtension  == "gif" || getImageExtension == "png" || getImageExtension == "bmp"
                || getImageExtension == "jpeg" || getImageExtension == "jpg") {

                  imageRightExtension=true;
        }
        console.log(imageRightExtension);
        // right extension
        if (imageRightExtension==true) {

          $scope.alertMessage=false;

          uploadTextAndImage();
        }
        // wrong extension
        else if (imageRightExtension==false) {
          $scope.alertMessage=true;
          $scope.alertMessageContent="You should upload only images";
          uploadOnlyText();

        }
      }

    };
});
