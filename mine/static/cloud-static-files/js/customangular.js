var contractApp	 = angular.module('mlbsod', ['ngDragDrop', 'angular-cron-jobs']);

contractApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

contractApp.controller('openstack_dashboard_controller', function ($scope, $http, $interval) {
	$scope.dashboard_values=function(){
		$http.get(
		    '/cloud_management/openstack/nodes/list/',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {

		    	$scope.node_list = data

		    }).error(function(data, status, headers, config) {

		    });

	}
	$scope.dashboard_values()
});


contractApp.controller("OpenstackAccountDashboardController", function ($scope, $http, $interval) {

	// $scope.dashboard_meters=function(){
	// 	$http.get(
	// 	    '/cloud_management/openstack/dashboard/value',
	// 	    {
	// 	      'responseType' : 'json',
	// 	    }
	// 	    ).success(function(data) {

	// 	      $scope.cpu_min = parseInt(data.cpu_usage_statistics.min)
 //              $scope.cpu_max = parseInt(data.cpu_usage_statistics.max)
 //              $scope.cpu_avg = parseInt(data.cpu_usage_statistics.avg)
 //              $scope.cpu_sum = parseInt(data.cpu_usage_statistics.sum)
	// 	    }).error(function(data, status, headers, config) {
	// 	    });
	// }


	$scope.overall_instance_graph=function(){

		$http.get(
	    '/cloud_management/openstack/'+cloud_account_id+'/account/statistics',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data){

	    	cpu_data = JSON.parse(data.cpu_usage_statistics)
	    	memory_data = JSON.parse(data.memory_usage_statistics)
	    	network_incomimg_statistics = JSON.parse(data.network_incomimg_statistics)
	    	network_outgoing_statistics = JSON.parse(data.network_outgoing_statistics)

	    	$scope.graph_xaxis_cpu = []
	    	$scope.graph_yaxis_cpu = []
	    	$scope.graph_xaxis_memory = []
	    	$scope.graph_yaxis_memory = []
	    	$scope.network_incomimg_statistics_xaxis = []
	    	$scope.network_incomimg_statistics_yaxis = []
	    	$scope.network_outgoing_statistics_xaxis = []
	    	$scope.network_outgoing_statistics_yaxis = []

	    	jQuery.each(cpu_data, function(index, value){
	    		time_stamp = value['timestamp'].split("T")[1]
	    		$scope.graph_xaxis_cpu.push(time_stamp)
	    		$scope.graph_yaxis_cpu.push(value['volume'])
	    	});
	    	$scope.graph_xaxis_cpu = $scope.graph_xaxis_cpu.reverse()
	    	$scope.graph_yaxis_cpu = $scope.graph_yaxis_cpu.reverse()

	    	jQuery.each(memory_data, function(index, value){
	    		time_stamp = value['timestamp'].split("T")[1]
	    		$scope.graph_xaxis_memory.push(time_stamp)
	    		$scope.graph_yaxis_memory.push(value['volume'])
	    	});

	    	$scope.graph_xaxis_memory = $scope.graph_xaxis_memory.reverse()
	    	$scope.graph_yaxis_memory = $scope.graph_yaxis_memory.reverse()

	    	jQuery.each(network_incomimg_statistics, function(index, value){
	    		time_stamp = value['timestamp'].split("T")[1]
		    	$scope.network_incomimg_statistics_xaxis.push(time_stamp)
	    		$scope.network_incomimg_statistics_yaxis.push(value['volume'])
	    	});

	    	jQuery.each(network_outgoing_statistics, function(index, value){
	    		time_stamp = value['timestamp'].split("T")[1]
		    	$scope.network_outgoing_statistics_xaxis.push(time_stamp)
	    		$scope.network_outgoing_statistics_yaxis.push(value['volume'])
	    	});



			$scope.network_incomimg_statistics_xaxis = $scope.network_incomimg_statistics_xaxis.reverse()
			$scope.network_incomimg_statistics_yaxis = $scope.network_incomimg_statistics_yaxis.reverse()

			$scope.network_outgoing_statistics_xaxis = $scope.network_outgoing_statistics_xaxis.reverse()
			$scope.network_outgoing_statistics_yaxis = $scope.network_outgoing_statistics_yaxis.reverse()



		    var data_network = {
			    labels: $scope.network_outgoing_statistics_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.network_incomimg_statistics_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.network_outgoing_statistics_yaxis
			        }
			    ]
			};

			var ctx = $("#network_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_network);


	    	var data_cpu = {
			    labels: $scope.graph_xaxis_cpu,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_cpu
			        }
			    ]
			};

    	var data_memory = {
	    labels: $scope.graph_xaxis_memory,
	    datasets: [
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: $scope.graph_yaxis_memory
	        }
	    ]
		};

		var ctx = $("#cpudetails_overall").get(0).getContext("2d");
		var myLineChart = new Chart(ctx).Line(data_cpu);

		var ctx = $("#memory_overall").get(0).getContext("2d");
		var myLineChart = new Chart(ctx).Line(data_memory);


	    }).error(function(data, status, headers, config){});
	}

	$scope.overall_instance_graph()



});



contractApp.controller("OpenstackNodeListController", function ($scope, $http, $interval){

	$scope.get_openstack_node_state=function(){
		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/get/node/list/',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$scope.instace_details = data.server_list
		    	if(data.resize_status == true){

		    		setTimeout($scope.get_openstack_node_state, 3000)
		    	}
		    }).error(function(data, status, headers, config) {
		    });
	}

	$scope.get_openstack_node_state()

	$scope.resize_node_confirm = function(id){

		$scope.selected_node_id_for_resize = id
	    $("#resize_node_conform" ).modal('show');
	}


	$scope.openstck_node_resize_conformation = function(id){
		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/node/'+id+'/resize/confirm',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {

		    	$("#resize_node_conform" ).modal('hide');
		    	$scope.get_openstack_node_state()

		    }).error(function(data, status, headers, config) {
		    });
	}


	$scope.openstck_node_resize_cancelation = function(id){
		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/node/'+id+'/resize/cancel',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {

		    	$("#resize_node_conform" ).modal('hide');
		    	$scope.get_openstack_node_state()

		    }).error(function(data, status, headers, config) {
		    });
	}


});



contractApp.controller("OpenstackNodeDetailController", function ($scope, $http, $interval){


	$scope.get_openstack_node_state=function(){
		$http.get(
		    '/cloud_management/openstack/node/'+node_unique_id+'/state/',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {


		    }).error(function(data, status, headers, config) {
		    });
	}

	$scope.node_operation_ajax_sucess = function(data){
	   if(data.sucess_status ==0)
		{
			$('#response_messages').append('<div class="alert alert-danger alert-dismissable alert_div">'+
			    '<i class="fa fa-ban"></i>'+
			    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
			    '<b>Failed! : </b>'+data.message+''+
			'</div>')
		}else{
			$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div">'+
			    '<i class="fa fa-check"></i>'+
			    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
			    '<b>Success! : </b>'+data.message+''+
			'</div>')
		}

		setTimeout(function() {
		$( "#response_messages" ).empty();
		}, 2000);

	}


	$scope.change_size_click=function(){
		data_to_pass = {
			"node_id": node_unique_id,
			"size": $('#id_size').val()
		}
		$.ajax({
	        type: "post",
	        data: data_to_pass,
	        url:'/cloud_management/openstack/resize_node/',
	        success: function(data) {
	        	$("#resize-node-popup" ).modal('hide');
	        	$scope.node_operation_ajax_sucess(data);
	        	if(data.message=="True"){

	        		$("#resize_node_conform" ).modal('show');

	        	}
	        },
	        dataType: "json"
	    });
	};

	$scope.server_operations = function(operation){

		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/server_operations/'+node_unique_id+'/'+operation+'/',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$("#resize-node-popup" ).modal('hide');
		    	$scope.node_operation_ajax_sucess(data);
		    }).error(function(data, status, headers, config){});
	};


	$scope.perform_node_operation = function(operation){

		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/node_operations/'+node_unique_id+'/'+operation+'/',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$("#resize-node-popup" ).modal('hide');
		    	$scope.node_operation_ajax_sucess(data);
		    }).error(function(data, status, headers, config){});
	};


	$scope.load_node_details_graphs = function(){
		$http.get(
		    '/cloud_management/openstack/'+cloud_account_id+'/node/'+node_unique_id+'/statistics',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data){
		    	cpu_data = JSON.parse(data.cpu_usage_statistics)
		    	memory_data = JSON.parse(data.memory_usage_statistics)
		    	network_incomimg_statistics = JSON.parse(data.network_incomimg_statistics)
		    	network_outgoing_statistics = JSON.parse(data.network_outgoing_statistics)
		    	$scope.network_incomimg_statistics_xaxis = []
		    	$scope.network_incomimg_statistics_yaxis = []
		    	$scope.network_outgoing_statistics_xaxis = []
		    	$scope.network_outgoing_statistics_yaxis = []


		    	$scope.graph_xaxis_cpu = []
		    	$scope.graph_yaxis_cpu = []
		    	$scope.graph_xaxis_memory = []
		    	$scope.graph_yaxis_memory = []
		    	jQuery.each(cpu_data, function(index, value){
		    		time_stamp = value['timestamp'].split("T")[1]
		    		$scope.graph_xaxis_cpu.push(time_stamp)
		    		$scope.graph_yaxis_cpu.push(value['volume'])
		    	})
				$scope.graph_xaxis_cpu = $scope.graph_xaxis_cpu.reverse()
				$scope.graph_yaxis_cpu = $scope.graph_yaxis_cpu.reverse()
		    	jQuery.each(memory_data, function(index, value){
		    		time_stamp = value['timestamp'].split("T")[1]
		    		$scope.graph_xaxis_memory.push(time_stamp)
		    		$scope.graph_yaxis_memory.push(value['volume'])
		    	});
				$scope.graph_xaxis_memory = $scope.graph_xaxis_memory.reverse()
				$scope.graph_yaxis_memory = $scope.graph_yaxis_memory.reverse()



		    	jQuery.each(network_incomimg_statistics, function(index, value){
		    		time_stamp = value['timestamp'].split("T")[1]
			    	$scope.network_incomimg_statistics_xaxis.push(time_stamp)
		    		$scope.network_incomimg_statistics_yaxis.push(value['volume'])
	    		});

		    	jQuery.each(network_outgoing_statistics, function(index, value){
		    		time_stamp = value['timestamp'].split("T")[1]
			    	$scope.network_outgoing_statistics_xaxis.push(time_stamp)
		    		$scope.network_outgoing_statistics_yaxis.push(value['volume'])
		    	});

				$scope.network_incomimg_statistics_xaxis = $scope.network_incomimg_statistics_xaxis.reverse()
				$scope.network_incomimg_statistics_yaxis = $scope.network_incomimg_statistics_yaxis.reverse()


				$scope.network_outgoing_statistics_xaxis = $scope.network_outgoing_statistics_xaxis.reverse()
				$scope.network_outgoing_statistics_yaxis = $scope.network_outgoing_statistics_yaxis.reverse()

			    var data_node_network = {
			    labels: $scope.network_outgoing_statistics_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.network_incomimg_statistics_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.network_outgoing_statistics_yaxis
			        }
			    ]
			};

			var ctx = $("#network_node_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_node_network);

		    	var data_cpu = {
			    labels: $scope.graph_xaxis_cpu,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_cpu
			        }
			    ]
			};

	    	var data_memory = {
			    labels: $scope.graph_xaxis_memory,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_memory
			        }
			    ]
			};

			var ctx = $("#cpudetails").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_cpu);

		    }).error(function(data, status, headers, config){});
	};

	$scope.load_node_details_graphs();

})


contractApp.controller("networkController", function ($scope, $http, $interval){

	$scope.network_list=function(){
		$http.get(
		    '/cloud_management/openstack/network/list',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {

			   if(data['status'] == true)
				{
					$scope.network_list_obj = data['network_list']

				}else{

					$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div">'+
					    '<i class="fa fa-check"></i>'+
					    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
					    '<b>Success! : </b>'+data.message+''+
					'</div>')

				}
		    }).error(function(data, status, headers, config){
		    });
	}


	$scope.subnetdetails=function(subnetid){
		$http.get(
		    '/cloud_management/openstack/subnet/'+subnetid+'/details',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$scope.subnet_details_obj = data['subnet_details'];
		    	$("#subnet_details-popup" ).modal('show');
		    }).error(function(data, status, headers, config) {
		    });
		}

	$scope.network_list();
})

contractApp.controller("BillingController", function ($scope, $http, $interval){

	$scope.get_billing_details=function(){
		var time = String($('#date_range').val());
		$scope.start_date = time.split('-')[0];
		$scope.end_date = time.split('-')[1];
		$scope.make_ajax_call();

	}

	$scope.make_ajax_call_for_instance=function(){
    	$http.get(
	    '/cloud_management/openstack/'+cloud_account_id+'/instance/billing/details',
	    {
	      'responseType' : 'json',
	      'params' : {
	        'start_date':$scope.start_date,
	        'end_date':$scope.end_date
	      }
	    }
	    ).success(function(data) {
	    	$scope.server_usages = data.nova_usage.tenant_usage.server_usages;
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	    });
	}

	$scope.load_initial_data=function(){
		var today =  new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year =  today.getFullYear();
		if(day<10) {
			day='0'+day
		}
		if(month<10) {
			month='0'+month
		}
		$scope.start_date = month +'/'+ '01' + '/' + year
		$scope.end_date = month + '/' + day +'/' + year
		$('#date_range').val($scope.start_date+ '-'+$scope.end_date);
		$('#instance_date_range').val($scope.start_date+ '-'+$scope.end_date);
		$scope.make_ajax_call();
		$scope.make_ajax_call_for_instance();
	}

	$scope.make_ajax_call=function(){
	    $http.get(
	    '/cloud_management/openstack/'+cloud_account_id+'/billing/details',
	    {
	      'responseType' : 'json',
	      'params' : {
	        'start_date':$scope.start_date,
	        'end_date':$scope.end_date
	      }
	    }
	    ).success(function(data) {
	    	$scope.project_usage = data.nova_usage;
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	    });
	  }
	$scope.load_initial_data();

	$scope.get_instance_billing_details=function(){
		var time = String($('#date_range').val());
		$scope.start_date = time.split('-')[0];
		$scope.end_date = time.split('-')[1];
		$scope.make_ajax_call_for_instance();
	}


})


contractApp.controller("AwsNodeListController", function ($scope, $http, $interval){

	$scope.instance_not_selcted = true
	 $scope.isActive = function(id) {
        return $scope.selected_node === id;
	};

	$scope.each_node_details=function(id){
		$scope.instance_not_selcted = false

		$scope.selected_node = id; 

		$scope.check_data_exist = false
		$('#instance_statstics_chart').empty()
		$('#loading_gif').show()

		$http.get(
			'/cloud_management/aws/'+cloud_account_id+'/node_details/'+id+'/',
		    {
		      'responseType' : 'json'
		    }
		    ).success(function(data) {
		    	$('#loading_gif').hide()
		    	$('#instance_statstics_chart').empty()

		    	cpu_data = JSON.parse(data.cpu_usage_statistics)
		    	network_incomimg_statistics = JSON.parse(data.network_incoming_speed)
		    	network_outgoing_statistics = JSON.parse(data.network_outgoing_speed)
		    	$scope.check_data_exist = false
		    	$scope.graph_xaxis_cpu = []
		    	$scope.graph_yaxis_cpu = []
		    	$scope.graph_xaxis_memory = []
		    	$scope.graph_yaxis_memory = []
		    	$scope.network_incomimg_statistics_xaxis = []
		    	$scope.network_incomimg_statistics_yaxis = []
		    	$scope.network_outgoing_statistics_xaxis = []
		    	$scope.network_outgoing_statistics_yaxis = []

		    	if(cpu_data.length == 0)
		    	{
		    		$scope.check_data_exist = true 
					$('#instance_statstics_chart').append('<div class="alert alert-warning alert-dismissable">'+
					'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
					'<h4><i class="icon fa fa-warning"></i> Alert!</h4>'+
					'<p>No Statistics available</p></div>')
		    		return 0
		    	}

				$('#instance_statstics_chart').append('<p ng-show="check_data_exist != true">CPU Details (in %)</p>'+
					'<canvas id="cpudetails"  style="width: 300px; height: 250px;"></canvas>'+
					'<p ng-show="check_data_exist != true">Network Details (in Bytes)</p>'+
					'<canvas id="network_node_overall"  style="width: 300px; height: 250px;"></canvas>')

		    	jQuery.each(cpu_data, function(index, value){
		    		time_stamp = value['Timestamp'].split("T")[1]
		    		$scope.graph_xaxis_cpu.push(time_stamp)
		    		$scope.graph_yaxis_cpu.push(value['Average'])
		    	})

				$scope.graph_xaxis_cpu = $scope.graph_xaxis_cpu.reverse()
				$scope.graph_yaxis_cpu = $scope.graph_yaxis_cpu.reverse()

		    	jQuery.each(network_incomimg_statistics, function(index, value){
		    		time_stamp = value['Timestamp'].split("T")[1]
			    	$scope.network_incomimg_statistics_xaxis.push(time_stamp)
		    		$scope.network_incomimg_statistics_yaxis.push(value['Average'])
	    		});

		    	jQuery.each(network_outgoing_statistics, function(index, value){
		    		time_stamp = value['Timestamp'].split("T")[1]
			    	$scope.network_outgoing_statistics_xaxis.push(time_stamp)
		    		$scope.network_outgoing_statistics_yaxis.push(value['Average'])
		    	});


			    var data_node_network = {
			    labels: $scope.network_outgoing_statistics_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.network_incomimg_statistics_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.network_outgoing_statistics_yaxis
			        }
			     ]
			};

			var ctx = $("#network_node_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_node_network);

		    	var data_cpu = {
			    labels: $scope.graph_xaxis_cpu,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_cpu
			        }
			    ]
			};

				var ctx = $("#cpudetails").get(0).getContext("2d");
				var myLineChart = new Chart(ctx).Line(data_cpu);

		    }).error(function(data, status, headers, config) {
		       // called asynchronously if an error occurs
		       // or server returns response with an error status.
	    });
	}


	$scope.create_aws_node_list_page = function(){
		$("#aws-instance-creation-nodedetails").modal('show');
	}



	$scope.shedule_task_for_node = function(node_id, name){


		$scope.get_instance_schedules(node_id);
		$('#schedule_list_table').slimScroll({height:"354px"});
		$('#aws-instance-cron-job').modal('show');
		$scope.selcted_node_id = node_id;
		$scope.selcted_node_name = name;
		$scope.schedule_update = false;
		$scope.serverData = "0 * * * *";
		$scope.instance_action=null;
		$scope.schedule_name=null;
		$scope.schedule_id=null;

	}



	$scope.cronConfig = {
    options: {
        allowMinute : false,
    	}
	}



	$scope.get_instance_schedules = function(node_id){

			$http.get(
		    '/cloud_management/aws/'+cloud_account_id+'/get/'+node_id+'/shedules',
		    {
		      'responseType' : 'json'
		    }
		    ).success(function(data) {

		    	$scope.schedules = data;

		    }).error(function(data, status, headers, config) {
		       // called asynchronously if an error occurs
		       // or server returns response with an error status.
		    });

	}



	 $scope.isScheduleActive = function(id) {
        return $scope.schedule_id === id;
	};



	$scope.schedule_update = false
	$scope.get_instance_schedule = function(id){

			$scope.schedule_id=null;

			$http.get(
		    '/cloud_management/aws/'+cloud_account_id+'/schedule/'+id+'/update',
		    {
		      'responseType' : 'json'
		    }
		    ).success(function(data) {

		    	$scope.schedule_update = true
		    	$scope.serverData = data[0].fields.schedule
   				$scope.instance_action=data[0].fields.action
    			$scope.schedule_name=data[0].fields.name
    			$scope.schedule_id=data[0].pk
		    }).error(function(data, status, headers, config) {
		       // called asynchronously if an error occurs
		       // or server returns response with an error status.
		    });

	}



	$scope.create_schedule_button = function(){

		$scope.schedule_update = false;
		$scope.serverData = "0 * * * *";
		$scope.instance_action=null;
		$scope.schedule_name=null;
		$scope.schedule_id=null;

	}


	$scope.remove_schedule_cron = function(id){

			$http.get(
		    '/cloud_management/aws/'+cloud_account_id+'/schedule/'+id+'/delete',
		    {
		      'responseType' : 'json'
		    }
		    ).success(function(data) {


			$('#aws-instance-cron-job').modal('hide');

			if(data.status ==0)
			{
				$('#response_messages').append('<div class="alert alert-danger alert-dismissable alert_div">'+
				    '<i class="fa fa-ban"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Failed! : </b>'+data.message+''+
				'</div>')
			}else{
				$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div">'+
				    '<i class="fa fa-check"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Success! : </b>'+data.message+''+
				'</div>')
			}

			setTimeout(function() {
			$( "#response_messages" ).empty();
			}, 4000);


		    	

		    }).error(function(data, status, headers, config) {
		       // called asynchronously if an error occurs
		       // or server returns response with an error status.
		    });

	}



	$scope.update_shedule = function(node_id){
    	$scope.params = {
    		'myOutput': $scope.myOutput,
    		'node_id': node_id,
    		'action': $scope.instance_action,
    		'name': $scope.schedule_name,
    		'update':$scope.schedule_update,
    	}
		$http.defaults.headers.post['X-CSRFToken'] = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    	$http.post(
    		'/cloud_management/aws/'+cloud_account_id+'/schedule/'+$scope.schedule_id+'/update',
			$scope.params

		).success(function(data) {

			$('#aws-instance-cron-job').modal('hide');

			if(data.status ==0)
			{
				$('#response_messages').append('<div class="alert alert-danger alert-dismissable alert_div">'+
				    '<i class="fa fa-ban"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Failed! : </b>'+data.message+''+
				'</div>')
			}else{
				$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div">'+
				    '<i class="fa fa-check"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Success! : </b>'+data.message+''+
				'</div>')
			}

			setTimeout(function() {
			$( "#response_messages" ).empty();
			}, 4000);

	    	/*setTimeout('$(".alert").hide()',1500);*/
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });

	}




	$scope.create_new_shedule = function(node_id){
    	$scope.params = {
    		'myOutput': $scope.myOutput,
    		'node_id': node_id,
    		'action': $scope.instance_action,
    		'name': $scope.schedule_name
    	}
		$http.defaults.headers.post['X-CSRFToken'] = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    	$http.post(
    		'/cloud_management/aws/'+cloud_account_id+'/create/new/shedule',
			$scope.params

		).success(function(data) {

			$('#aws-instance-cron-job').modal('hide');

			if(data.status ==0)
			{
				$('#response_messages').append('<div class="alert alert-danger alert-dismissable alert_div">'+
				    '<i class="fa fa-ban"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Failed! : </b>'+data.message+''+
				'</div>')
			}else{
				$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div">'+
				    '<i class="fa fa-check"></i>'+
				    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
				    '<b>Success! : </b>'+data.message+''+
				'</div>')
			}

			setTimeout(function() {
			$( "#response_messages" ).empty();
			}, 4000);

	    	/*setTimeout('$(".alert").hide()',1500);*/
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });

	}


	$scope.imageChangeResponse = function(){

		$('#description_id').remove()

		if ($("#id_image").val() != "") {

		    $http.get(
		    '/cloud_management/aws/image_details/'+$("#id_image").val()+'/',
		    {
		      'responseType' : 'json'
		    }
		    ).success(function(data) {
		    	 $('#id_image').after('<p id="description_id" class="text-green" style="margin-top: 2%;">'+data.descriptions+'</p>')
		    }).error(function(data, status, headers, config) {
		       // called asynchronously if an error occurs
		       // or server returns response with an error status.
		    });
		}
	}



	$scope.GetEC2InstanceListDetails = function(){
	    $http.get(

	    	'/cloud_management/aws/'+cloud_account_id+'/get/EC2/instance/list/',
		    {
		      'responseType' : 'json'
		    }
	    	).success(function(data){
	    		 $scope.loading_instance_list_data = false
	    		 $scope.loading_instance_list_table_data = true

		    	 $scope.aws_node_list = data.aws_node_list
		    	 
		    	 if(data.pending_node_present){
		    	 		$scope.GetEC2InstanceListDetails()
		    	 }
	    	}).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


$scope.loading_instance_list_data = true
$scope.loading_instance_list_table_data = false

$scope.GetEC2InstanceListDetails()

})


contractApp.controller("awsImageInformation", function ($scope, $http, $interval) {

	$scope.image_description_visibility = true

	$scope.get_image_description=function(id){

	    $http.get(
	    '/cloud_management/aws/image_details/'+id+'/',
	    {
	      'responseType' : 'json'
	    }
	    ).success(function(data) {
	    		$scope.image_description_visibility = false
	    	 $scope.image_description = data.descriptions

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


	$scope.create_aws_node = function(id){
		$scope.selected_image = id
		$("#id_image option[value=" +id+"]").attr("selected","selected")
		$("#aws_image_creation").modal('show');
	}

})

contractApp.controller("AWSDashboardController", function ($scope, $http, $interval) {

	$scope.get_aws_dashboard_values=function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/dashboard/values',
	    {
	    	'responseType': 'json'
	    }
	    ).success(function(data) {
	    	cpu_data = JSON.parse(data.cpu_usage_statistics);
	    	network_incomimg_statistics = JSON.parse(data.network_incoming_speed)
	    	network_outgoing_statistics = JSON.parse(data.network_outgoing_speed)
	    	volume_read_bytes = JSON.parse(data.volume_read_bytes)
	    	volume_write_bytes = JSON.parse(data.volume_write_bytes)
	    	$scope.network_incomimg_statistics_xaxis = []
	    	$scope.network_incomimg_statistics_yaxis = []
	    	$scope.network_outgoing_statistics_xaxis = []
	    	$scope.network_outgoing_statistics_yaxis = []
	    	$scope.graph_xaxis_cpu = []
	    	$scope.graph_yaxis_cpu = []
	    	$scope.volume_read_bytes_xaxis = []
	    	$scope.volume_read_bytes_yaxis = []
	    	$scope.volume_write_bytes_xaxis = []
	    	$scope.volume_write_bytes_yaxis = []

			jQuery.each(cpu_data, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.graph_xaxis_cpu.push(time_stamp)
	    		$scope.graph_yaxis_cpu.push(Math.round(value['Sum']))
		    })


			jQuery.each(network_incomimg_statistics, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.network_incomimg_statistics_xaxis.push(time_stamp)
	    		$scope.network_incomimg_statistics_yaxis.push(Math.round(value['Sum']))
		    })

		    jQuery.each(network_outgoing_statistics, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.network_outgoing_statistics_xaxis.push(time_stamp)
	    		$scope.network_outgoing_statistics_yaxis.push(Math.round(value['Sum']))
		    })

		    jQuery.each(volume_read_bytes, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.volume_read_bytes_xaxis.push(time_stamp)
	    		$scope.volume_read_bytes_yaxis.push(Math.round(value['Sum']))
		    })

		    jQuery.each(volume_write_bytes, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.volume_write_bytes_xaxis.push(time_stamp)
	    		$scope.volume_write_bytes_yaxis.push(Math.round(value['Sum']))
		    })

			var data_cpu = {
			    labels: $scope.graph_xaxis_cpu,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_cpu
			        }
			    ]
			};

			var ctx = $("#cpudetails_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_cpu);

			var data_node_network = {
			    labels: $scope.network_incomimg_statistics_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.network_incomimg_statistics_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.network_outgoing_statistics_yaxis
			        }
			    ]
			};

			var ctx = $("#network_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_node_network);

			var volume_read_write_data = {
			    labels: $scope.volume_read_bytes_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.volume_read_bytes_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.volume_write_bytes_yaxis
			        }
			    ]
			};

			var ctx = $("#volume_read_write_graph").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(volume_read_write_data);

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}
	$scope.get_aws_dashboard_values();

})

contractApp.controller("NodeDetailsController", function ($scope, $http, $interval) {

	$scope.get_aws_dashboard_values=function(){

	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/node_details/'+node_unique_id+'/',
	    {
	    	'responseType': 'json'
	    }
	    ).success(function(data) {
	    	cpu_data = JSON.parse(data.cpu_usage_statistics);
	    	network_incomimg_statistics = JSON.parse(data.network_incoming_speed)
	    	network_outgoing_statistics = JSON.parse(data.network_outgoing_speed)
	    	// volume_read_bytes = JSON.parse(data.volume_read_bytes)
	    	// volume_write_bytes = JSON.parse(data.volume_write_bytes)
	    	$scope.network_incomimg_statistics_xaxis = []
	    	$scope.network_incomimg_statistics_yaxis = []
	    	$scope.network_outgoing_statistics_xaxis = []
	    	$scope.network_outgoing_statistics_yaxis = []
	    	$scope.graph_xaxis_cpu = []
	    	$scope.graph_yaxis_cpu = []
	    	$scope.volume_read_bytes_xaxis = []
	    	$scope.volume_read_bytes_yaxis = []
	    	$scope.volume_write_bytes_xaxis = []
	    	$scope.volume_write_bytes_yaxis = []

			jQuery.each(cpu_data, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.graph_xaxis_cpu.push(time_stamp)
	    		$scope.graph_yaxis_cpu.push(Math.round(value['Average']))
		    })


			jQuery.each(network_incomimg_statistics, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.network_incomimg_statistics_xaxis.push(time_stamp)
	    		$scope.network_incomimg_statistics_yaxis.push(Math.round(value['Average']))
		    })

		    jQuery.each(network_outgoing_statistics, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[1]
	    		$scope.network_outgoing_statistics_xaxis.push(time_stamp)
	    		$scope.network_outgoing_statistics_yaxis.push(Math.round(value['Average']))
		    })

		    // jQuery.each(volume_read_bytes, function(index, value){
	    	// 	time_stamp = value['Timestamp'].split("T")[1]
	    	// 	$scope.volume_read_bytes_xaxis.push(time_stamp)
	    	// 	$scope.volume_read_bytes_yaxis.push(Math.round(value['Sum']))
		    // })

		    // jQuery.each(volume_write_bytes, function(index, value){
	    	// 	time_stamp = value['Timestamp'].split("T")[1]
	    	// 	$scope.volume_write_bytes_xaxis.push(time_stamp)
	    	// 	$scope.volume_write_bytes_yaxis.push(Math.round(value['Sum']))
		    // })

			var data_cpu = {
			    labels: $scope.graph_xaxis_cpu,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.graph_yaxis_cpu
			        }
			    ]
			};

			var ctx = $("#cpudetails").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_cpu);

			var data_node_network = {
			    labels: $scope.network_incomimg_statistics_xaxis,
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: $scope.network_incomimg_statistics_yaxis
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.network_outgoing_statistics_yaxis
			        }
			    ]
			};

			var ctx = $("#network_node_overall").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(data_node_network);

			// var volume_read_write_data = {
			//     labels: $scope.volume_read_bytes_xaxis,
			//     datasets: [
			//         {
			//             label: "My First dataset",
			//             fillColor: "rgba(220,220,220,0.2)",
			//             strokeColor: "rgba(220,220,220,1)",
			//             pointColor: "rgba(220,220,220,1)",
			//             pointStrokeColor: "#fff",
			//             pointHighlightFill: "#fff",
			//             pointHighlightStroke: "rgba(220,220,220,1)",
			//             data: $scope.volume_read_bytes_yaxis
			//         },
			//         {
			//             label: "My Second dataset",
			//             fillColor: "rgba(151,187,205,0.2)",
			//             strokeColor: "rgba(151,187,205,1)",
			//             pointColor: "rgba(151,187,205,1)",
			//             pointStrokeColor: "#fff",
			//             pointHighlightFill: "#fff",
			//             pointHighlightStroke: "rgba(151,187,205,1)",
			//             data: $scope.volume_write_bytes_yaxis
			//         }
			//     ]
			// };

			// var ctx = $("#volume_read_write_graph").get(0).getContext("2d");
			// var myLineChart = new Chart(ctx).Line(volume_read_write_data);

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}
	$scope.get_aws_dashboard_values();

	$scope.node_operation_ajax_sucess = function(data){

	   if(data.sucess_status ==0)
		{
			$('#response_messages').append('<div class="alert alert-danger alert-dismissable alert_div" id="alert_messages">'+
			    '<i class="fa fa-ban"></i>'+
			    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
			    '<b>Faild! : </b>'+data.message+''+
			'</div>')
		}else{
			$('#response_messages').append('<div class="alert alert-success alert-dismissable alert_div" id="alert_messages">'+
			    '<i class="fa fa-check"></i>'+
			    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
			    '<b>Success! : </b>'+data.message+''+
			'</div>')
		}
	}

	$scope.node_stop = function(){

		$http.get(
		    '/cloud_management/aws/'+cloud_account_id+'/node_operations/'+node_unique_id+'/stop_instance',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$scope.node_operation_ajax_sucess(data);
		    }).error(function(data, status, headers, config){});

	};


	$scope.node_start = function(){

		$http.get(
		    '/cloud_management/aws/'+cloud_account_id+'/node_operations/'+node_unique_id+'/start_instance',
		    {
		      'responseType' : 'json',
		    }
		    ).success(function(data) {
		    	$scope.node_operation_ajax_sucess(data);
		    }).error(function(data, status, headers, config){});
	};



	$scope.aws_instance_detail = function(){

	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/EC2/instance/'+node_unique_id+'/details/',
	  	{
	      'responseType' : 'json'
	    }
	    ).success(function(data) {
	    	$scope.aws_instance_variable_fro_details = data
	    	$scope.aws_instance_tag_details = data.tags
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });

	}
	$scope.aws_instance_detail();
})

contractApp.controller("AWSBillingController", function ($scope, $http, $interval){

	$scope.get_billing_details=function(){
		var time = String($('#date_range').val());
		$scope.start_date = time.split('-')[0];
		$scope.end_date = time.split('-')[1];
		$scope.make_ajax_call();

	}

	$scope.load_initial_data=function(){
		var today =  new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year =  today.getFullYear();
		if(day<10) {
			day='0'+day
		}
		if(month<10) {
			month='0'+month
		}
		$scope.start_date = month +'/'+ '01' + '/' + year
		$scope.end_date = month + '/' + day +'/' + year
		$('#date_range').val($scope.start_date+ ' - '+$scope.end_date);
		$('#instance_date_range').val($scope.start_date+ '-'+$scope.end_date);
		$scope.make_ajax_call();
	}

	$scope.make_ajax_call=function(){

		$('#instance_statstics_chart').empty()
		$scope.loading_instance_list_data=true;

	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/billing/details',
	    {
	      'responseType' : 'json',
	      'params' : {
	        'start_date':$scope.start_date,
	        'end_date':$scope.end_date
	      }
	    }
	    ).success(function(data) {

	    	billing_details = JSON.parse(data.billing_details);
	    	$scope.billing_details_xaxis = []
			$scope.billing_details_yaxis = []

			$('#instance_statstics_chart').empty();
			$('#instance_statstics_chart').append('<canvas id="last_month_billing_graph" width="700" height="300"></canvas>')

	    	$.each(billing_details, function(index, value){
	    		time_stamp = value['Timestamp'].split("T")[0]
	    		$scope.billing_details_xaxis.push(time_stamp)
	    		$scope.billing_details_yaxis.push((value['Maximum']))
		    })

			var billing_data = {
			    labels: $scope.billing_details_xaxis,
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: $scope.billing_details_yaxis
			        }
			    ]
			};

			var ctx = $("#last_month_billing_graph").get(0).getContext("2d");
			var myLineChart = new Chart(ctx).Line(billing_data);
			$scope.loading_instance_list_data=false;
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	    });
	  }
	$scope.load_initial_data();


})


contractApp.controller("awsKeyPairList", function ($scope, $http, $interval){

	$scope.create_new_EC2_keypair = function function_name(){

		$("#aws_keypair_creation").modal('show');
	}
})


contractApp.controller('oneCtrl', function ($scope, $http, $interval) {
  $scope.list2 = [];
  $scope.list5 = [];
  $scope.noDataAvailable = false;

  // Limit items to be dropped in list1
	$scope.load_my_recipe_list  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/opswork/recipe/list',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	if(data.length==0){
	    		$scope.noDataAvailable = true;
	    	}

	    	$scope.list5 = data
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }

	$scope.load_my_recipe_list()

	$scope.spin_my_instance  = function(){
		$("#submil_instance_Modal").modal('show');
	}


});

contractApp.controller('StackDetailsController', function ($scope, $http, $interval) {


  // Limit items to be dropped in list1
	$scope.get_instances_in_layer  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/opsworks/'+stack_id+'/get/instance/details',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$('#instance-chart').empty()
			$scope.instance_total = data.total
			$scope.instance_error = data.errors
			$scope.instance_running = data.running
			$scope.instance_setup = data.setup
			$scope.instance_shuting_down = data.shuting_down
			$scope.instance_stopped = data.stopped
			$('#instance-chart').append('<canvas id="myChart" width="150" height="150"></canvas>')
			$scope.draw_instance_status_grph(data)
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }
	 $scope.get_instances_in_layer()
	 $interval( function(){ $scope.get_instances_in_layer(); }, 8000);
	 
	$scope.draw_instance_status_grph = function(dataset){
		var data = [
		    {
		        value: dataset.running,
		        color:"#759c3e",
		        highlight: "#759c3e",
		        label: "online"
		    },
		    {
		        value: dataset.errors,
		        color: "#e05243",
		        highlight: "#e05243",
		        label: "errors"
		    },
		    {
		        value: dataset.shuting_down,
		        color: "#986291",
		        highlight: "#986291",
		        label: "shutting down"
		    },
		    {
		        value: dataset.stopped,
		        color: "#ebaa4b",
		        highlight: "#ebaa4b",
		        label: "stopped"
		    },
		    {
		        value: dataset.setup,
		        color: "#4ebcda",
		        highlight: "#4ebcda",
		        label: "setting up"
		    },
		]
    	// Get the context of the canvas element we want to select
	    var ctx = $("#myChart").get(0).getContext("2d");
	    var myDoughnutChart = new Chart(ctx).Doughnut(data, {percentageInnerCutout :75, animateRotate : false,});
	}
});


contractApp.controller('LayerInstanceListController', function ($scope, $http, $interval) {

  // Limit items to be dropped in list1
	$scope.get_instances_in_layer  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/opsworks/stack/'+stack_id+'/get/instance/list',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.layer_list = data.layer_list
	    	if (data.pending_node_present == true){
	    		$scope.get_instances_in_layer()
	    	}
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }
	 $scope.get_instances_in_layer()

	$scope.perform_node_operation = function(instance_id, operation){

		 $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/opsworks/node_operations/'+instance_id+'/'+operation,
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.get_instances_in_layer();
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}
	$scope.show_confirmation_modal= function(layer_id, operation){
		$scope.operation = operation
		$scope.layer_id = layer_id
		if (operation == 'stop_all_instances'){
			$scope.confirm_message = 'This operation will stop all the instances in this layer. Do you want to continue?'
		}
		if (operation == 'start_all_instances'){
			$scope.confirm_message = 'This operation will start all the instances in this layer. Do you want to continue?'
		}
		if (operation == 'delete_layer'){
			$scope.confirm_message = 'This operation will delete this layer. Do you want to continue?'
		}
		$('#confirm_modal').modal('show');

	}

	$scope.perform_layer_operation = function(layer_id, operation){
		$('#confirm_modal').modal('hide');
		 $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/opsworks/layer_operations/'+layer_id+'/'+operation +'/',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	console.log('success')
	    	$scope.get_instances_in_layer();
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


	$scope.spin_my_instance  = function(layer_id){
		$scope.layer_id = layer_id;
		$("#submil_instance_Modal").modal('show');
	}



	$scope.get_layer_recipe_details = function(layer_id){

		 $scope.loading_layer_id = layer_id;
		 $http.get(

		 	'/cloud_management/aws/'+cloud_account_id+'/opsworks/layers/'+layer_id+'/details',

	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.layer_recipe_details = data
	    	$scope.loading_layer_id = 0
	    	$("#layer-details-modal").modal('show');

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}



});


contractApp.controller('aws_iam_role_list', function ($scope, $http, $interval) {

	$scope.init = function(csrf_token){
        $scope.csrf_token = csrf_token;
        $scope.get_iam_role_list();
       
    }

  // Limit items to be dropped in list1
	$scope.get_iam_role_list  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/iam/role/jsonlist',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.iam_role_list = data
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }
    $scope.conform_delete_iam_roles = function() {


		$scope.iam_role_selcted = false
		$scope.selected_iam_role = [];
		$('input:checkbox[name="iam_role_check_box"]:checked').each(function(){
		 	$scope.selected_iam_role.push(this.value)
		})

		if($scope.selected_iam_role.length!=0){
			$scope.iam_role_selcted = true
		}

		$("#iam-drop-role-conformation-modal").modal('show');


    }

	$scope.delete_iam_roles = function() {
		$scope.selected_iam_role = [];
		$('input:checkbox[name="iam_role_check_box"]:checked').each(function(){
		 	$scope.selected_iam_role.push(this.value)
		})
		$("#iam-drop-role-conformation-modal").modal('hide');
    	$scope.params = {
    		'names': $scope.selected_iam_role
    	}
		$http.defaults.headers.post['X-CSRFToken'] = $scope.csrf_token;
    	$http.post(
    		'/cloud_management/aws/'+cloud_account_id+'/iam/drop/roles',
			$scope.params

		).success(function(data) {
	    	$scope.response_message = data.msg
	    	$scope.response_status = data.status
	    	$scope.get_iam_role_list();
	    	/*setTimeout('$(".alert").hide()',1500);*/
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });


	};

});


contractApp.controller('Iam_Group_Controller', function ($scope, $http, $interval) {

	$scope.init = function(csrf_token){
        $scope.csrf_token = csrf_token;
        $scope.get_iam_group_list();

    };


	$scope.get_iam_group_list  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/iam/group/jsonlist',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.iam_group_list = data
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }


	$scope.conform_delete_iam_groups = function() {

		$scope.iam_group_selcted = false;

		$scope.selected_iam_group = [];
		$('input:checkbox[name="iam_group_check_box"]:checked').each(function(){
		 	$scope.selected_iam_group.push(this.value)
		})

		if($scope.selected_iam_group.length!=0){
			$scope.iam_group_selcted = true
		}



		$("#iam-drop-groups-conformation-modal").modal('show');

    }

	$scope.delete_iam_groups = function() {
		$scope.selected_iam_group = [];
		$('input:checkbox[name="iam_group_check_box"]:checked').each(function(){
		 	$scope.selected_iam_group.push(this.value)
		})
		console.log($scope.selected_iam_group);
		$("#iam-drop-role-conformation-modal").modal('hide');
    	$scope.params = {
    		'names': $scope.selected_iam_group
    	}
    	$("#iam-drop-groups-conformation-modal").modal('hide');
		$http.defaults.headers.post['X-CSRFToken'] = $scope.csrf_token;
    	$http.post(
    		'/cloud_management/aws/'+cloud_account_id+'/iam/drop/groups',
			$scope.params

		).success(function(data) {
			$(".alert-test").show()
	    	$scope.response_message = data.msg
	    	$scope.response_status = data.status
	    	$scope.get_iam_group_list();
	    	setTimeout('$(".alert-test").hide()',1500);
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });


	};

});


contractApp.controller('IAM_user_details_controller', function ($scope, $http, $interval) {


	$scope.init = function(csrf_token, username){
        $scope.csrf_token = csrf_token;
        $scope.iam_user_name = username;
        $scope.get_iam_group_list_for_user();
       
    };


	
	$scope.get_iam_group_list  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/iam/group/jsonlist',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.iam_group_list = data
	    	$scope.get_iam_group_list_for_user()





			for (var j = 0; j < $scope.iam_group_list_for_user.length ; j++) {

				var test1 = $scope.iam_group_list_for_user[j].group_name

			for (var i = 0; i < $scope.iam_group_list.length ; i++) {
				var test = $scope.iam_group_list[i].group_name
				console.log(test)
			    if(test1 === test) {
			        $scope.iam_group_list.splice(i,1);

			    }
			}

		}









	    	console.log($scope.iam_group_list)
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }


	$scope.get_all_group_list = function() {
		$("#iam-groups-dropdown-modal").modal('show');
		$scope.get_iam_group_list()

	};

	$scope.add_user_to_groups = function() {
		$scope.selected_iam_group = [];
		$('input:checkbox[name="iam_group_check_box"]:checked').each(function(){
		 	$scope.selected_iam_group.push(this.value)
		})
		console.log($scope.selected_iam_group);
		$("#iam-groups-dropdown-modal").modal('hide');
    	$scope.params = {
    		'groupnames': $scope.selected_iam_group,
    		'username': $scope.iam_user_name
    	}
    	$("#iam-drop-groups-conformation-modal").modal('hide');
		$http.defaults.headers.post['X-CSRFToken'] = $scope.csrf_token;
    	$http.post(
    		'/cloud_management/aws/'+cloud_account_id+'/iam/add/uer/ToGroups',
			$scope.params

		).success(function(data) {
			$(".alert").show()

	    	$scope.response_message = data.msg
	    	$scope.response_status = data.status
	    	$scope.iam_group_list = []
	    	$scope.get_iam_group_list_for_user();
	    	setTimeout('$(".alert").hide()',1500);

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });


	};


	$scope.remove_user_from_iam_group  = function(group_name){
	    $http.get(

	    '/cloud_management/aws/'+cloud_account_id+'/iam/remove/user/'+$scope.iam_user_name+'/from/'+group_name+'/group',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$(".alert").show()
	    	$scope.response_message = data.msg
	    	$scope.response_status = data.status
	    	$scope.get_iam_group_list_for_user();
	    	setTimeout('$(".alert").hide()',1500);
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }





	$scope.get_iam_group_list_for_user  = function(){
	    $http.get(
	    '/cloud_management/aws/'+cloud_account_id+'/iam/user/'+ $scope.iam_user_name +'/group/list',
	    {
	      'responseType' : 'json',
	    }
	    ).success(function(data) {
	    	$scope.iam_group_list_for_user = data
	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	 }


});


contractApp.controller('create_vm_controller', function ($scope, $http, $interval) {

	 $scope.init = function(){

			$scope.service_name_response_button = true
			$scope.loading_instance_list_data = false
			$scope.service_name_error = false
			$scope.userPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
			$scope.usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{3,7}$/
			$scope.get_cloud_service_osimage_list()
			$scope.get_cloud_service_role_size_list()
			$scope.get_cloud_service_location_list()
    }


	$scope.check_availblity_of_cloudservice_name  = function(service_name){
		$scope.service_name_error = false
		$scope.loading_instance_list_data = true
	    $http.get(
	    '/cloud_management/azure/'+cloud_account_id+'/check/service/'+service_name+'/name',
	    {

	      'responseType' : 'json',

	    }).success(function(data){
	    	$scope.loading_instance_list_data = false

	    	if(data['AvailabilityResponse']['Result'] == "false"){

	    		$scope.service_name_error_message = data['AvailabilityResponse']['Reason']
	    		$scope.service_name_error = true
	    	}
	    	else{
	    		$scope.service_name_response_button = false
	    	}

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}



	$scope.get_cloud_service_storage_list  = function(location){

		$scope.loading_instance_list_data = true
		$scope.azure_storage_list = []

	    $http.get(
	    '/cloud_management/azure/'+cloud_account_id+'/get/stotage/details?location='+location+'',
	    {
	    	'responseType' : 'json',
	    }).success(function(data){
	    	$scope.loading_instance_list_data = false
	    	$scope.azure_storage_list = data.storage_list

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


	$scope.get_cloud_service_osimage_list  = function(){

		$scope.loading_instance_list_data = true
		$scope.azure_osimage_list = []

	    $http.get(
	    '/cloud_management/azure/'+cloud_account_id+'/get/osimage/list/',
	    {
	    	'responseType' : 'json',
	    }).success(function(data){
	    	$scope.loading_instance_list_data = false
	    	$scope.azure_osimage_list = data.images_list

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


	$scope.get_cloud_service_location_list  = function(){

		$scope.loading_instance_list_data = true
		$scope.azure_location_list = []

	    $http.get(
	    '/cloud_management/azure/'+cloud_account_id+'/get/location/list/',
	    {
	    	'responseType' : 'json',
	    }).success(function(data){
	    	$scope.loading_instance_list_data = false
	    	$scope.azure_location_list = data.location_list

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}


	$scope.get_cloud_service_role_size_list  = function(){

		$scope.loading_instance_list_data = true
		$scope.azure_role_size_list = []

	    $http.get(
	    '/cloud_management/azure/'+cloud_account_id+'/get/rolesize/list/',
	    {

	    	'responseType' : 'json',

	    }).success(function(data){
	    	$scope.loading_instance_list_data = false
	    	$scope.azure_role_size_list = data.role_size_list

	    }).error(function(data, status, headers, config) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.
	    });
	}
})


contractApp.controller("AzureVMListController", function ($scope, $http, $interval) {
        $scope.init = function(csrf_token){
        $scope.csrf_token = csrf_token;
        $scope.loading_instance_list_data = true
                $scope.loading_instance_list_table_data = false
        $scope.get_azure_vm_list();
    }


        $scope.get_azure_vm_list = function(){
            $http.get(

                  '/cloud_management/azure/'+cloud_account_id+'/get/vm/list/',
                    {
                      'responseType' : 'json'
                    }
                  ).success(function(data){
                           $scope.loading_instance_list_data = false;
                           $scope.loading_instance_list_table_data = true;
                           $scope.instance_list = data.instance_list;

                           if(data.pending_node_present){
                            $scope.get_azure_vm_list()
                           }
                  }).error(function(data, status, headers, config) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
            });
        }

        $scope.perform_azure_vm_operation = function(operation, service, deployment, role){
                data = {
                        'service_name': service,
                        'deployment_name': deployment,
                        'role_name':role
                }
                $http.defaults.headers.post['X-CSRFToken'] = $scope.csrf_token;
            $http.post(

                  '/cloud_management/azure/'+cloud_account_id+'/vm_operations/'+operation+'/',
                  data,
                    {
                      'responseType' : 'json'
                    }
                  ).success(function(data){
                           $scope.get_azure_vm_list()
                  }).error(function(data, status, headers, config) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
            });
        }
});



contractApp.controller("AzureVMDetailsController", function ($scope, $http, $interval) {


        $scope.get_azure_vm_metric_data = function(metric_name){
        	$('#vm_metric_graph_container').empty()
        	$scope.loading_instance_list_data = true
            $http.get(

                  '/cloud_management/azure/'+cloud_account_id+'/vm/'+service_name+'/'+deployment_name+'/'+vm_name+'/metric/'+metric_name+'/details/',
                    {
                      'responseType' : 'json',
                       'params' : {
					        'start_date':$scope.start_date,
					        'end_date':$scope.end_date
						}
                    }
                  ).success(function(data){
                  	if (data){
                  	$scope.graph_xaxis_cpu = []
                  	$scope.graph_yaxis_cpu_average = []
                  	$scope.graph_yaxis_cpu_maximum = []
                  	$scope.graph_yaxis_cpu_minimum = []
					cpu_data = data.MetricValue;
			    	jQuery.each(cpu_data, function(index, value){
			    		time_stamp = value['Timestamp']
			    		$scope.graph_xaxis_cpu.push(time_stamp)
			    		$scope.graph_yaxis_cpu_average.push(value['Average'])
			    		$scope.graph_yaxis_cpu_maximum.push(value['Maximum'])
			    		$scope.graph_yaxis_cpu_minimum.push(value['Minimum'])
			    	});

			    	$('#vm_metric_graph_container').html('<canvas id="vm_metric_details" width="700" height="300"></canvas>')



				    var data_network = {
					    labels: $scope.graph_xaxis_cpu,
					    datasets: [
					        {
					            label: "Maximum",
					            fillColor: "#fff",
					            strokeColor: "rgb(2, 158, 135)",
					            pointColor: "rgb(2, 158, 135)",
					            pointStrokeColor: "rgb(2, 158, 135)",
					            pointHighlightFill: "rgb(2, 158, 135)",
					            pointHighlightStroke: "rgb(2, 158, 135)",
					            data: $scope.graph_yaxis_cpu_maximum
					        },
					        {
					            label: "Average",
					            fillColor: "#fff",
					            strokeColor: "#ff6666",
					            pointColor: "#ff6666",
					            pointStrokeColor: "#ff6666",
					            pointHighlightFill: "#ff6666",
					            pointHighlightStroke: "#ff6666",
					            data: $scope.graph_yaxis_cpu_average
					        },
					       	{
					            label: "Minimum",
					            fillColor: "#fff",
					            strokeColor: "rgba(151,187,205,1)",
					            pointColor: "rgba(151,187,205,1)",
					            pointStrokeColor: "#fff",
					            pointHighlightFill: "#fff",
					            pointHighlightStroke: "rgba(151,187,205,1)",
					            data: $scope.graph_yaxis_cpu_minimum
					        }
					    ]
					};
					 var options = {
								pointDot: false, 
								bezierCurve :false, datasetStrokeWidth:4, 
								scaleGridLineColor : "rgb(204, 204, 204)", 
								scaleShowVerticalLines: false, 
								multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
								scaleLabel: "<%=value%>",
								scaleFontColor: "rgb(68, 73, 73)",
								responsive: true,
					}

					var ctx = $("#vm_metric_details").get(0).getContext("2d");
					if(metric_name == 'cpu_percentage')
					{
						$scope.chart_title = "CPU Details(%)"
						var options = {
								pointDot: false, 
								bezierCurve :false, datasetStrokeWidth:4, 
								scaleGridLineColor : "rgb(204, 204, 204)", 
								scaleShowVerticalLines: false,scaleOverride: true, 
								scaleSteps:5,scaleStepWidth:20, 
								scaleStartValue:0, 
								multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
								scaleLabel: "<%=value%>.00%",
								scaleFontColor: "rgb(68, 73, 73)",
								responsive: true,
						};
					}else if(metric_name == 'network_out'){
						$scope.chart_title = "Network OUT details (Bytes/sec)"
					}else if(metric_name == 'network_in'){
						$scope.chart_title = "Network IN details (Bytes/sec)"
					}else if(metric_name == 'disk_read'){
						$scope.chart_title = "Disk Read details (Bytes/sec)"
					}
					var myLineChart = new Chart(ctx).Line(data_network, options);
				}else
				{
					$('#vm_metric_graph_container').append('<div class="alert alert-warning alert-dismissable">'+
					'<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'+
					'<h4><i class="icon fa fa-warning"></i> Alert!</h4>'+
					'<p>No Statistics available</p></div>')
				}

					$scope.loading_instance_list_data = false


                  }).error(function(data, status, headers, config) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
            });
        }


    $scope.show_vm_cpu_details_modal = function(metric_name) {
				$("#vm_cpu_Modal").modal('show');
				$scope.load_initial_data()
				$scope.metric_name = metric_name
				$scope.get_azure_vm_metric_data(metric_name);

	};


	$scope.get_metric_details=function(){

		var time = String($('#date_range').val());
		$scope.start_date = time.split('-')[0];
		$scope.end_date = time.split('-')[1];
		$scope.get_azure_vm_metric_data($scope.metric_name);

	}


	$scope.load_initial_data=function(){
		var today =  new Date();
		var day = today.getDate();
		var days = today.getDate()-1;
		var month = today.getMonth()+1;
		var year =  today.getFullYear();
		if(day<10) {
			day='0'+day
		}
		if(month<10) {
			month='0'+month
		}
		$scope.start_date = month +'/'+ days + '/' + year
		$scope.end_date = month + '/' + day +'/' + year
		$('#date_range').val($scope.start_date+ '-'+$scope.end_date);
	}

});



