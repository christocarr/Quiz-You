(function() {
	let questionContainer = document.getElementById('question');
	let answerWrapper = document.getElementById('answerWrapper');

	let choiceOne = document.getElementById('choiceOne');
	let choiceOneTwo = document.getElementById('choiceTwo');
	let choiceThree = document.getElementById('choiceThree');

	const SUBMIT = document.getElementById('submit');
	const START = document.getElementById('startButton');
	const FORM = document.getElementById('answers');

	let score = document.getElementById('score');
	let currentScore = 0;

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
	];

	//display welcome message on app startup
	questionContainer.innerHTML = 'Welcome to Quiz You';
	//hide form on startup
	FORM.style.display = 'none';
	//display rules on startup
	let p = document.createElement('p');
	p.innerHTML = 'Click Start to begin the quiz. More rules to come...';
	answerWrapper.appendChild(p);
	//hide next button on app startup
	submit.style.display = 'none';

	//display next(submit) button when start button clicked
	START.onclick = () => { 
		submit.style.display = 'block';
		//hide start button
		START.style.display = 'none';
		//display first question and multiple choice answers
		questionContainer.innerHTML = QUESTIONS[0].question;
		//display form and hide rules
		FORM.style.display = 'block';
		p.style.display = 'none';
		choiceOneLabel.innerHTML = QUESTIONS[0].answers[0];
		choiceTwoLabel.innerHTML = QUESTIONS[0].answers[1];
		choiceThreeLabel.innerHTML = QUESTIONS[0].answers[2];
	}

	SUBMIT.onclick= () => {
		// checkAnswer();
		nextQuestion();
	}

	let nextQuestion = () => {
		//get next question and answers in questions array
		currentQuestion++;
		let index = currentQuestion;
    //output question and answers to containers
		questionContainer.innerHTML = QUESTIONS[index].question;
		choiceOneLabel.innerHTML = QUESTIONS[index].answers[0];
		choiceTwoLabel.innerHTML = QUESTIONS[index].answers[1];
		choiceThreeLabel.innerHTML = QUESTIONS[index].answers[2];
		
	}


})()

