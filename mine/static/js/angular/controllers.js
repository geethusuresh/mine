
function paginate(list, $scope, page_interval) {
    if(!page_interval)
        $scope.page_interval = 1;
    else 
        $scope.page_interval = page_interval;
    $scope.current_page = 1;
    $scope.pages = list.length / $scope.page_interval;
    if($scope.pages > parseInt($scope.pages))
        $scope.pages = parseInt($scope.pages) + 1;
    $scope.visible_list = list.slice(0, $scope.page_interval);
}
    
function select_page(page, list, $scope, page_interval) {
    
    var last_page = page - 1;
    var start = (last_page * $scope.page_interval);
    var end = $scope.page_interval * page;
    $scope.visible_list = list.slice(start, end);
    $scope.current_page = page;
}

// edit_survey.html, add_survey.html
function SurveyController($scope, $http){
    // Fetching the Survey Details by passing the survey id as an argument in init method
    $scope.init = function(csrf_token, survey_id){
        $scope.csrf_token = csrf_token;
        $scope.survey_id = survey_id;
        if ($scope.survey_id){
            $http.get('/survey/edit/'+$scope.survey_id+'/').success(function(data){
                $scope.survey = data;
                $scope.questions = data.questions;
                $scope.survey_questions = data.survey_questions;
                $scope.select_question();
            });
        }
    }
    // Fetching the Question Details 
    $scope.select_question = function(){
        if ($scope.survey_id){
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
			data: $.param(params),
			headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
    	}).success(function(data){
            $scope.questions_data = [];
            $scope.questions_data = data;
    	}).error(function(data){
    		console.log(data);
    	})
    }
    // Validating the survey fields before sending the save request
    $scope.validate = function(){
        $('.error_survey').text("");
        if ($scope.survey.customer == undefined || $scope.survey.customer == ''){
            $('.error_survey').text("Please choose atleast one customer");
            return false;
        } if ($scope.survey.survey_title == undefined || $scope.survey.survey_title == ''){
            $('.error_survey').text("Please add the survey title");
            return false;
        } else if ($scope.survey.survey_description == undefined || $scope.survey.survey_description == ''){
            $('.error_survey').text("Please add the survey description");
            return false;
        } else if ($scope.survey.survey_condition == undefined || $scope.survey.survey_condition == ''){
            $('.error_survey').text("Please add the survey condition");
            return false;
        } else if ($scope.survey.survey_questions == undefined){
            $('.error_survey').text("Please add the survey questions");
            return false;
        }
        return true;
    }
    // Sending Survey save request
    $scope.edit_survey = function(){
        $scope.survey.survey_questions = $scope.survey_questions;
        params = {
            'csrfmiddlewaretoken': $scope.csrf_token,
            'survey': angular.toJson($scope.survey),
        }
        if ($scope.validate()){
            $http({
                method: "post",
                url: "/survey/edit/"+$scope.survey_id+"/",
                data: $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                document.location.href = '/survey/list/';
            });
        }
    }
}

// survey_response.html
// Handling survey Response

function SurveyResponseController($scope, $http){

    $scope.survey = {
        'survey_id': '',
        'ticket_id': '',
        'questions': [],
    }
    // Fetching the Survey Details by passing the survey id, ticket id, user id as an argument in init method
    $scope.init = function(csrf_token, survey_id, ticket_id, user_id){
        $scope.survey_id = survey_id;
        $scope.ticket_id = ticket_id;
        $scope.user_id = user_id;
        $scope.survey.survey_id = survey_id;
        $scope.survey.ticket_id = ticket_id;
        $scope.csrf_token = csrf_token;
        if ($scope.survey_id && $scope.ticket_id){
            $http.get('/survey/'+$scope.survey_id+'/ticket/'+$scope.ticket_id+'/user/'+$scope.user_id+'/?ajax=true').success(function(data){
                $scope.survey_questions = data.questions;
            });
        }
    }
    $scope.choose_answer = function(choice, question){
        // choosing qusetion's answer and make the checkbox clicked by adding the 'checked' class
        question.answer_choice = choice.choice_id;
        for(var i=0; i < question.choices.length; i++){
            parent_div = $('#'+question.choices[i].id_val).parent();
            parent_div.removeClass('checked');
        }
        parent_div = $('#'+choice.id_val).parent();
        parent_div.addClass('checked');
    }
    $scope.response_validation = function(){
        // validating survey response
        $scope.error_message = '';
        for (var i=0; i < $scope.survey.questions.length; i++){
            console.log($scope.survey.questions[i]);
            if ($scope.survey.questions[i].q_type == 'choice'){
                if ($scope.survey.questions[i].answer_choice == '' || $scope.survey.questions[i].answer_choice == undefined){
                    $scope.error_message = 'Please choose the option for the question '+(i+1);
                    $('#error_msg').addClass('alert alert-danger');
                    return false;
                }
            } else {
                if ($scope.survey.questions[i].answer_text == '' || $scope.survey.questions[i].answer_text == undefined){
                    $scope.error_message = 'Please answer to the question '+(i+1);
                    $('#error_msg').addClass('alert alert-danger');
                    return false;
                }
            }
        }return true;
    }
    $scope.save_response = function(){
        // sending request to save the survey response
        // $scope.survey.questions = $scope.survey_questions;
        $scope.survey.questions = [];
        for (var i=0; i<$scope.survey_questions.length; i++){
            $scope.survey.questions.push({
                'q_id': $scope.survey_questions[i].q_id,
                'q_type': $scope.survey_questions[i].q_type,
                'answer_choice': $scope.survey_questions[i].answer_choice,
                'answer_text': $scope.survey_questions[i].answer_text,
            })
        }
        if ($scope.response_validation()){
            params = {
                'csrfmiddlewaretoken': $scope.csrf_token,
                'survey': angular.toJson($scope.survey),
            }
            $http({
                method: "post",
                url: "/survey/"+$scope.survey_id+"/ticket/"+$scope.ticket_id+'/user/'+$scope.user_id+'/',
                data: $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                document.location.href = '/?survey=ok';
            });
        }
    }
}
// Functionality Validation
function FunctionController($scope, $http){
    
    $scope.init = function (csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.warning_msg = false;
        $scope.is_submit = true;
    }
    
    $scope.check_funct = function() {
        if ($scope.func_nam.length > 0) {
            $http({
                method: "get",
                url: "/admin_settings/functionality/create/?name="+$scope.func_nam,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                var regX = /^[a-zA-Z\_]+$/;
                if (data.msg == 'exists') {
                    $scope.warning_msg = true;
                    $scope.is_submit = true;
                } else if (data.msg == 'new') {
                    $scope.warning_msg = false;
                    // $scope.is_submit = false;
                    if (!regX.test($scope.func_nam)) {
                        $scope.is_submit = true;
                    } else {
                        $scope.is_submit = false;
                    }
                }
            });
        }
    }
}
// function FetchReportsController($scope, $http) {
// console.log(app)
app.controller('FetchReportsController', ['$scope', '$http', '$filter', 'filterFilter', function ($scope, $http, $filter, filterFilter) {
    
    var orderBy = $filter('orderBy');
    $scope.is_loading = false;
    $scope.init = function(csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.is_submit = false;
        $scope.duration = "on";
        $scope.tickets = [];
        $scope.entryLimit = 10;
        $scope.noOfPages = 5;
        $('#image_id').show();
    }
    $scope.validate_form = function() {
        $('#error_section').hide();
        if ($scope.workgroup_data == undefined) {
            $('#error_section').show();
            $( "#error_section" ).text( "Please choose atleast one workgroup !" );
            return false;
        } else if ($scope.duration == "between" && ($scope.start_date == undefined || $scope.end_date == undefined)) {
            $('#error_section').show();
            $( "#error_section" ).text( "Please choose start and end date !" );
            return false;
        } else if ($scope.duration == "between" && ($scope.start_date && $scope.end_date)) {
            var start = $scope.start_date.replace(/-/g, '/');
            var end = $scope.end_date.replace(/-/g, '/');
            val_1 = new Date(start);
            val_2 = new Date(end);
            var diff = val_2 - val_1;
            if (diff < 0) {
                $('#error_section').show();
                $( "#error_section" ).text( "Please choose valid start and end date !" );
                return false;
            }
        } else if ($scope.start_date == undefined) {
            $('#error_section').show();
            $( "#error_section" ).text( "Please choose start date !" );
            return false;
        }
        return true
    }
    $scope.fetch_reports = function() {
        if ($scope.validate_form() == true) {
            params = {
                'workgroup_data': $scope.workgroup_data.toString(),
                'start_date': $scope.start_date,
                'end_date': $scope.end_date,
                'duration': $scope.duration,
                'csrfmiddlewaretoken': $scope.csrf_token,
            }
            $scope.is_loading = true;
            $http({
                method: "post",
                data: $.param(params),
                url: "/group_response_resolution/",
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                $scope.is_loading = false;
                $scope.tickets = data['ticket_details'];
                $('#ticket_data').val(JSON.stringify(data['ticket_details']));
                $scope.is_egate = data['work_respo_is_egate'];
                $('#is_egate_included').val(data['work_respo_is_egate']);
                $('#report_heading').val(data['report_heading']);
                $('#report_headers').val(JSON.stringify(data['report_headers']));
                $('#sheet_name').val(data['sheet_name']);
                $scope.engineer_wise_data = [];
                // paginate($scope.tickets, $scope);
                $scope.currentPage = 1;
                $scope.totalItems = $scope.tickets.length;
                $scope.filtered = filterFilter($scope.tickets);
                $scope.entry_display = "10";
                if ($scope.tickets.length == 0) {
                    $('#error_section').show();
                    $( "#error_section" ).text( "No data to display" );
                }
            });
        } else {
            console.log("invalid form submission")
        }
    }
    $scope.select_page = function(page){
        select_page(page, $scope.tickets, $scope);
    }
    $scope.select_next_page = function(){
        var page = $scope.current_page + 1;
        if(page != $scope.pages + 1)
            select_page(page, $scope.tickets, $scope);
    }
    $scope.select_previous_page = function(){
        var page = $scope.current_page - 1
        if(page != 0)
            select_page(page, $scope.tickets, $scope);
    }
    $scope.range = function(n) {
        return new Array(n);
    }
    $scope.get_owner_wise_data = function(engineer_wise_data, ticketid) {
        $scope.engineer_wise_data = engineer_wise_data;
        $scope.ticketid = ticketid;
        $('#engineer_data').modal('show');
    }
    $scope.change_display = function(){
        $scope.entryLimit = $scope.entry_display;
        $scope.filtered = filterFilter($scope.tickets);
        $scope.totalItems = $scope.filtered.length;
        $scope.reverse = !$scope.reverse;
        $scope.perform_order('ticketid');
    }
    $scope.perform_order = function(predicate){
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.filtered = orderBy($scope.filtered, predicate, $scope.reverse);
    }
    $scope.$watch('search', function(term) {
        $scope.filtered = filterFilter($scope.tickets, term);
        $scope.totalItems = $scope.filtered.length;
        $scope.reverse = !$scope.reverse;
        $scope.perform_order('ticketid');
    });
}]);

app.controller('RoutineTaskController', ['$scope', '$http', '$filter', 'filterFilter', function ($scope, $http, $filter, filterFilter) {
    $scope.frequency = {};
    $scope.manual_scheduler = false;
    $scope.scheduler = false;
    $scope.frequency_list = [
        {
          value : 1,
          label : 'Month'  
        },
        // {
        //   value : 2,
        //   label : 'Year'  
        // }
    ];
    $scope.day_val_list = [
        {
            value : 1,
            label : 'First'  
        },
        {
            value : 2,
            label : 'Second'  
        },
        {
            value : 3,
            label : 'Third'  
        }
    ]
    $scope.month_of_day_list = [
        {
            value: "SU",
            label : 'Sunday',
        },{
            value: "MO",
            label : 'Monday',
        }, {
            value: "TU",
            label : 'Tuesday',
        }, {
            value: "WE",
            label : 'Wednesday',
        }, {
            value: "TH",
            label : 'Thursday',
        }, {
            value: "FR",
            label : 'Friday',
        }, {
            value: "SA",
            label : 'Saturday',
        }
    ]
    $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    $scope.init = function(csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.is_submit = false;
        $('#image_id').show();
        $scope.task_id = '';
        $scope.fetch_task_data();
        $scope.entryLimit = 10;
        $scope.noOfPages = 5;
    }
    $scope.set_routine_val = function(task_id, scheduler_type){
        if (task_id)
            $scope.task_id = task_id;
        if (scheduler_type == "scheduler") {
            $scope.manual_scheduler = false;
            $scope.scheduler = true;
        } else if (scheduler_type == "man_scheduler"){
            $scope.manual_scheduler = true;
            $scope.scheduler = false;
        }
    }
    $scope.validate_form = function() {
        $('#error_section').hide();
        $scope.error_scheduler = false;
        $scope.man_error_scheduler = false;
        if ($scope.scheduler == true){
            if ($scope.expression == "* * * * *"){
                $scope.error_scheduler = true;
                return false;
            }
        } else if ($scope.manual_scheduler == true) {
            if ($scope.frequency.base_val == undefined) {
                $scope.man_error_scheduler = true;
                return false;
            } else if ($scope.frequency.day_val == undefined) {
                $scope.man_error_scheduler = true;
                return false;
            } else if ($scope.frequency.day_of_month == undefined) {
                $scope.man_error_scheduler = true;
                return false;
            } else if ($scope.frequency.hourValue == undefined) {
                $scope.man_error_scheduler = true;
                return false;
            } else if ($scope.frequency.minuteValue == undefined) {
                $scope.man_error_scheduler = true;
                return false;
            }
        } 
        return true;
    }
    $scope.enable_loader = function(){
        $('#loader').modal('show');
    }
    $scope.disable_loader = function(){
        $('#loader').modal('hide');
    }
    $scope.add_schedule = function() {
        if ($scope.validate_form() == true) {
            if ($scope.scheduler == true){
                var expression_val = $scope.expression;
            } else {
                var expression_val = null;
            }
            params = {
                'csrfmiddlewaretoken': $scope.csrf_token,
                'expression': expression_val,
                'base_val': $scope.frequency.base_val,
                'filter_type': $scope.frequency.day_val,
                'day_of_week': $scope.frequency.day_of_month,
                'hour': $scope.frequency.hourValue,
                'minute': $scope.frequency.minuteValue
            }
            $('#create_schedule_manually').modal('hide');
            $('#create_schedule').modal('hide');
            // $scope.enable_loader();
            $http({
                method: "post",
                data: $.param(params),
                url: "/routine_task/schedule/"+$scope.task_id+"/",
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                // $scope.frequency = {};
                // $scope.expression = null;
                // $('#create_schedule_manually').modal('hide');
                // $('#create_schedule').modal('hide');
                // $scope.fetch_task_data();
                document.location.href="/routine_task/";
            });
        }
    }
    $scope.fetch_task_data = function() {
        // $scope.enable_loader();
        $http({
            method: "get",
            url: "/routine_task/",
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            $scope.tasks = data["task_details"];
            $scope.currentPage = 1;
            $scope.totalItems = $scope.tasks.length;
            $scope.filtered = filterFilter($scope.tasks);
            $scope.entry_display = "10";
            if ($scope.tasks.length == 0) {
                $('#error_section').show();
                $( "#error_section" ).text( "No data to display" );
            }
            // $scope.disable_loader();
        });
    }
    $scope.delete_routine_task = function(task_id){
        $('#confirm_msg').html("<strong>Are you sure want to delete this routine task?</strong>");
        $('#confirm_type').val("delete");
        $('#delete_id').val(task_id);
        $('#confirm_box').modal('toggle');
        return false;
    }
    $scope.routine_task_activation = function(task_id, activation_status){
        $('#delete_id').val(task_id);
        var html_msg = ""
        if (activation_status == "true"){
            html_msg = "<strong>Are you sure want to deactivate this routine task?</strong>";
            $('#confirm_type').val("deactivate");
        } else if ( activation_status == "false" ){
            html_msg = "<strong>Are you sure want to activate this routine task?</strong>";
            $('#confirm_type').val("activate");
        }
        $('#confirm_msg').html(html_msg);
        $('#confirm_box').modal('toggle');
        return false;
    }
    // $scope.perform_order = function(predicate){
    //     $scope.predicate = predicate;
    //     $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    //     $scope.filtered = orderBy($scope.filtered, predicate, $scope.reverse);
    // }
    // $scope.$watch('search', function(term) {
    //     $scope.filtered = filterFilter($scope.tasks, term);
    //     // $scope.totalItems = $scope.filtered.length;
    //     $scope.reverse = !$scope.reverse;
    //     $scope.perform_order('task_title');
    // });
}]);
app.controller('KnowledgebaseController', ['$scope', '$http', '$filter', 'filterFilter', function ($scope, $http, $filter, filterFilter) {
    $scope.frequency = {};
    $scope.init = function(csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.is_submit = false;
        $('#image_id').show();
        $scope.task_id = '';
        $scope.fetch_kb_data();
        $scope.entryLimit = 10;
        $scope.noOfPages = 5;
    }
    $scope.enable_loader = function(){
        $('#loader').modal('show');
    }
    $scope.disable_loader = function(){
        $('#loader').modal('hide');
    }
    $scope.fetch_kb_data = function() {
        // $scope.enable_loader();
        $http({
            method: "get",
            url: "/knowledge_base/list/",
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data){
            $scope.kbs = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.kbs.length;
            $scope.filtered = filterFilter($scope.kbs);
            $scope.entry_display = "10";
            if ($scope.kbs.length == 0) {
                $('#error_section').show();
                $( "#error_section" ).text( "No data to display" );
            }
            // $scope.disable_loader();
        });
    }
    $scope.delete_kb = function(kb_id){
        $('#confirm_msg').html("<strong>Are you sure want to delete this data?</strong>");
        $('#confirm_type').val("delete");
        $('#delete_id').val(kb_id);
        $('#confirm_box').modal('toggle');
        return false;
    }
    $scope.kb_activation = function(kb_id, activation_status){
        $('#delete_id').val(kb_id);
        var html_msg = ""
        if (activation_status == "true"){
            html_msg = "<strong>Are you sure want to deactivate this data?</strong>";
            $('#confirm_type').val("deactivate");
        } else if ( activation_status == "false" ){
            html_msg = "<strong>Are you sure want to activate this data?</strong>";
            $('#confirm_type').val("activate");
        }
        $('#confirm_msg').html(html_msg);
        $('#confirm_box').modal('toggle');
        return false;
    }
    // $scope.perform_order = function(predicate){
    //     $scope.predicate = predicate;
    //     $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    //     $scope.filtered = orderBy($scope.filtered, predicate, $scope.reverse);
    // }
    // $scope.$watch('search', function(term) {
    //     $scope.filtered = filterFilter($scope.tasks, term);
    //     // $scope.totalItems = $scope.filtered.length;
    //     $scope.reverse = !$scope.reverse;
    //     $scope.perform_order('task_title');
    // });
}]);

