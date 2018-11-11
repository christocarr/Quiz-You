(function() {
	let questionContainer = document.getElementById('question');
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
		// console.log('Answered questions:', answeredQuestions);
		// console.log('Current question:', currentQuestion);
	
		//check if end of of questions array
		if(currentQuestion <= QUESTIONS.length) {
			displayQuestion(index);
		} else {
			displayScore()
		}
	}

	let displayScore = () => {
		questionContainer.style.display = 'none';
		
	}

})()

