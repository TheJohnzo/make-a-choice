 (function(){
	var app = angular.module('game', [ ]);
	
	//play nice with blade tags
	app.config(function ($interpolateProvider) {
	
	    $interpolateProvider.startSymbol('<%');
	    $interpolateProvider.endSymbol('%>');
	
	});
	
	app.controller('GameController', ['$http', function($http) {
		//TODO populate data from API call
        this.people = [];
        this.choices = [];
        obj = this;

		//needs API security implemented...
        $http.get('/choice/scenarios')
        .success(function(data, status, headers, config) {
            obj.choices = data;
        })
        .error(function(error, status, headers, config) {
             console.log(status);
             console.log("Error occured");
        });
        $http.get('/choice/people')
        .success(function(data, status, headers, config) {
            obj.people = data;
        })
        .error(function(error, status, headers, config) {
             console.log(status);
             console.log("Error occured");
        });
		
		this.title = 'Keep Flyin\' with the Big Damn Heroes';
		this.instructions = 'Make good choices, don\'t tax any one person too much.';//TODO better instructions
		this.thresholds = [1,2,3,4,5,6,7,8,9];
		this.index = 0;//for scenario deck
		this.optionIndex = 0;//which option was selected
		this.choosing = 0;//have not made a choice yet
		this.over = 0;

		this.choose = function(choice) {
			this.choosing = 1;
			this.optionIndex = choice;
			var option = this.choices[this.index].options[choice];
			for (i=0; i < option.people.length; i++) {
				this.people[option.people[i].person_id].fatigue = this.fatigueChange(parseInt(this.people[option.people[i].person_id].fatigue), parseInt(option.people[i].fatigue));
				this.people[option.people[i].person_id].threshold -= parseInt(option.people[i].motivation1);
				this.people[option.people[i].person_id].threshold += parseInt(option.people[i].motivation2);
			}
		};
		
		this.fatigueChange = function(current, modifier) {
			current += modifier;
			if (current < 1) {
				current = 1;
			}
			if (current >= 10) {
				this.over = 1;//you lost
			}
			return current;
		};
		
		this.next = function() {
			this.choosing = 0;
			this.optionIndex = 0;
			this.index += 1;
			
			if (!this.choices[this.index]) {
				this.index = 0;
			}
			//everyone gets 1 less fatigue 'tween rounds
			for (i=0; i < this.people.length; i++) {
				this.people[i].fatigue = this.fatigueChange(this.people[i].fatigue,-1);
			}
		};
		
		this.restart = function() {
            location.reload(); 
		};
	}]);
})();



