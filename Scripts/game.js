$(function(){

	var words1 = ["vagabond",
		"wax",
		"meeting",
		"earn",
		"sordid",
		"annoying",
		"whine",
		"cactus",
		"voracious",
		"run",
		"weather",
		"haircut",
		"furtive",
		"water",
		"uttermost",
		"grate",
		"thrill",
		"telephone",
		"exercise",
		"broken",
		"elegant",
		"wall",
		"hard",
		"obnoxious",
		"needle",
		"little",
		"wave",
		"available",
		"island",
		"fireman",
		"try",
		"shiny",
		"cave",
		"learn",
		"fool",
		"cuddly",
		"box",
		"vessel",
		"circle",
		"succinct",
		"brawny",
		"glamorous",
		"step",
		"fold",
		"harbor",
		"partner",
		"different",
		"dizzy",
		"sky",
		"oatmeal",
		"income",
		"potato",
		"grumpy",
		"want",
		"encouraging",
		"tired",
		"early",
		"hospital",
		"guide",
		"mailbox",
		"zesty",
		"join",
		"suggestion",
		"wet",
		"mixed",
		"tub",
		"clam",
		"worried",
		"romantic",
		"respect",
		"back",
		"zoom",
		"cautious",
		"enter",
		"glib",
		"grandiose",
		"certain",
		"roasted",
		"name",
		"stem",
		"womanly",
		"dare",
		"coach",
		"silky",
		"dad",
		"rub",
		"stream",
		"attempt",
		"pot",
		"rub",
		"sidewalk",
		"please",
		"place",
		"coal",
		"pets",
		"wealthy",
		"calm",
		"zip",
		"dysfunctional",
		"flower"
	];

 	// clock

	var timer = 121;
	var isTheCountdownRunning = false;
	var countdown;
	var wordSelected;
	var score = 0;
	var correctWords = [];

	var select = function() {
		 var wordSelect = words1[Math.floor(Math.random()*100)];
		 wordSelected = wordSelect;
		 return shuffle(wordSelected); //generates random word
	}

	var shuffle = function(wordSelect) {
		console.log("selected word", wordSelect);
		var selectedArray = wordSelect.split(""); //takes random word
		var shuffledArray = _.shuffle(selectedArray);
			if (shuffledArray === selectedArray) {
				_.shuffle(shuffledArray);
			}
		var newWord = shuffledArray.join("");

		return newWord;
	}

	function startCountdown() {
		return setInterval(function() {
			timer = timer - 1;
			$("#counter").text(timer);
			if (timer === 0) {
				clearInterval(countdown);
				$('.submit').prop('disabled', true);
			}
		}, 1000);
	}

	var slideIndex = 0;
	displaySlides(slideIndex);

	function displaySlides(n) {
		var slides = document.getElementsByClassName('slideShow');
		slides[slideIndex].style.display = 'none';
		slides[n].style.display = 'block';
		slideIndex = n;
	}

	$('.headerlogoText').on('click', function(){
		displaySlides(0);
	});
	$('.howToPlay').on('click', function(){
		displaySlides(1);
	});
	$('.selectGame').on('click', function(){
		displaySlides(2);
	});
	$('.makers').on('click', function(){
		displaySlides(3);
	});
	$('.candy').on('click', function(){
		displaySlides(4);
	});

	//displays shuffled word on click, restarts timer and displays new shuffle
	//on new click

	$('.go').on('click', function(e){
		e.preventDefault();
		timer = 121;
		$('.emptyGuess').addClass('hidden');
		$('.submit').removeAttr('disabled');
		if (isTheCountdownRunning) {
			clearInterval(countdown);
			timer = 121;
		}
		else {
			isTheCountdownRunning = true;
		}
		countdown = startCountdown();
		var nextWord = select();
		score = 0; //Sets score to zero on reset
		$('span.score').html(`${score}`);
		console.log("next word", nextWord)
		$('h4').html(`Here's the jumbled word: ${nextWord}`);
		$('.finalScore').addClass('hidden');

	});

	$('form').on('submit', function(e){
		e.preventDefault();
			var userEntry = $('input').val();
			if (userEntry !== ''){
				$('input').val("");
				$('ul.submitted').append(`<li>${userEntry}</li>`)
				$('.emptyGuess').addClass('hidden');

			}
			else {
				$('.emptyGuess').removeClass('hidden').html(`The guess can't be empty!`);
			}

			console.log("word selected", wordSelected);
			console.log("user entry", userEntry);

			if (userEntry === wordSelected) {
					var nextWord = select();
					score++;
					$('span.score').html(`${score}`);
					$('h4').html(`Here's the jumbled word: ${nextWord}`);
					correctWords.push(userEntry);
			}
	});

	$('button.next').on('click', function(e){
		e.preventDefault();
		$('.emptyGuess').addClass('hidden');
			score--;
			var nextWord = select();
			$('span.score').html(`${score}`);
			$('h4').html(`Here's the next jumbled word: ${nextWord}`);
	});

	$('button.quit').on('click', function(e){
		e.preventDefault();
		$('.emptyGuess').addClass('hidden');
			$('.submit').prop('disabled', true);
			timer = 0;
			clearInterval(countdown);
			$('.finalScore').removeClass('hidden').html(`The final score is: ${score}`);
			$('.correctWords').html(`${correctWords}`);

	});

});



