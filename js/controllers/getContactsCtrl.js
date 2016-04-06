  'use strict';

angular.module("acs_rudra")
  .controller("getContactsCtrl", function($scope, $http, $rootScope, $state, $window, $location, contactService, customHttp) {

    $scope.message = "Is this working ?";

    //FLAGS FOR SHOW AND HIDE

    $scope.load = true;
    $scope.loadCards = true;
    $scope.loadSearchCards = true;
    $scope.searchPreloader = false;
    $scope.add = [];
    $scope.flag = false;
    var _flag = false;

    var searchJSON = [];

    //BY DEFAULT SORTING
    $rootScope.sort = "first_name";

    //INTIAL LOADING OF CONTACTS

    _getAllContacts();

    //INITIALIZING IMPORTANT VARIABLES
    var lpage, _lpage, pointer, _pointer, cpage = 1, _cpage = 1, _total, page = 1, mainJson, _width = 5, _s_width;


    function _getAllContacts(){

      var url = "https://challenge.acstechnologies.com/api/contact";
      var params = {"limit":2,"sort":$rootScope.sort,"desc": true,"page":page};

      //contact service
      contactService.getAllContacts(url, params).then(function (success) {
        //console.log("Inside getAllContacts: " + JSON.stringify(success));
        mainJson = success.data.data;
        //console.log("Before contacts: " + JSON.stringify(mainJson));
        $scope.contacts = mainJson;
        $scope.loadCards = false;
        pagintionVars(success);
      }, function (error) {
        console.log("Error: " + error);
      })
    }


    //PAGINATION CONCEPT --INITIAL LOADING
    function pagintionVars(success) {

              lpage = success.data.last_page;
              $rootScope._lpage = lpage;
              $rootScope._total = success.data.total;
              var now;
              if(lpage > _width) now = _width;
              else now = lpage;

              var current = [];

              pointer = now;
              for(var i = cpage; i <= now; i++){
                current.push(i);
                pointer = i;
              }
              //console.log("Initial: cpage: " + cpage + " pointer: " + pointer);
              $scope.load = false;
              $scope.input = current;

    }

    //BASED ON DROP DOWN MENU SORT IS CARRIED OUT
    $scope.sort = function(type) {
        $rootScope.sort = type;
        $scope.load = true;
        //console.log($rootScope.sort)
        var url = "https://challenge.acstechnologies.com/api/contact";
        var params = {"limit":2,"sort":$rootScope.sort,"desc": true,"page":page};
        //console.log(JSON.stringify(params));
        contactService.getAllContacts(url, params).then(function (success) {
          //console.log("Inside getAllContacts: " + JSON.stringify(success));
          //console.log("Before contacts: " + JSON.stringify(mainJson));
          $scope.load = false;
          setTimeout(function () {
              //$scope.message = "delayed message";
              //console.log($scope.message);
              mainJson = success.data.data;
              $scope.contacts = null;
              $scope.contacts = mainJson;
              $scope.$apply();
              pagintionVars(success);
              Materialize.toast("Sorted", 2000);
          }, 500);
        })
    }

    //SEARCHING CONTACT
    $scope.searchContact = function () {
      $scope.loadCards = true;
      $scope.inSearch = true;
      $scope.flag = true;
      $scope.searchPreloader = true;
      //console.log("Inside search contact");
        _search();
      }

      /*SEARCH FUNCTION */
      $scope.find = function () {
        $scope.loadSearchCards = false;

        var res = [];
        var _arr = $rootScope.arr;
        //console.log("search: " + $scope.search + " length: " + _arr.length  );
        for(var i = 0; i < _arr.length;i++){
          var fn = _arr[i].first_name.toLowerCase();
          var ln = _arr[i].last_name.toLowerCase();
          var cn = _arr[i].company_name.toLowerCase();
          var add = _arr[i].address.toLowerCase();
          var city = _arr[i].city.toLowerCase();
          var state = _arr[i].state.toLowerCase();
          var zip = _arr[i].zip;
          var phone = _arr[i].phone;
          var s = $scope.search.toLowerCase();
          var name = fn + " " + ln ;
          if(s == fn){
            res.push(_arr[i]);
          }else if(s == ln) {
            res.push(_arr[i]);
          }else if(s == name) {
            res.push(_arr[i]);
          }else if(s == cn) {
            res.push(_arr[i]);
          }else if(s == add) {
            res.push(_arr[i]);
          }else if(s == city) {
            res.push(_arr[i]);
          }else if(s == state) {
            res.push(_arr[i]);
          }else if(parseInt(s) == parseInt(phone)) {
            res.push(_arr[i]);
          }else if(parseInt(s) == parseInt(zip)) {
            res.push(_arr[i]);
          }
        }
        $scope._contacts = res;
        var len = res.length;
        _lpage = Math.ceil(len / 2);

        var now;
        if(_lpage > _width) now = _width;
        else now = _lpage;

        var current = [];

        _pointer = now;
        for(var i = _cpage; i <= now; i++){
          current.push(i);
          _pointer = i;
        }
        $scope._input = current;
      }

      function _search() {
        contactService.getFullContacts().then(function (success) {
          //console.log("Success: " + success.length);
          //console.log("elements: " + JSON.stringify(success.data.data[4].first_name));
          $rootScope.arr =  success.data.data;
          _flag = true;
          });
      }

      /* TILL HERE */

      /* FOR SEARCH RESULT PAGINATION */

      $scope._next = function(){
        if(_pointer < _lpage){
          var now;
          if((_lpage - _pointer) >= _width)
            now = _width + _pointer;
          else
            now = _width + (_lpage - _pointer);

          _pointer++;
          _cpage = _pointer;
          var current = [];
          //console.log("cpage: " + _cpage + "  pointer: " + _pointer + " now: " + now + "lpage: " + _lpage);

          for(var i = _cpage; i <= now; i++){
            current.push(i);
            _pointer = i;
          }
          $scope._input = current;
        }else{
          Materialize.toast("No more", 1000);
        }
      }

      $scope._previous = function () {
        var now = 0;
        if(_cpage > 1){
          _cpage -= _width;
          _pointer -= _width;
          //console.log("cpage: " + _cpage + "  pointer: " + _pointer + " now: " + now + "lpage: " + _lpage);
          var current = [];

          now = _pointer;
          for(var i = _cpage; i <= now; i++){
            current.push(i);
            _pointer = i;
          }
          $scope._input = current;
        }else{
          Materialize.toast("No more", 1000);
        }
      }

      /* TILL HERE */

    /*FOR CARDS PAGINATION */
    $scope.next = function(){
      //console.log("Inside")
      if(pointer < lpage){
        var now;
        if((lpage - pointer) >= _width)
          now = _width + pointer;
        else
          now = _width + (lpage - pointer);

        pointer++;
        cpage = pointer;
        var current = [];
        //console.log("cpage: " + cpage + "  pointer: " + pointer + " now: " + now + "lpage: " + lpage);

        for(var i = cpage; i <= now; i++){
          current.push(i);
          pointer = i;
        }
        $scope.input = current;
      }else{
        Materialize.toast("No more", 1000);
      }
    }

    $scope.previous = function () {
      var now = 0;
      if(cpage > 1){
        cpage -= _width;
        pointer -= _width;
        //console.log("cpage: " + cpage + "  pointer: " + pointer + " now: " + now + "lpage: " + lpage);
        var current = [];

        now = pointer;
        for(var i = cpage; i <= now; i++){
          current.push(i);
          pointer = i;
        }
        $scope.input = current;
      }else{
        Materialize.toast("No more", 1000);
      }
    }
    /* TILL HERE  */
    $scope.clear = function () {
      $("#addForm")[0].reset();
    }

    $scope.addContact = function () {
      if($scope.add.first_name == undefined)
        Materialize.toast("First Name required", 5000);
        else{
        var params = {
          "first_name": $scope.add.first_name,
          "last_name": $scope.add.last_name,
          "company_name": $scope.add.company_name,
          "address": $scope.add.address,
          "city": $scope.add.city,
          "state": $scope.add.state,
          "zip": $scope.add.zip,
          "phone": $scope.add.phone,
          "work_phone": $scope.add.work_phone,
          "email": $scope.add.email,
          "url": $scope.add.url
        }

        contactService.addContact(params).then(function (success) {
          Materialize.toast("Contact Added: " +  success.new_contact.first_name, 2000);
          //console.log("Success: " + JSON.stringify(success));
          }, function(error) {
            //console.log("Error: " + JSON.stringify(error));
          }
        )
      }
    }

    $scope.delete = function (id) {
      //console.log("Inside delete: " + id);
      contactService.delete(id).then(function (success) {
        if(success){
          $("#"+id).fadeOut();
            $window.location.reload();
        }else{
          Materialize.toast("Given contact cannot be deleted", 1000);
        }
      })
    }
    $scope.updateContact = function(id){

      if($scope.add.first_name == undefined)
        Materialize.toast("First Name required", 5000);
        else{
          var params = {
            "first_name": $scope.ufs.first_name,
            "last_name": $scope.ufs.last_name,
            "company_name": $scope.ufs.company_name,
            "address": $scope.ufs.address,
            "city": $scope.ufs.city,
            "state": $scope.ufs.state,
            "zip": $scope.ufs.zip,
            "phone": $scope.ufs.phone,
            "work_phone": $scope.ufs.work_phone,
            "email": $scope.ufs.email,
            "url": $scope.ufs.url
          }


          contactService.updateContact(id, params).then(function(success) {
            //console.log("success: " + JSON.stringify(success));
            var res;
            for(var i =0 ;i< mainJson.length; i++){
              if(success.data.updated_contact.id == mainJson[i].id){
                res = success.data.updated_contact;

                mainJson[i].first_name = res.first_name;
                mainJson[i].last_name = res.last_name;
                mainJson[i].company_name = res.company_name;
                mainJson[i].address = res.address;
                mainJson[i].city = res.city;
                mainJson[i].state = res.state;
                mainJson[i].zip = res.zip;
                mainJson[i].phone = res.phone;
                mainJson[i].work_phone = res.work_phone;
                mainJson[i].url = res.url;
                $scope.contacts = mainJson;
                Materialize.toast("Updated !", 3000);
                break;
              }
            }
          })
        }
    }

    var _id;
    $scope.setEmail = function (id) {
      _id = id;
    }


    $scope.email = function () {
      var to = $("#emailid").val();
      contactService.getContact(_id).then(function(success){
        var params = {};
        params.content = success.data;
        params.to = to;

        var details = "params=" + JSON.stringify(params);
        _email(details);
    });
  }

  function _email(details){
    customHttp.request(details, "/email", "POST", function (str){
      if(str){
        Materialize.toast("Email Sent !", 3000);
      }
    })
  }

  /* FOR SEARCH CARDS*/
  var _id1;
  $scope.setEmail1 = function (id) {
    _id1 = id;
  }


  $scope.email1 = function () {
    var to = $("#emailid1").val();
    contactService.getContact(_id1).then(function(success){
      var params = {};
      params.content = success.data;
      params.to = to;

      var details = "params=" + JSON.stringify(params);
      _email(details);
  });
}


    $scope.getContactUpdateForm = function (id) {
      //console.log("ID: " + id);
      var res = {};
      contactService.getContact(id).then(function(success){
        //console.log("success: " + success);
        $scope.ufs = success.data;
      })
    }
    var prev;
    $scope.changePage = function (pageno){
      $("#"+prev).removeClass("active");
      $("#"+pageno).addClass("active");
      prev = pageno;
      Materialize.toast(pageno, 1000);
      $scope.load = true;
      //console.log("Inside changePage  " + pageno);
      contactService.getNextPage(pageno).then(function (success){
        //console.log("success: " + JSON.stringify(success));
         $scope.contacts = success.data.data;
         $scope.load = false;
      }, function(error) { Maretialize.toast(JSON.stringify(error)); });
    }

    $scope.initModals = function() {
      $('.dropdown-button').dropdown();

      $('.modal-trigger').leanModal({
        dismissible: true,
        complete: function () {//alert("inside");
          $('.lean-overlay').remove();
        }
      }); // Initialize the modals
    }

    $scope.closeSearch = function () {
      $scope.flag = false;
      $scope.loadCards = false;
    }
      $scope.$watch("search", function (newValue, oldValue) {
        //console.log("backspace: " + newValue);

        if(newValue == undefined) {
          $scope.flag = false;
          $scope.loadCards = false;
        }
      })

    //END OF CONTROLLER
  })
