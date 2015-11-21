'use strict';

var app = angular.module('sinatrapg', ['ngResource']);

// Define the environment controller
app.controller('EnvironmentCtrl', function($scope, $log, $resource){
	$log.debug("In environment controller");
	
	var env = $resource("env").get({}, function(values, headers){
		$log.debug("in get callback: " + values.PATH);
		$scope.Values = values;
	});
});

// Define the instance controller
app.controller('InstanceCtrl', function($scope, $log, $resource){
	$log.debug("In instance controller");
	var env = $resource("id").get({}, function(values, headers){
		$log.debug("in instance get callback: " + values.instance_id);
		$scope.InstanceInfo = values;
		$scope.InstanceId = values.instance_id;
	});
});

// Define the header controller
app.controller('HeaderCtrl', function($scope, $log, $resource){
	$log.debug("In header controller");
	var env = $resource("id").get({}, function(values, headers){
		$log.debug("in header get callback: " + values.instance_id);
		$scope.InstanceId = values.instance_id;
		$scope.Host = values.hostname;
	});
});

// The Network controller
app.controller('NetworkCtrl', function($scope, $log, $resource){
	$log.debug("In network controller");
	var env = $resource("network").get({}, function(values, headers){
		$log.debug("in network get callback: " + values.Network);
		$scope.Network = values.Network;
		$scope.Process = values.Process;
		$scope.Netstat = values.Netstat;
	});
	$scope.ShowIt = false;
});

// Define the sql controller
app.controller('SqlCtrl', function($scope, $log, $resource){
	$log.debug("In sql controller");
	$scope.Count = 1;
	$scope.ShowSql = true;
	$scope.CountAll = function() {
		$resource("sql/readall").get({}, function(values, headers){
				$log.debug("in callback for count: " + values.count);
				$scope.Count = values.count;
				$scope.ShowError = false;
			}, function(values, headers){
				$log.debug("in error handler for count: " + values);
				$scope.ErrorMsg = values.data.error || "Count failed" ;
				$scope.ShowError = true;
			});
	};
	$scope.DeleteOne = function() {
		$resource("sql/deletefirst").get({}, function(values, headers){
				$log.debug("in callback for delete: " + values);
				$scope.ShowError = false;
				$scope.CountAll();
			}, function(values, headers){
				$log.debug("in error handler for delete: " + values.status);
				$scope.ErrorMsg = "delete failed" ;
				$scope.ShowError = true;
			});
	};
	$scope.AddOne = function() {
		$resource("sql/add").get({}, function(values, headers){
				$log.debug("in callback for add: " + values);
				$scope.ShowError = false;
				$scope.CountAll();
			}, function(values, headers){
				$log.debug("in error handler for add: " + values.status);
				$scope.ErrorMsg = values.data.error || "add failed" ;
				$scope.ShowError = true;
			});
	};
	$scope.CountAll();
});

// Define the Binding controller
app.controller('BindingCtrl', function($scope, $log, $resource){
	$log.debug("In binding controller");
	$scope.Bound = false;
	var env = $resource("conn_info").get({}, function(values, headers){
		$log.debug("in binding get callback: " + values.host);
		$scope.ConnInfo = values;
		$scope.ShowIt = true;
		$scope.ShowItRight = true;
	});
	var status = $resource("conn_status").get({}, function(value, headers){
		$log.debug("in binding get callback for status: " + value.status);
		$log.debug("in binding get callback for bound: " + value.bound);
		$scope.Active = value.status;
		$scope.Bound = value.bound;
	});
	$scope.tryCreds = function(){
		$scope.ConnInfo.ShowError = false;
		// invoke the /conn_info/:user/:passwd function, expecting an error
		var status = $resource("conn_info/" + $scope.ConnInfo.NewUser + 
			"/" + $scope.ConnInfo.NewPassword).get({}, function(values, headers){
			$log.debug("in conn_info get callback for conninfo: " + values);
			$log.debug("in conn_info get callback for conninfo: " + values.new_conn_string);
			$scope.ConnInfo.SuccessMsg = values.description;
			$scope.ConnInfo.ShowSuccess = true;
			$scope.ConnInfo.ShowError = false;
		}, function(values, headers){
			$log.debug("in error handler for conninfo: " + values);
			$scope.ConnInfo.ErrorMsg = values.data.error || "Connection failed" ;
			$scope.ConnInfo.ShowSuccess = false;
			$scope.ConnInfo.ShowError = true;
		});
	}

	$scope.setCreds = function(){
		$scope.ConnInfo.NewUser = $scope.ConnInfo.user;
		$scope.ConnInfo.NewPassword = $scope.ConnInfo.password;	
	}
});