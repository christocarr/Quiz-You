let questionContainer = document.getElementById('question');

let answer = document.getElementById('answer');

let submit = document.getElementById('submit');

const questions = ['questionOne', 'questionTwo', 'questionThree'];

questionContainer.innerHTML = questions[2] + '?';

console.log(answer.value);

submit.onclick = () => { 
	console.log('Clicked');
}