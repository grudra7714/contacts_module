'use strict';

angular.module("acs_rudra")
.directive('repeatDone', function() {
   return function(scope, element, attrs) {
       if (scope.$last) { // all are rendered
           scope.$eval(attrs.repeatDone);
       }
   }
});
