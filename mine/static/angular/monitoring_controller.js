

function BillingController($scope, $http) {

    //Fetching counts from Zabix
    $scope.zabixFetch = function() {
    $scope.maindiv = false;
    $scope.host_group_count = "";
    $scope.item_count = "";
    $scope.host_count = "";
     $scope.zabixHostGroups();
     $scope.spinner = true;
            console.log($scope.customer);
                $http.get('/advanced_monitoring/zabix_fetch/?customer=' + $scope.customer).success(function(data) {
                     console.log(data);
                     $scope.spinner = false;
                      $scope.host_group_count = data.host_group_count;
                      $scope.item_count = data.item_count;
                      $scope.host_count = data.host_count;

                });

        }

    $scope.zabixHostGroups = function() {
        $scope.hostsGroups = null;
        $scope.hostValues = [];
        $scope.hostOptions = []
        $http.get('/advanced_monitoring/zabix_hosts_groups/?customer='+ $scope.customer).success(function(data){

        $scope.hostValues = data;

        });
    }

    $scope.zabixHosts =function() {
        $scope.more_item_count = "";
        $scope.more_host_count = "";
        $scope.maindiv = true;
        $scope.dv1 = true;
        $scope.dv2 = true;
        $scope.spinner2 = true;
        $http.get('/advanced_monitoring/zabix_hosts/?hostgroup='+ $scope.hostsGroups).success(function(data){


              $scope.spinner2 = false;
              $scope.more_item_count = data.item_count;
              $scope.more_host_count = data.host_count;
              $scope.hostOptions = data.hosts
              $scope.hostsDropdown = true;
        });
    }

    $scope.fetchItems = function() {
        $scope.dv1 = false;
        $scope.spinner2 = true;
        console.log($scope.hosts);
        $scope.more_item_count = "";
        $http.get('/advanced_monitoring/zabix_items/?hostid='+ $scope.hosts).success(function(data){


        $scope.spinner2 = false;
        $scope.more_item_count = data.item_count;


        });
    }



} //End of BillingController
