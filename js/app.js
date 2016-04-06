'use strict';

angular.module("acs_rudra",['ui.router'])


  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

  	$locationProvider.html5Mode(true).hashPrefix('!');

  	$stateProvider

  		.state('home',{
  			url: '/',
  			templateUrl: 'views/getContacts.html',
  			controller: 'getContactsCtrl'
  		})

  })
