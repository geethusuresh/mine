// edit_survey.html, add_survey.html
function SurveyController($scope, $http) {
    // Fetching the Survey Details by passing the survey id as an argument in init method
    $scope.init = function(csrf_token, survey_id) {
            $scope.csrf_token = csrf_token;
            $scope.survey_id = survey_id;
            if ($scope.survey_id) {
                $http.get('/survey/edit/' + $scope.survey_id + '/').success(function(data) {
                    $scope.survey = data;
                    $scope.questions = data.questions;
                    $scope.survey_questions = data.survey_questions;
                    $scope.select_question();
                });
            }
        }
        // Fetching the Question Details 
    $scope.select_question = function() {
            if ($scope.survey_id) {
                $scope.surv_quest = $scope.survey_questions;
            }
            if ($scope.surv_quest == undefined) {
                $scope.surv_quest = [];
            }
            params = {
                'question_ids': $scope.surv_quest.toString(),
                'csrfmiddlewaretoken': $scope.csrf_token,
            }
            $http({
                method: "post",
                url: "/survey/question_details/",
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                $scope.questions_data = [];
                $scope.questions_data = data;
            }).error(function(data) {
                console.log(data);
            })
        }
        // Validating the survey fields before sending the save request
    $scope.validate = function() {
            if ($scope.survey.survey_title == undefined || $scope.survey.survey_title == '') {
                return false;
            } else if ($scope.survey.survey_description == undefined || $scope.survey.survey_description == '') {
                return false;
            } else if ($scope.survey.survey_condition == undefined || $scope.survey.survey_condition == '') {
                return false;
            } else if ($scope.survey.customer == undefined || $scope.survey.customer == '') {
                return false;
            } else if ($scope.survey.survey_questions == undefined) {
                return false;
            }
            return true;
        }
        // Sending Survey save request
    $scope.edit_survey = function() {
        $scope.survey.survey_questions = $scope.survey_questions;
        params = {
            'csrfmiddlewaretoken': $scope.csrf_token,
            'survey': angular.toJson($scope.survey),
        }
        if ($scope.validate()) {
            $http({
                method: "post",
                url: "/survey/edit/" + $scope.survey_id + "/",
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                document.location.href = '/survey/list/';
            });
        }
    }
}

// survey_response.html
// Handling survey Response

function SurveyResponseController($scope, $http) {

    $scope.survey = {
            'survey_id': '',
            'ticket_id': '',
            'questions': [],
        }
        // Fetching the Survey Details by passing the survey id, ticket id, user id as an argument in init method
    $scope.init = function(csrf_token, survey_id, ticket_id, user_id) {
        $scope.survey_id = survey_id;
        $scope.ticket_id = ticket_id;
        $scope.user_id = user_id;
        $scope.survey.survey_id = survey_id;
        $scope.survey.ticket_id = ticket_id;
        $scope.csrf_token = csrf_token;
        if ($scope.survey_id && $scope.ticket_id) {
            $http.get('/survey/' + $scope.survey_id + '/ticket/' + $scope.ticket_id + '/user/' + $scope.user_id + '/?ajax=true').success(function(data) {
                $scope.survey_questions = data.questions;
            });
        }
    }
    $scope.choose_answer = function(choice, question) {
        // choosing qusetion's answer and make the checkbox clicked by adding the 'checked' class
        question.answer_choice = choice.choice_id;
        for (var i = 0; i < question.choices.length; i++) {
            parent_div = $('#' + question.choices[i].id_val).parent();
            parent_div.removeClass('checked');
        }
        parent_div = $('#' + choice.id_val).parent();
        parent_div.addClass('checked');
    }
    $scope.response_validation = function() {
        // validating survey response
        $scope.error_message = '';
        for (var i = 0; i < $scope.survey.questions.length; i++) {
            console.log($scope.survey.questions[i]);
            if ($scope.survey.questions[i].q_type == 'choice') {
                if ($scope.survey.questions[i].answer_choice == '' || $scope.survey.questions[i].answer_choice == undefined) {
                    $scope.error_message = 'Please choose the option for the question ' + (i + 1);
                    $('#error_msg').addClass('alert alert-danger');
                    return false;
                }
            } else {
                if ($scope.survey.questions[i].answer_text == '' || $scope.survey.questions[i].answer_text == undefined) {
                    $scope.error_message = 'Please answer to the question ' + (i + 1);
                    $('#error_msg').addClass('alert alert-danger');
                    return false;
                }
            }
        }
        return true;
    }
    $scope.save_response = function() {
        // sending request to save the survey response
        // $scope.survey.questions = $scope.survey_questions;
        $scope.survey.questions = [];
        for (var i = 0; i < $scope.survey_questions.length; i++) {
            $scope.survey.questions.push({
                'q_id': $scope.survey_questions[i].q_id,
                'q_type': $scope.survey_questions[i].q_type,
                'answer_choice': $scope.survey_questions[i].answer_choice,
                'answer_text': $scope.survey_questions[i].answer_text,
            })
        }
        if ($scope.response_validation()) {
            params = {
                'csrfmiddlewaretoken': $scope.csrf_token,
                'survey': angular.toJson($scope.survey),
            }
            $http({
                method: "post",
                url: "/survey/" + $scope.survey_id + "/ticket/" + $scope.ticket_id + '/user/' + $scope.user_id + '/',
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                document.location.href = '/?survey=ok';
            });
        }
    }
}




function realtimedata_dash($scope, $http, $timeout) {

    var arcs = null;
    $scope.results = results;
    $scope.agg = agg;
    $scope.accountid = accountid;

    $scope.realtime = function() {
        // console.log("i am running");
        $http({
            method: "POST",
            url: '/dashboard/realtimegraph/map/' + accountid,
            data: {}
        }).success(function(data) {
            $scope.results = data.dat;
            $scope.agg = data.agg;
            $scope.datas();
        })
    }



    setInterval($scope.realtime, 2000);
    setInterval($scope.realtime_all, 2000);

    var origin_list = function() {
        var origin = [];
        var base = {};
        for (i = 0; i < $scope.results.length; i++) {
            var base = {};
            base['origin'] = {
                "latitude": $scope.results[i].latitude,
                "longitude": $scope.results[i].longitude
            }
            base['destination'] = {
                "latitude": $scope.results[i].in_lat,
                "longitude": $scope.results[i].in_long
            }
            origin.push(base);
        }
        return origin;
    }

    $scope.newvalue = origin_list();


    $scope.datas = function() {
        $('#canvas-container').html($('<div>').attr({
            id: 'arcs'
        }));
        var arcs = new Datamap({
            element: document.getElementById("arcs"),
            scope: 'world',
            responsive: true,
            // projection: 'mercator',
            animationSpeed: 20000,
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            fills: {
                defaultFill: "#9cc96b",
                win: 'rgba(100, 10, 200, 0.4)'
            },
            data: {
                'TX': {
                    fillKey: 'win'
                },
                'FL': {
                    fillKey: 'win'
                },
                'NC': {
                    fillKey: 'win'
                },
                'CA': {
                    fillKey: 'win'
                },
                'NY': {
                    fillKey: 'win'
                },
                'CO': {
                    fillKey: 'win'
                }
            }
        });


        arcs.arc(origin_list(), {
            strokeWidth: 3,
            arcSharpness: 1,
            strokeColor: '#f76c51'
        });
    }

    $scope.datas();


    var get_values = function() {
        var origin = [];
        base = {};
        for (i = 0; i < $scope.results.length; i++) {
            base = {
                "latitude": $scope.results[i].latitude,
                "longitude": $scope.results[i].longitude
            }
            origin.push(base);
        }
        return origin;
    }


    // all customer

    $scope.customer_attack = function() {
        $('#canvas-container').html($('<div>').attr({
            id: 'arcs'
        }));
        var arcs = new Datamap({
            element: document.getElementById("arcs"),
            scope: 'world',
            responsive: true,
            // projection: 'mercator',
            animationSpeed: 20000,
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            fills: {
                defaultFill: "#9cc96b",
                win: 'rgba(100, 10, 200, 0.4)'
            },
            data: {
                'TX': {
                    fillKey: 'win'
                },
                'FL': {
                    fillKey: 'win'
                },
                'NC': {
                    fillKey: 'win'
                },
                'CA': {
                    fillKey: 'win'
                },
                'NY': {
                    fillKey: 'win'
                },
                'CO': {
                    fillKey: 'win'
                }
            }
        });


        arcs.arc(origin_list(), {
            strokeWidth: 3,
            arcSharpness: 1,
            strokeColor: '#f76c51'
        });
    }



}






function realtimedata_dash_all($scope, $http, $timeout) {

    var arcs = null;
    $scope.results = results;
    $scope.agg = agg;
    $scope.custid = custid;
    $scope.levels = levels;
    $scope.labels = ["High", "Medium", "Low"];
    $scope.chart_color = ['#e74c3c','#e67e22','#3498db']
    $scope.realtime_all = function() {
        // console.log("i am running");
        $http({
            method: "POST",
            url: '/dashboard/realtime/map/customer/' + custid,
            data: {}
        }).success(function(data) {
            $scope.results = data.dat;
            $scope.agg = data.agg;
            $scope.levels = data.levels;
            $scope.customer_attack();
            $("#distroy").addClass("hidden");
            $("#addision").css('display',"block");
            $scope.data = [$scope.levels.high,$scope.levels.medium,$scope.levels.low];

        })
    }

    setInterval($scope.realtime_all, 2000);

    var origin_list = function() {
        var origin = [];
        var base = {};
        for (i = 0; i < $scope.results.length; i++) {
            var base = {};
            base['origin'] = {
                "latitude": $scope.results[i].latitude,
                "longitude": $scope.results[i].longitude
            }
            base['destination'] = {
                "latitude": $scope.results[i].in_lat,
                "longitude": $scope.results[i].in_long
            }
            origin.push(base);
        }
        return origin;
    }

    $scope.newvalue = origin_list();




    var get_values = function() {
        var origin = [];
        base = {};
        for (i = 0; i < $scope.results.length; i++) {
            base = {
                "latitude": $scope.results[i].latitude,
                "longitude": $scope.results[i].longitude
            }
            origin.push(base);
        }
        return origin;
    }


    // all customer

    $scope.customer_attack = function() {
        $('#canvas-container').html($('<div>').attr({
            id: 'arcs'
        }));
        var arcs = new Datamap({
            element: document.getElementById("arcs"),
            scope: 'world',
            responsive: true,
            // projection: 'mercator',
            animationSpeed: 20000,
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            fills: {
                defaultFill: "#9cc96b",
                win: 'rgba(100, 10, 200, 0.4)'
            },
            data: {
                'TX': {
                    fillKey: 'win'
                },
                'FL': {
                    fillKey: 'win'
                },
                'NC': {
                    fillKey: 'win'
                },
                'CA': {
                    fillKey: 'win'
                },
                'NY': {
                    fillKey: 'win'
                },
                'CO': {
                    fillKey: 'win'
                }
            }
        });


        arcs.arc(origin_list(), {
            strokeWidth: 3,
            arcSharpness: 1,
            strokeColor: '#f76c51'
        });
    }



}



function signature($scope, $http) {
    $scope.first_name = first_name;
    $scope.phone_number = phone_number;
    $scope.email = email;
    $scope.titles = titles;
    $scope.locations = locations;
    $scope.final_add = locations;
}





function notification($scope, $http, $timeout) {

    $scope.count = 0
    $scope.data = []
    $http.get('/api/v1/webnotification/').then(
        function(result) {
            // $scope.count = result.data.meta.total_count;
           /* if ($scope.count == 0){
                    $scope.nonoti = true;
                    //$scope.noticount = false
                }else{
                    $scope.nonoti = false;  
                    //$scope.noticount = true;
                }*/
            $scope.data = result.data.objects;
            $scope.get_notification_count();
        },
        function(response) {
            // error

        });
    $scope.get_notification_count = function() {
        $http.get('/notification/count?count=true').then(
            function(result) {
                $scope.count = result.data.count;
               /* if ($scope.count == 0){
                        $scope.nonoti = true;
                        //$scope.noticount = false
                    }else{
                        $scope.nonoti = false;  
                        //$scope.noticount = true;
                    }*/
                // $scope.data = result.data.objects;
            },
            function(response) {
                // error

        });
    }

    // $http.get('/api/v1/webnotification/').then(
    //     function(result) {
    //         //$scope.count = result.data.meta.total_count;
    //         if ($scope.count == 0){
    //                 $scope.nonoti = true;
    //                 //$scope.noticount = false
    //             }else{
    //                 $scope.nonoti = false;  
    //                 //$scope.noticount = true;
    //             }
    //         $scope.data = result.data.objects;
    //     },
    //     function(response) {
    //         // error

    //     });

    $scope.readme = function(ide, event) {
        $scope.nonoti = false
        event.stopPropagation();
        event.preventDefault();
        $scope.noticount = true;
        // var temp = ide[0][0]
        $http({
                method: 'post',
                url: '/api/v1/readmenotify/',
                data: ide[0][0]
            })
            .then(function(result) {
                    $http.get('/api/v1/webnotification/').then(
                        function(result) {
                            // $scope.count = result.data.meta.total_count;
                            $scope.data = result.data.objects;
                            $scope.get_notification_count();
                           //  if ($scope.count == 0){
                           //      $scope.nonoti = true;
                           // //      $scope.noticount = false;
                           //  } else {
                           //      $scope.nonoti = false;
                           //   //    $scope.noticount = true;
                           //  }
                        },
                        function(response) {
                            // error

                        });
                },
                function(data) {
                    console.log("rejected");
                })
    }

    $scope.updateCount = function() {
        $scope.count = 0;
        $http({
                method: "post",
                url: "/api/v1/webnotification/",
                data: {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(data){
                // success(function(data) {
                $http.get('/api/v1/webnotification/').then(
                function(result) {
                    // $scope.count = result.data.meta.total_count;
                   /* if ($scope.count == 0){
                            $scope.nonoti = true;
                            //$scope.noticount = false
                        }else{
                            $scope.nonoti = false;  
                            //$scope.noticount = true;
                        }*/
                    $scope.data = result.data.objects;
                    //$scope.get_notification_count();
                },
                function(response) {
                // error

        });
            })
        
    }

    

}

function dashboardGraph($scope, $http, $timeout) {
    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    // $scope.series = ['Series A', 'Series B'];
    // $scope.data = [
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
    // ];
    $scope.get_data = function() {
        $http({
            method: "GET",
            url: '/security/get/multigraph/data',
            data: {}
        }).success(function(temp_data) {
            tickets = temp_data[0]
            events = temp_data[1]
            $scope.labels = []
            var l_events = []
            var l_tickets = []
            for(i=0;i<events.length;i++){
                $scope.labels.push(events[i][1]);
                if (tickets[i]){
                    l_tickets.push(tickets[i][1]);
                }
                else
                    l_tickets.push(0);
                l_events.push(events[i][0])
            }
            $scope.series = ['Tickets','Events'];
            $scope.data = [l_tickets,l_events];
        })
    }
    $scope.get_data();
}

function sandsdashboard($scope, $http, $timeout) {
    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    // $scope.series = ['Series A', 'Series B'];
    // $scope.data = [
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
    // ];
    $scope.get_data = function() {
        $http({
            method: "GET",
            url: '/niksun/security/get/multigraph/data',
            data: {}
        }).success(function(temp_data) {
            tickets = temp_data[0]
            events = temp_data[1]
            $scope.labels = []
            var l_events = []
            var l_tickets = []
            for(i=0;i<events.length;i++){
                $scope.labels.push(events[i][1]);
                if (tickets[i]){
                    l_tickets.push(tickets[i][1]);
                }
                else
                    l_tickets.push(0);
                l_events.push(events[i][0])
            }
            $scope.series = ['Tickets','Events'];
            $scope.data = [l_tickets,l_events];
        })
    }
    $scope.get_data();
}

function sandsdashboardnew($scope, $http, $timeout) {
    $scope.get_data = function() {
        $http({
            method: "GET",
            url: '/niksun/security/get/multigraph/tickets',
            data: {}
        }).success(function(temp_data) {
            labels = temp_data[0]
            series = temp_data[1]
            data = temp_data[2]

            $scope.labels = labels;
            $scope.series = series;
            $scope.data = data;
            $scope.options = { datasetFill : false }

        })
    }
    $scope.get_data();
}




function niksundashboard($scope, $http, $timeout) {
    $scope.source = ""
    $scope.init = function(source1){
        console.log(source1);
        $scope.source = source1;
        $scope.get_data();
    }

   
    $scope.get_data = function() {
        $http({
            method: "GET",
            url: '/niksun/security/get/multigraph/tickets',
            params: { source: $scope.source },
            data: {}
        }).success(function(temp_data) {
            labels = temp_data[0]
            series = temp_data[1]
            data = temp_data[2]

            $scope.labels = labels;
            $scope.series = series;
            $scope.data = data;
            $scope.options = { datasetFill : false }
        })
    }
   
}

function redcanarydashboard($scope, $http, $timeout) {
    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    // $scope.series = ['Series A', 'Series B'];
    // $scope.data = [
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
    // ];
    $scope.get_data = function() {
        $http({
            method: "GET",
            url: '/redcanary/security/get/redevent_ticketrate/data',
            data: {}
        }).success(function(temp_data) {
            tickets = temp_data[0]
            events = temp_data[1]
            $scope.labels = []
            var l_events = []
            var l_tickets = []
            for(i=0;i<events.length;i++){
                $scope.labels.push(events[i][1]);
                if (tickets[i]){
                    l_tickets.push(tickets[i][1]);
                }
                else
                    l_tickets.push(0);
                l_events.push(events[i][0])
            }
            $scope.series = ['Tickets','Events'];
            $scope.data = [l_tickets,l_events];
        })
    }
    $scope.get_data();
}



//controller for events page
function EventTicketController($scope, $http){
    // console.log('here');
//     $scope.getChartData = function(){
//         $http({
//             method:'get',
//             url   :'/security/events/ticket/response/',
//             headers : {
//                     'Content-Type' : 'application/x-www-form-urlencoded'
//                 }
//             }).success(function(data){
//                 console.log("data::"+data);
//                 $scope.labels1 = []
//                 $scope.series1 = ['Creation Date','Actual Start']
//                 $scope.data1 = []
//                 for(var i=0;i<data.length;i++){
//                     console.log('iiiiiiiii:'+data[i])
//                     $scope.labels1.push(data[0].toString()  )
//                     $scope.data1.push([data[1],data[2]])
//                 }
//                 // $scope.labels1.push("January", "February", "March", "April", "May", "June", "July"];
//                 // $scope.series1 = ['Series A', 'Series B'];
//                 // $scope.data1 = [
//                 // [65, 59, 80, 81, 56, 55, 40],
//                 // [28, 48, 40, 19, 86, 27, 90]
//                 // ];
//             })
//         };
//     $scope.getChartData();
}
