(function() {
	let questionContainer = document.getElementById('question');
	let answerWrapper = document.getElementById('answerWrapper');


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

	START.onclick = () => { 
		//display next(submit button)
		submit.style.display = 'block';
		//disable next(submit) button before user chooses answer
		submit.disabled = true;
		//hide start button
		START.style.display = 'none';
		//display form and hide rules
		FORM.style.display = 'block';
		p.style.display = 'none';
		let index = 0;
		//dipslay first question
		displayQuestion(index);
	}

	choicesArray.forEach(function(elem) {
		elem.addEventListener('click', function(){
			SUBMIT.disabled = false;
		})
	});

	SUBMIT.onclick= () => {
		nextQuestion();
		submit.disabled = true;
		choicesArray.forEach(function(elem) {
			elem.checked = false;
		})
	}

	let displayQuestion = (index) => {
		questionContainer.innerHTML = QUESTIONS[index].question;

		choiceOneLabel.innerHTML = QUESTIONS[index].answers[0];
		choiceTwoLabel.innerHTML = QUESTIONS[index].answers[1];
		choiceThreeLabel.innerHTML = QUESTIONS[index].answers[2];

		//get values of labels
		let choiceOneStr = choiceOneLabel.innerHTML;
		let choiceTwoStr = choiceTwoLabel.innerHTML;
		let choiceThreeStr = choiceThreeLabel.innerHTML;

		// //get values of radio buttons
		// let choiceOneVal = choiceOne.checked;
		// let choiceTwoVal = choiceTwo.checked;
		// let choiceThreeVal = choiceThree.checked;
		// let selected;
		// if (choiceOneVal || choiceTwoVal || choiceThreeVal) {
		// 	selected = "checked";
		// }
		let selected = document.querySelectorAll('input[type="radio"]:checked');
		console.log(selected);

		checkAnswer(choiceThreeStr,choiceOneStr,choiceTwoStr);
	}

	let checkAnswer = (choiceThreeStr, choiceOneStr, choiceTwoStr) => {
		console.log(choiceThreeStr, choiceOneStr, choiceTwoStr);
	}

	let nextQuestion = () => {
		//get next question and answers in questions array
		currentQuestion++;
		let index = currentQuestion;
		displayQuestion(index);
	}

})()

