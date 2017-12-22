let questionContainer = document.getElementById('question');

let choiceOne = document.getElementById('choiceOne');
let choiceOneTwo = document.getElementById('choiceTwo');
let choiceThree = document.getElementById('choiceThree');

let submit = document.getElementById('submit');

const questions = { 
	questionOne: { 
		question : 'What is the capital of South Africa?', 
		answers : ['Johannesburg', 'Cape Town', 'Pretoria'],
		correctAnswer: 'Pretoria'
	},
	questionTwo: {
		question: 'What is the longest river in USA?',
		answers: ['Danube', 'Mississipi', 'Dakota'],
		correctAnswer: 'Mississipi'
	}
}
									 
questionContainer.innerHTML = questions.questionOne.question;

choiceOne.innerHTML = questions.questionOne.answers[0];
choiceTwo.innerHTML = questions.questionOne.answers[1];
choiceThree.innerHTML = questions.questionOne.answers[2];

console.log(questionContainer);

submit.onclick = () => { 
	
}