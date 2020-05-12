(function() {
	let questionContainer = document.getElementById('question');
	let timerContainer = document.getElementById('timer');
	let answerWrapper = document.getElementById('answerWrapper');
	let startScreen = document.getElementById('startScreen');

	const SUBMIT = document.getElementById('submit');
	const START = document.getElementById('startButton');
	const SCREEN_TOGGLE = document.getElementById('screenToggle');
	const SELECT = document.getElementById('select');
	const SELECT_WRAPPER = document.getElementById('selectWrapper');

	let selectedQuestions;
	let optionsArr;
	let currentScore = 0;
	let answeredQuestions = 0;
	let timer;

	//hide question and answers on startup
	questionContainer.style.display = 'none';
	answerWrapper.style.display = 'none';

	//hide next button on app startup
	submit.style.display = 'none';

	START.onclick = () => { 

		//hide select tag
		SELECT_WRAPPER.style.display = 'none';

		//display next(submit button)
		submit.style.display = 'block';

		//disable next(submit) button before user chooses answer
		submit.disabled = true;

		//hide start button
		START.style.display = 'none';

		//display question and answers
		questionContainer.style.display = 'block';
		answerWrapper.style.display = 'flex';

		//hide instructions 
		startScreen.style.display = 'none';

		//get user selected question set
		switch(SELECT.selectedIndex) {
			case 0:
				selectedQuestions = QUESTIONS_ONE;
				break;
			case 1:
				selectedQuestions = QUESTIONS_TWO;
				break;
			case 2:
				selectedQuestions = QUESTIONS_THREE;
				break;
			default:
				selectedQuestions = QUESTIONS_ONE;
		}

		//shuffle selected questions
		shuffleQuestions(selectedQuestions);

		//display first question
		let index = 0;
		displayQuestion(index, selectedQuestions);

		//set duration of countdown
		const ONEMINUTE = 60 * 1;
		startTimer(ONEMINUTE, timerContainer);
	}

	//shuffle questions array is selectedQuestions
	function shuffleQuestions(array) {
		for(let i = array.length -1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array;
	}

	//enable next button on radio button click
	function handleNext(optionsArr) {
		optionsArr.forEach(function(elem) {
			elem.addEventListener('click', function(){
				SUBMIT.disabled = false;
				//get user choice when radio button clicked
				let userSelected = document.querySelectorAll('input[type="radio"]:checked');
				//get correct answer;
				let correctAnswer = selectedQuestions[answeredQuestions].correctAnswer;
				checkAnswer(userSelected, correctAnswer);
			})
		});
	}

	let checkAnswer = (userSelected, correctAnswer) => {
		let userAnswer = userSelected[0].previousElementSibling.textContent;
		if(correctAnswer === userAnswer) {
			currentScore++;
		}
	}

	SUBMIT.onclick = () => {
		nextQuestion(selectedQuestions);
		submit.disabled = true;
		optionsArr.forEach(function(elem) {
			elem.checked = false;
		})
	}

	let displayQuestion = (index, selectedQuestions) => {
		answerWrapper.innerHTML = '';
		questionContainer.innerHTML = selectedQuestions[index].question;
		const ANSWERS = selectedQuestions[index].answers;
		ANSWERS.forEach((answer, index) => {
			let markup = createMarkup(answer, index);
			answerContainer = document.createElement('div');
			answerContainer.classList.add('answer-container');
			answerContainer.style.width = '90%';
			answerContainer.innerHTML = markup;
			answerWrapper.appendChild(answerContainer);
		})

		function createMarkup(answer, index) {
			return `
				<label class="label" for="choice${index}" id="choice${index}Label">${answer}</label>
				<input class="radio-button" type="radio" name="answer" id="choice${index}">
			`
		}
		
		//get user options and put into array
		const OPTIONS = document.getElementsByTagName('input');
		optionsArr = [...OPTIONS];
		handleNext(optionsArr);
	}

	let nextQuestion = (selectedQuestions) => {
		//get next question and answers in questions array
		answeredQuestions++;
		let index = answeredQuestions;
		let currentQuestion = answeredQuestions + 1;
		
		//check if end of of questions array
		if(currentQuestion <= selectedQuestions.length) {
			//if not the carry on with displaying questions
			displayQuestion(index, selectedQuestions);
		} else {
			//if end of questions array then display score
			displayScore()
			stopTimer();
		}
	}

	let displayScore = (timeUp) => {
		const MODAL = document.querySelector('.modal');
		const MESSAGE = document.querySelector('.score-message');
		const TRY_AGAIN = document.getElementById('tryAgain');



		MODAL.style.display = 'block';
		timerContainer.style.display = 'none';
		questionContainer.style.display = 'none';
		if (currentScore === 10) {
			MESSAGE.innerHTML = `
				<p>Well done, you did great!</p>
				<p>Your score is: ${currentScore}</p>
				`;
		} else if (currentScore > 7) {
			MESSAGE.innerHTML = `
				<p class="time-up">${timeUp}</p>
				<p>You almost scored the maximum points</p>
				<p>Your score is: ${currentScore}</p>
				`;
		} else if (currentScore < 8 && currentScore > 4) {
			MESSAGE.innerHTML = `
				<p>${timeUp}</p>
				<p>You didn't do too badly.</p>
				<p>Your score is: ${currentScore}</p>
				`;
		} else {
			MESSAGE.innerHTML = `
				<p>${timeUp}<p>
				<p>You can do much better.</p>
				<p>Your score is: ${currentScore}</p>`;
		}
	
		TRY_AGAIN.addEventListener('click', function(ev) {
			console.log(ev, 'reload window');
			window.location.reload();
		});

		submit.style.display = 'none';
	}

	function startTimer(duration, display) {

		let start = Date.now();
		let diff, min, sec;

		//display the time from start.onclick
		display.textContent = '01:00';

		timer = setInterval(function() {

			diff = duration - (((Date.now() - start) / 1000) | 0);
			
			//use bitwise to truncate the float
			min = (diff / 60) | 0;
			sec = (diff % 60) | 0;

			min = min < 10 ? '0' + min : min;
			sec = sec < 10 ? '0' + sec : sec;

			display.textContent = min + ':' + sec;

			//display timer in red when last 10 sec
			if (sec < 11) {
				timerContainer.style.color = 'red';
			}
		
			if (diff <= 0) {
				stopTimer();
				//if time is up then send message to display
				let timeUp = `Time's up!`
				displayScore(timeUp); 
			};
		}, 1000);

	}

	function stopTimer() {
		clearInterval(timer);
	};

	//toggle dark mode/light mode
	SCREEN_TOGGLE.addEventListener('click', function() {
		let body = document.querySelector('body');
		const CURRENT_MODE = body.classList.value;
		if (CURRENT_MODE == '') {
			body.classList.add('dark-mode');
			startScreen.classList.add('dark-mode');
			questionContainer.classList.add('dark-mode');
			answerWrapper.classList.add('dark-mode');
			SCREEN_TOGGLE.innerHTML = 'Light Mode';
		} else {
			body.classList.remove('dark-mode');
			startScreen.classList.remove('dark-mode');
			questionContainer.classList.remove('dark-mode');
			answerWrapper.classList.remove('dark-mode');
			SCREEN_TOGGLE.innerHTML = 'Dark Mode';
		}
	})

})()

