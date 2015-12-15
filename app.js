 (function(){
	var app = angular.module('game', [ ]);
	
	app.controller('GameController', function(){
		//TODO populate data from API call
		this.people = assets;
		this.choices = scenarios;
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
				this.people[option.people[i].person].fatigue = this.fatigueChange(this.people[option.people[i].person].fatigue, option.people[i].fatigue);
				this.people[option.people[i].person].threshold -= option.people[i].motivation1;
				this.people[option.people[i].person].threshold += option.people[i].motivation2;
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
	});
	var assets = [
		{
			name: 'Mal',
			id: 0,
			motivation1: 'Keep Flyin',
			motivation2: 'You\'re on my crew',
			desirable: 'Hurt the Alliance',
			threshold: 5,
			fatigue: 1
		},
		{
			name: 'Zoe',
			id: 1,
			motivation1: 'Loyal Soldier',
			motivation2: 'Loyal Wife',
			desirable: 'Keep Flyin',
			threshold: 5,
			fatigue: 2
		},
		{
			name: 'Wash',
			id: 2,
			motivation1: 'Keep Flyin',
			motivation2: 'Protect Zoe',
			desirable: 'Health',
			threshold: 5,
			fatigue: 3
		},
		{
			name: 'Book',
			id: 3,
			motivation1: 'Moral Compass',
			motivation2: 'Mysterious Past',
			desirable: 'Peace',
			threshold: 5,
			fatigue: 3
		},
		{
			name: 'Simon',
			id: 4,
			motivation1: 'Avoid Alliance',
			motivation2: 'Ship loyalty',
			desirable: 'Peace',
			threshold: 5,
			fatigue: 4
		},
		{
			name: 'Inara',
			id: 5,
			motivation1: 'Woman\'s gotta work',
			motivation2: 'Stay with Serenity',
			desirable: 'Spending time with Mal',
			threshold: 5,
			fatigue: 3
		},
		{
			name: 'Kaylee',
			id: 5,
			motivation1: 'Time w/ Serenity',
			motivation2: 'Time w/ Simon',
			desirable: 'Attention from Simon',
			threshold: 5,
			fatigue: 4
		},
		{
			name: 'River',
			id: 6,
			motivation1: 'Lucidity',
			motivation2: 'Help Out',
			desirable: '???',
			threshold: 4,
			fatigue: 7
		},
		{
			name: 'Jayne',
			id: 7,
			motivation1: 'Serenity\' Profits',
			motivation2: 'Any othe profit',
			desirable: 'I\'ll be in my bunk',
			threshold: 5,
			fatigue: 2
		},
	];
	var scenarios = [
		{
			title: 'Shee-niou Pirates!',
			description: 'A small 3 man ship blocks Serenity\'s path.  They vid over and threaten to board with guns blazing, unless you give up any and all valuables.',
			options: [
				{
					name: 'Outrun',
					hint: 'Test Wash\'s piloting skills',
					description: 'In a daring show of piloting prowess, Wash banks the ship at full speed into a nearby asteroid field.  After several near misses they escape the pirates.  Zoe immediately orders her daring husband to their bunk to "celebrate."',
					people: [
						{
							person: 2, fatigue: 3, motivation1: 0, motivation2: 1,
						},
						{
							person: 1, fatigue: 1, motivation1: 0, motivation2: 1
						}
					]
				},
				{
					name: 'Out Talk',
					hint: 'Maybe Mal can convince them otherwise',
					description: 'Mal spins a yarn saying they\'re carrying some corpses from a nearby moon infected with plague.  He brings in Simon to talk some serious medical jargon and make things seem believable.  "Y\'all can come all aboard and look around, but I\'m thinkin\' that might not be the smart thing."  Shepherd Book makes an appearance on the vid to provide credibility that the bodies are being taken home for burial rights.  ',
					people: [
						{
							person: 0, fatigue: 2, motivation1: 0, motivation2: 1
						},
						{
							person: 3, fatigue: 1, motivation1: 1, motivation2: 0
						},
						{
							person: 4, fatigue: 2, motivation1: 0, motivation2: 1
						}
					]
				},
				{
					name: 'Out Gun',
					hint: 'Jayne says Vera could use a playmate',
					description: 'Jayne (wiht Vera) sets up position in the cargo hold with Zoe & Mal.  The pirates burst in and get ambushed real quick like.  The crew takes some scrap off their ship for profit.  Zoe had a near miss leaving Wash questioning the reckless decision.',
					people: [
						{
							person: 8, fatigue: 2, motivation1: 1, motivation2: 0
						},
						{
							person: 0, fatigue: 2, motivation1: 1, motivation2: 0
						},
						{
							person: 1, fatigue: 2, motivation1: 1, motivation2: 0
						},
						{
							person: 2, fatigue: 1, motivation1: 1, motivation2: 0
						}
					]
				}
			]
		},
		{
			title: 'A ship will get you a job...',
			description: 'Weazel vids you with a job, his cousin needs a rare medicine picked up from an Alliance medical research facility and delivered...  By "picked up" he o\'course means acquired by any means necessary.  ',
			options: [
				{
					name: 'Companionship',
					hint: 'Send Inara to work',
					description: 'The lonely research head is from a noble family with which Inara is familiar.  Inara vids the researcher and convinces him to take on her services.  She uses all her womanly wiles to obtain a sample of the medicine they need.  It works so well the man proposes, forcing Inara and the crew to exit swiftly!  A wistful Kaylee swoons at the story.',
					people: [
						{
							person: 5, fatigue: 4, motivation1: 1, motivation2: 0,
						},
						{
							person: 6, fatigue: -1, motivation1: 0, motivation2: 0
						}
					]
				},
				{
					name: 'Professional Courtesy',
					hint: 'This might be right up Simon\'s alley',
					description: 'Simon uses his extensive medical knowledge to start up conversion with the researcher.  He\'s able to convince the researcher to share his notes, but not any of the drug.  Simon is able to synthesize a sample based on the notes, but it takes few all nighters (and some cash to buy some of the raw components).  There\'s still enough to make profit, even after the extra flying.  Not too bad.  ',
					people: [
						{
							person: 4, fatigue: 4, motivation1: 0, motivation2: 1
						},
						{
							person: 2, fatigue: 1, motivation1: 0, motivation2: 0
						},
					]
				}
			]
		}
	];
})();



