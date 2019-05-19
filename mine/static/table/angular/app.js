'use strict';
var app = angular.module('core', []);

app.config(function($interpolateProvider)
{
$interpolateProvider.startSymbol('((');
$interpolateProvider.endSymbol('))');
})

app.controller("tabler", function($scope, $timeout){
	$scope.result_set = data_ticket;
  $timeout(function(){$('#table_ang').DataTable();});

})