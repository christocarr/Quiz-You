(function() {
	let questionContainer = document.getElementById('question');
	let answerWrapper = document.getElementById('answerWrapper');
	let startScreen = document.getElementById('startScreen');

	//get radio buttons
	let choiceOne = document.getElementById('choiceOne');
	let choiceTwo = document.getElementById('choiceTwo');
	let choiceThree = document.getElementById('choiceThree');

	//get radio button labels
	let choiceOneLabel = document.getElementById('choiceOneLabel');
	let choiceTwoLabel = document.getElementById('choiceTwoLabel');
	let choiceThreeLabel = document.getElementById('choiceThreeLabel');

	const CHOICES = document.getElementsByTagName('input');
	let choicesArray = [...CHOICES];

	const SUBMIT = document.getElementById('submit');
	const START = document.getElementById('startButton');
	const FORM = document.getElementById('answers');

	let score = document.getElementById('score');
	let currentScore = 0;
	score.innerHTML += ` ${currentScore}`;

	let currentQuestion = 0;

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
			question: 'Can you change the value of a const variable?',
			answers: ['No', 'Yes'],
			correctAnswer: 'No'
		},
		questionFour = {
			question: `What's the correct JS syntax to change the content of the HTML element?
		   <p id="demo">This is a demo</p>`,
			answers: [1,2,3],
			correctAnswer: '1'
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
		//dipslay first question
		let index = 0;
		displayQuestion(index);
	}

	//enable next button on radio button click
	choicesArray.forEach(function(elem) {
		elem.addEventListener('click', function(){
			SUBMIT.disabled = false;
			//get user choice when radio button clicked
			let userSelected = document.querySelectorAll('input[type="radio"]:checked');
			//get correct answer;
			let correctAnswer = QUESTIONS[currentQuestion].correctAnswer;
			checkAnswer(userSelected, correctAnswer);
		})
	});

	let checkAnswer = (userSelected, correctAnswer) => {
		let userAnswer = userSelected[0].previousElementSibling.innerHTML;
		if(correctAnswer === userAnswer) {
			currentScore++;
		}
	}

	SUBMIT.onclick = () => {
		nextQuestion();
		submit.disabled = true;
		choicesArray.forEach(function(elem) {
			elem.checked = false;
		})
		score.innerHTML = `Score: ${currentScore}`;
	}

	let displayQuestion = (index) => {
		questionContainer.innerHTML = QUESTIONS[index].question;

		choiceOneLabel.innerHTML = QUESTIONS[index].answers[0];
		choiceTwoLabel.innerHTML = QUESTIONS[index].answers[1];
		choiceThreeLabel.innerHTML = QUESTIONS[index].answers[2];
	}

	let nextQuestion = () => {
		//get next question and answers in questions array
		currentQuestion++;
		let index = currentQuestion;
		displayQuestion(index);
	}

})()

