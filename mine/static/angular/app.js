'use strict';
var app = angular.module('oneconsole', ['ngRoute']);
app.config(function($interpolateProvider)
{
$interpolateProvider.startSymbol('[[');
$interpolateProvider.endSymbol(']]');
})
app.config(['$routeProvider', '$locationProvider', function($routes, $location) {
}]);
app.config(['$httpProvider', function($httpProvider) {
$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);


var app1 = angular.module('security', ['ngRoute','chart.js']);
app1.config(function($interpolateProvider)
{
$interpolateProvider.startSymbol('[[');
$interpolateProvider.endSymbol(']]');
})
app1.config(['$routeProvider', '$locationProvider', function($routes, $location) {
}]);
app1.config(['$httpProvider', function($httpProvider) {
$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);