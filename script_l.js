let users = [];
var score = 0;


const options = document.querySelectorAll('.option');



async function startQuiz() {
  try {
    const response = await fetch('https://kashikalu2.pythonanywhere.com/leaderbord');
    users = await response.json();
    displayQuestion();
  } catch (error) {
    console.error('Fehler beim Abrufen der Fragen:', error);
  }
}

function displayQuestion() {

	document.getElementById('option-a').textContent = '1.'+users[0].user+' | '+users[0].score;
  document.getElementById('option-b').textContent = '1.'+users[1].user+' | '+users[1].score;;
  document.getElementById('option-c').textContent = '1.'+users[2].user+' | '+users[2].score;;
}

function leaderbord(){
	window.location.href = 'index.html';
}
startQuiz();