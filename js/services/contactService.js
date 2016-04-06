angular.module("acs_rudra")
  .service("contactService", function ($http, $rootScope, $q){

    this.getAllContacts = function(url, params){
      var deferred = $q.defer();
      //console.log("url: " + url + " params: " + JSON.stringify(params));
      $http({
        method: 'GET',
        url: url,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        },
        params: params
      }).then(function(success){
          //console.log("Success: " + JSON.stringify(success));
          deferred.resolve(success);
      }, function (error) {
        //console.log("Error: " + JSON.stringify(error));
        deferred.resolve(error);
      })
      return deferred.promise;
    }



    this.getNextPage = function(page) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: 'https://challenge.acstechnologies.com/api/contact?page=' + page,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        },
        params: {"limit":2,"sort":$rootScope.sort,"desc": true,"page":page}
      }).then(function (success) {
          //console.log("Success: " + JSON.stringify(success));
          defer.resolve(success);
      }, function(error) {
        //console.log("Error: " + JSON.stringify(error));
        defer.resolve(error);
      })
      return defer.promise;
    }

      var defer = $q.defer();
      this.getFullContacts = function () {
        var url = "https://challenge.acstechnologies.com/api/contact";

        $http({
          method: 'GET',
          url: url,
          headers: {
            'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
          },
          params: {"limit":$rootScope._total,"sort":$rootScope.sort,"desc": true,"page":1}
        }).then(function (success) {
            defer.resolve(success);
        }, function(error) {
          defer.resolve(error);
        })
      return defer.promise;
    }

    this.getContact = function (id) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: 'https://challenge.acstechnologies.com/api/contact/' + id,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        }
      }).then(function (success) {
          //console.log("Success: " + JSON.stringify(success));
          defer.resolve(success);
      }, function(error) {
        defer.resolve(error);
      })
      return defer.promise;
    }

    this.updateContact = function (id, param){
      var defer = $q.defer();
      $http({
        method: 'PUT',
        url: 'https://challenge.acstechnologies.com/api/contact/' + id,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        },
        params: {
          "first_name": param.first_name,
          "last_name": param.last_name,
          "company_name": param.company_name,
          "address": param.address,
          "city": param.city,
          "state": param.state,
          "zip": param.zip,
          "phone": param.phone,
          "work_phone": param.work_phone,
          "email": param.email,
          "url": param.url
        }
      }).then(function (success) {
          //console.log("Success: " + JSON.stringify(success));
          defer.resolve(success);
      }, function(error) {
        defer.resolve(error);
    })
    return defer.promise;
    }

    this.addContact = function (param) {
      var defer = $q.defer();
      //console.log("Inside addContact");
      $http({
        method: 'POST',
        url: 'https://challenge.acstechnologies.com/api/contact',
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        },
        params: param
      }).then(function (success) {
          //console.log("Success: " + JSON.stringify(success));
          defer.resolve(success);
      }, function(error) {
        defer.resolve(error);
      })
      return defer.promise;
    }

    this.searchAllContacts = function(url, _total){
      //console.log("url: " + url + " params: " + JSON.stringify(params));
      var params = {"limit":_total,"per_page": _total, "sort":$rootScope.sort,"desc": true,"page":1};
      $http({
        method: 'GET',
        url: url,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        },
        params: params
      }).then(function(success){
          //console.log("Success: " + JSON.stringify(success));
      }, function (error) {
      })
    }

    this.delete = function (id) {
      var defer = $q.defer();
      $http({
        method: 'DELETE',
        url: 'https://challenge.acstechnologies.com/api/contact/' + id,
        headers: {
          'X-Auth-Token': 'yJlItbSb47Ubn4m41HS4wxKSUVWgTaoNH9x1VBPW'
        }
      }).then(function (success) {
          //console.log("Success: " + JSON.stringify(success));
          defer.resolve(success);
      }, function(error) {
        defer.resolve(error);
      })
      return defer.promise;
    }
  })
