// Variable declarations
var timeLeft = 100; //sec
var counterH3 = document.getElementById("countdown");
var start = document.getElementById('start');
var next = document.getElementById('next');
var playAgain = document.getElementById('play-again-btn');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-btns');
var instructions = document.getElementById('instructions');
var currentQuestionIndex = 0;
var score = 0;
var scoreCard = $("#score-card");
var HighScores = document.getElementById('highscore');
var quizBody = document.getElementById('quiz-body');

// Initialize the countdown timer display
counterH3.innerText = "Time Remaining: " + timeLeft;

// Array of question objects
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
];

// Countdown function which starts a timer
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

// Show the question on the page
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

// Handle the selected answer
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
    storeScores();
    timeLeft = 0;
    playAgain.classList.remove = "hide";
    playAgain.style.display = "block";
    playAgain.style.margin = "auto";
    playAgain.addEventListener('click', RestartQuiz);
  }
}

// Notify the user of a wrong answer
function WrongAnswer() {
  timeLeft = timeLeft - 15;
  alert("Wrong Answer! -15 seconds");
}

// Prompt user for initials to save with high score
function promptUserInitials() {
  var initials = prompt("Enter your initials to save your score.");

  if (initials === null) {
    return;
  }
  localStorage.setItem("initials", initials);
  console.log(initials);
  return initials;
}

// Clear previous answers before showing new question
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Go to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
}

// Show the final score
function showScore() {
  resetState();
  let scorePercentage = Math.floor(score / questions.length * 100);
  questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!' + '<br>' + 'That is ' + scorePercentage + '%!';
  localStorage.setItem("score", score);
  promptUserInitials();
  instructions.innerHTML = "";
  console.log(localStorage.getItem("score"));
  return;
}

// Start the quiz
function StartQuiz() {
  localStorage.getItem("scoreCard");
  currentQuestionIndex = 0;
  score = 0;
  start.addEventListener('click', function() {
    countdown();
    start.style.display = "none";
    playAgain.style.display = "none";
    showQuestion();
  });
}

// Restart the quiz
var RestartQuiz = function() {
  playAgain.addEventListener('click', function() {
    StartQuiz();
  });
  console.log("RestartQuiz");
  localStorage.setItem('myHighscores', $('#score-sheet').html());
  console.log(localStorage.getItem('myHighscores'));
  location.reload();
}

// Store highscores in local storage
var storeScores = function() {
  var highscoreEl = $("#highscore-target");
  let newLi = $("<li>");
  highscoreEl.append(newLi);
  let newScore = (localStorage.getItem("initials") + " " + localStorage.getItem("score") + "/4").toString().toUpperCase();
  console.log(newScore);
  $("li:last").append(newScore);
};

// Retrieve and apply highscores after page reload
$(document).ready(function() {
  var myHighScores = localStorage.getItem('myHighscores');
  if (myHighScores) {
    $('#score-sheet').html(myHighScores);
  }
});

// Event listeners for HighScores button clicks and double clicks
HighScores.addEventListener('click', function() {
  quizBody.style.display = "none";
  $("#score-sheet").removeClass('hide');
  $("#score-sheet").addClass('show');
});

HighScores.addEventListener('dblclick', function() {
  quizBody.style.display = "block";
  $("#score-sheet").removeClass('show');
  $("#score-sheet").addClass('hide');
});

// Start Quiz on page load
StartQuiz();
