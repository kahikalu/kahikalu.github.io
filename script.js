var username;
let questions = [];
let currentQuestionIndex = 0;
var score = 0;


const options = document.querySelectorAll('.option');
const continueBtn = document.querySelector('.continue');

options.forEach(option => {
    option.addEventListener('click', () => {
        continueBtn.disabled = false;
    });
});

async function startQuiz() {
  try {
    const response = await fetch('https://kashikalu2.pythonanywhere.com/question');
    questions = await response.json();
    displayQuestion();
  } catch (error) {
    console.error('Fehler beim Abrufen der Fragen:', error);
    alert('Fehler beim Laden der Fragen. Bitte versuche es später erneut.');
  }
}

function displayQuestion() {
	continueBtn.disabled = true;
  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.frage;


  const answers = [currentQuestion.antwort1, currentQuestion.antwort2, currentQuestion.antwort3];
  shuffleArray(answers);

	document.getElementById('option-a').textContent = answers[0];
  document.getElementById('option-b').textContent = answers[1];
  document.getElementById('option-c').textContent = answers[2];
}

function nextQuestion(){
	currentQuestionIndex += 1;
  document.getElementById('option-a').style.color = "#8b7d6b";
  document.getElementById('option-b').style.color = "#8b7d6b";
  document.getElementById('option-c').style.color = "#8b7d6b";
  document.getElementById('option-a').disabled = false;
  document.getElementById('option-b').disabled = false;
  document.getElementById('option-c').disabled = false;

  if(currentQuestionIndex >= questions.length){
    username = document.getElementById('username').value;
  	if(username.trim().length > 0){
    	console.log("test");

    	var userData = {
        "username": username,
        "score": score
    	};
    
			var xhr = new XMLHttpRequest();
    	xhr.open("POST", "https://kashikalu2.pythonanywhere.com/user", true);
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.send(JSON.stringify(userData));
      
  		document.getElementById('ende').innerHTML = "<div class='ende'>Ende</div>";
      }
  }else{
  	displayQuestion();
  }
}

function checkAnswer(opt){
	let opt_p = 'option-'+opt;
	let ans = document.getElementById(opt_p).textContent;
	document.getElementById(opt_p).disabled = true;
  if(ans === questions[currentQuestionIndex].antwort1){
  	document.getElementById(opt_p).style.color = "#7CBB69";
    score += 1;
  }else{
  	document.getElementById(opt_p).style.color = "#F6906C";
    score -= 1;
  }
  update_score()
}
function update_score(){
	document.getElementById("score").textContent = "Punkte: "+score;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function leaderbord(){
	window.location.href = 'leaderboard.html';
}
startQuiz();