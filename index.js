(function() {
	let questionContainer = document.getElementById('question');
	let timerContainer = document.getElementById('timer');
	let answerWrapper = document.getElementById('answerWrapper');
	let startScreen = document.getElementById('startScreen');

	const SUBMIT = document.getElementById('submit');
	const START = document.getElementById('startButton');

	let optionsArr;
	let currentScore = 0;
	let answeredQuestions = 0;

	const QUESTIONS = [
		questionOne = {
			question: 'What is the capital of South Africa?',
			answers: ['Johannesburg', 'Cape Town', 'Pretoria'],
			correctAnswer: 'Pretoria'
		},
		questionTwo = {
			question: 'What is the longest river in USA?',
			answers: ['Danube', 'Mississippi', 'Dakota'],
			correctAnswer: 'Mississippi'
		},
		questionThree = {
			question: 'What is an axolotl?',
			answers: ['A species of salamander', 'A multi-axel vehicle', 'A bone in the human foot'],
			correctAnswer: 'A species of salamander'
		},
		questionFour = {
			question: 'In which Australian state is Darwin?',
			answers: ['Tasmania', 'Queensland', 'Western Australia', 'Northern Territory'],
			correctAnswer: 'Northern Territory'
		},
		questionFive = {
			question: 'What is a group of dolphins called?',
			answers: ['Pod', 'School', 'Herd'],
			correctAnswer: 'Pod'
		},
		questionSix = {
			question: 'Who won the most Academy Awards?',
			answers: ['Steven Speilberg', 'Walt Disney', 'James Cameron', 'Katherine Hepburn'],
			correctAnswer: 'Walt Disney'
		},
		questionSeven = {
			question: 'Who is the "King of the Gods" in Greek mythology?',
			answers: ['Apollo', 'Poseidon', 'Dionysus', 'Zeus'],
			correctAnswer: 'Zeus'
		},
		questionEight = {
			question: 'Clouds are caused by what?',
			answers: ['Evaporation', 'Melting ice crystals', 'Water vapour condensing'],
			correctAnswer: 'Water vapour condensing'
		},
		questionNine = {
			question: 'What pastry is used to make profiteroles?',
			answers: ['Choux', 'Filo', 'Flaky', 'Shortcrust'],
			correctAnswer: 'Choux'
		},
		questionTen = {
			question: 'The Blue Grotto is a spectacular sea cave on which island?',
			answers: ['Elba', 'Florence', 'Capri', 'Sardinia'],
			correctAnswer: 'Capri'
		},
	];

	//hide question and answers on startup
	questionContainer.style.display = 'none';
	answerWrapper.style.display = 'none';

	//hide next button on app startup
	submit.style.display = 'none';

	START.onclick = () => { 
		//display next(submit button)
		submit.style.display = 'block';
		//disable next(submit) button before user chooses answer
		submit.disabled = true;
		//hide start button
		START.style.display = 'none';
		//display question and answers
		questionContainer.style.display = 'block';
		answerWrapper.style.display = 'block';
		//hide instructions 
		startScreen.style.display = 'none';
		//display first question
		let index = 0;
		displayQuestion(index);

		//set duration of countdown
		const ONEMINUTE = 60 * 1;
		startTimer(ONEMINUTE, timerContainer);
	}

	//enable next button on radio button click
	function handleNext(optionsArr) {
		optionsArr.forEach(function(elem) {
			elem.addEventListener('click', function(){
				SUBMIT.disabled = false;
				//get user choice when radio button clicked
				let userSelected = document.querySelectorAll('input[type="radio"]:checked');
				//get correct answer;
				let correctAnswer = QUESTIONS[answeredQuestions].correctAnswer;
				checkAnswer(userSelected, correctAnswer);
			})
		});
	}

	let checkAnswer = (userSelected, correctAnswer) => {
		let userAnswer = userSelected[0].previousElementSibling.innerHTML;
		if(correctAnswer === userAnswer) {
			currentScore++;
		}
	}

	SUBMIT.onclick = () => {
		nextQuestion();
		submit.disabled = true;
		optionsArr.forEach(function(elem) {
			elem.checked = false;
		})
	}

	let displayQuestion = (index) => {
		answerWrapper.innerHTML = '';
		questionContainer.innerHTML = QUESTIONS[index].question;
		const ANSWERS = QUESTIONS[index].answers;
		ANSWERS.forEach((answer, index) => {
			let markup = createMarkup(answer, index);
			answerContainer = document.createElement('div');
			answerContainer.innerHTML = markup;
			answerWrapper.appendChild(answerContainer);
		})

		function createMarkup(answer, index) {
			return `
				<label for="choice${index}" id="choice${index}Label">${answer}</label>
				<input type="radio" name="answer" id="choice${index}">
			`
		}
		
		const OPTIONS = document.getElementsByTagName('input');
		optionsArr = [...OPTIONS];
		handleNext(optionsArr);
	}

	let nextQuestion = () => {
		//get next question and answers in questions array
		answeredQuestions++;
		let index = answeredQuestions;
		let currentQuestion = answeredQuestions + 1;
		
		//check if end of of questions array
		if(currentQuestion <= QUESTIONS.length) {
			displayQuestion(index);
		} else {
			displayScore()
		}
	}

	let displayScore = () => {
		questionContainer.style.display = 'none';
		answerWrapper.innerHTML = `Your score is: ${currentScore}`;
		submit.style.display = 'none';
		console.log(currentScore);
	}

	function startTimer(duration, display) {

		let start = Date.now();
		let diff, min, sec;

		//display the time from start.onclick
		display.textContent = '01:00';

		let timer = setInterval(function() {

			diff = duration - (((Date.now() - start) / 1000) | 0);
			
			//use bitwise to truncate the float
			min = (diff / 60) | 0;
			sec = (diff % 60) | 0;

			min = min < 10 ? '0' + min : min;
			sec = sec < 10 ? '0' + sec : sec;

			display.textContent = min + ':' + sec;

			if (diff <= 0) {
				stopTimer();
				submit.disabled = 'true'; 
			};
		}, 1000);

		function stopTimer() {
			clearInterval(timer);
		};

	}

})()

