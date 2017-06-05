var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

	//AJAX configuration to access API for States and Cities
	var getStatesAndCities = function(){
		return $http({
			method : "GET",
			url : "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json"
		})
	}

	//AJAX configuration to access API for Pin codes
	var getPincodes = function(selectedCity){
		return $http({
			method : "GET",
			url : "http://postalpincode.in/api/postoffice/" + selectedCity
		})
	}
 
	//Array to store States
	$scope.states = ["Select State"];
	$scope.selectedState = $scope.states[0];
	
	//Array to store Cites
	$scope.cities = ["Select City"];
	$scope.selectedCity = $scope.cities[0];
	
	//Array to store Pin codes
	$scope.pincodes = []
	
	//Get list of states and cities
	getStatesAndCities().then(function(response1) {		
		var responseData = response1.data;
		//Get list of States
		angular.forEach(responseData, function(a,b){
			if($scope.states.indexOf(a.state) == -1){
				$scope.states.push(a.state); 
			}
		})

		//Get cities for selected state
		$scope.getCitiesFor = function(selectedState){
			$scope.pincodes = [];
			$scope.cities = ["Select City"];
			$scope.selectedCity = $scope.cities[0];
			angular.forEach(responseData, function(a,b){
				if(a.state == selectedState && selectedState != "Select State"){
					$scope.cities.push(a.name);
				}
			})
		}
	});
	
	//Get pin codes for selected city
	$scope.getPincodesForSelectedCity = function(selectedCity){
		getPincodes(selectedCity).then(function(response2){
			$scope.pincodes = []
			angular.forEach(response2.data.PostOffice, function(a,b){
				var location = {
						locationPin: a.PINCode,
						locationName: a.Name
				}				
				$scope.pincodes.push(location);
			})
		})
	}
});