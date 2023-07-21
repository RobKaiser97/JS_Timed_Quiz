var timeLeft = 100 //sec
var counterH3 = document.getElementById("countdown")
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
    
  }
]
var questionOne = "What does HTML stand for?"
var questionOneAnswers = ["Hyper Text Markup Language", "Hyper Text Makeup Language", "Hyper Text Markup Lingo", "Hyper Text Markup Languish"]
var questionTwo = "What does CSS stand for?"
var questionTwoAnswers = ["Cascading Style Sheets", "Cascading Style Scripts", "Cascading Style Syntax", "Cascading Style Symbols"]
var questionThree = "What function is used to select an element by its id?"
var questionThreeAnswers = ["document.getElementById()", "document.getElementByClass()", "document.getElementByTag()", "document.getElementByAttribute()"]
var questionFour = "What does DOM stand for?"
var questionFourAnswers = ["Document Object Model", "Document Object Markup", "Document Object Method", "Document Object Mode"]
var correctAnswers = ["Hyper Text Markup Language", "Cascading Style Sheets", "document.getElementById()", "Document Object Model"]

let questions = [questionOne, questionTwo, questionThree, questionFour]
console.log(questions);
let answers = [questionOneAnswers, questionTwoAnswers, questionThreeAnswers, questionFourAnswers]
console.log(answers);


counterH3.innerText = "Time Remaining: " + timeLeft;

var start = document.getElementById('start');
var submit = document.getElementById('submit-div');
var submitShow = function() {
  submit.classList.remove("hide");
};


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

start.addEventListener('click', function() {
  if(start) {
    countdown();
    // hide start button
  start.style.display = "none";
  // display submit button
  submitShow();
  }
  
});

// i need to write a function to propagate the users initials and quiz score to the highscores page
// i need to write a function to store the users initials and quiz score in local storage 
// i need to write a function to retrieve the users initials and quiz score from local storage  
// i need to write a function to display the users initials and quiz score on the highscores page
// i need to write a function to clear the users initials and quiz score from local storage 
// i need to write a function to subtract 15 seconds from the timer when the user answers a question incorrectly  
// i need to write a function to calculate the users score based on answers clicked
// i need to write a function that will hide and show certain rows representing the questions and answers

function WrongAnswer() {
  timeLeft = timeLeft - 15;
}

function IsAnswerCorrect() {
  if (this.value = answers) {
    alert("Correct!");
  } else {
    alert("Wrong!");
    WrongAnswer();
  }
}

function promptUserInitials() {
  var initials = prompt("Enter your initials");
  if (prompt = null) {
    return;
  }
  localStorage.setItem("initials", initials);
  return initials;
}

