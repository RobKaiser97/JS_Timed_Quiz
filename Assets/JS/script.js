// Variables
var timeLeft = 100 //sec
var counterH3 = document.getElementById("countdown");
var start = document.getElementById('start');
var next = document.getElementById('next');
var playAgain = document.getElementById('play-again-btn');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-btns');
var instructions = document.getElementById('instructions');
var currentQuestionIndex = 0;
var score = 0;
var HighScores = document.getElementById('highscore');
var quizBody = document.getElementById('quiz-body');
var prevScore = sessionStorage.getItem("initials") + " " + sessionStorage.getItem("score") + "/4";
var scoreCard = $('#score-sheet');
var highscoreEl = $('#highscore-target');


// Highscores
var printHighscores = function() {
  var newLi = $("<li>");
  highscoreEl.append(newLi);
  console.log(newLi);
  newLi.text(sessionStorage.getItem("initials") + " " + sessionStorage.getItem("score") + "/4");
};

// Initial countdown text
counterH3.innerText = "Time Remaining: " + timeLeft;

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Makeup Language", correct: false },
      { text: "Hyper Text Markup Lingo", correct: false },
      { text: "Hyper Text Markup Languish", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Scripts", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Style Syntax", correct: false },
      { text: "Cascading Style Symbols", correct: false }
    ]
  },
  {
    question: "What function is used to select an element by its id?",
    answers: [
      { text: "document.getElementByClass()", correct: false },
      { text: "document.getElementByTag()", correct: false },
      { text: "document.getElementById()", correct: true },
      { text: "document.getElementByAttribute()", correct: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Markup", correct: false },
      { text: "Document Object Method", correct: false },
      { text: "Document Object Mode", correct: false },
      { text: "Document Object Model", correct: true }
    ]
  }
]

// Functions

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      counterH3.textContent = 'Time Remaining: ' + timeLeft;
      timeLeft--;
    } else {
      counterH3.textContent = 'Time is up!';
      clearInterval(timeInterval);
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('answers');
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    score++;
  } else {
    WrongAnswer();
  }
  if (currentQuestionIndex < questions.length - 1) {
    nextQuestion();
  } else {
    showScore();
    timeLeft = 0;
    playAgain.classList.remove = "hide";
    playAgain.style.display = "block";
    playAgain.style.margin = "auto";
    playAgain.addEventListener('click', RestartQuiz);
  }
}

function WrongAnswer() {
  timeLeft = timeLeft - 15;
  alert("Wrong Answer! -15 seconds");
}

function promptUserInitials() {
  var initials = prompt("Enter your initials to save your score.");

  if (initials === null) {
    return;
  }
  sessionStorage.setItem("initials", initials);
  console.log(initials);
  return initials;
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
}

function showScore() {
  resetState();
  let scorePercentage = Math.floor(score / questions.length * 100);
  // display the score
  questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!' + '<br>' + 'That is ' + scorePercentage + '%!';
  //store the score to the local storage
  sessionStorage.setItem("score", score);
  // prompt the user for their initials
  promptUserInitials();
  instructions.innerHTML = "";
  console.log(sessionStorage.getItem("score"));
  return;
  
}

function StartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  start.addEventListener('click', function() {
    countdown();
    // hide start button
    start.style.display = "none";
    // display submit button
    next.classList.remove = "hide";
    playAgain.style.display = "none";
    showQuestion();
  });
}

var RestartQuiz = function() {
  playAgain.addEventListener('click', function() {
    StartQuiz();
  });
  console.log("RestartQuiz");
  printHighscores();
  location.reload();
}

// Start Quiz on page load
StartQuiz();

HighScores.addEventListener('click', function() {
  quizBody.style.display = "none";
  scoreCard.addClass('show');
});

HighScores.addEventListener('dblclick', function() {
  quizBody.style.display = "block";
  scoreCard.addClass('hide');
});


