(function() {
	let questionContainer = document.getElementById('question');

	let choiceOne = document.getElementById('choiceOne');
	let choiceOneTwo = document.getElementById('choiceTwo');
	let choiceThree = document.getElementById('choiceThree');

	let submit = document.getElementById('submit');
	const START = document.getElementById('startButton');

	let score = document.getElementById('score');
	let currentScore = 0;

	const questions = { 
		questionOne: { 
			question : 'What is the capital of South Africa?', 
			answers : ['Johannesburg', 'Cape Town', 'Pretoria'],
			correctAnswer: 'Pretoria'
		},
		questionTwo: {
			question: 'What is the longest river in USA?',
			answers: ['Danube', 'Mississippi', 'Dakota'],
			correctAnswer: 'Mississippi'
		}
	}
										
	questionContainer.innerHTML = questions.questionOne.question;

	choiceOneLabel.innerHTML = questions.questionOne.answers[0];
	choiceTwoLabel.innerHTML = questions.questionOne.answers[1];
	choiceThreeLabel.innerHTML = questions.questionOne.answers[2];

	//hide next button on app startup
	submit.style.display = 'none';
	//display next(submit) button when start button clicked
	START.onclick = () => { 
		console.log('start');
		submit.style.display = 'block';
		//hide start button
		START.style.display = 'none';
	}
})()

