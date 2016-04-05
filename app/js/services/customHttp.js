'use strict';

angular.module('acs_rudra')
.service('customHttp', ['$http', function ($http) {

    this.request = function(impParams, requestLink, type, callback){
    	if(type == 'GET'){
    		requestLink = requestLink+'?'+impParams; //To search using the important parameters by $stateParams
    		impParams = '';
    	}
    	else{
    		//As it is
    	}
        $http({
	        method : type,
	        url : requestLink,
	        data : impParams,
	        headers : {
	        	"Content-Type": 'application/x-www-form-urlencoded'
	    	}
	    })
	    .success(function(data, status, headers, config){
	        callback(data);
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('Error in connection!: ' + data)
        console.log('Error in connection!: ' + status)
        console.log('Error in connection!: ' + headers)
        console.log('Error in connection!: ' + config)
  		});
    }
}])
