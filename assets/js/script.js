// Variable Declarations

// Quiz Questions and Answers
var quizQuestions = [
  {
    // Question 1
    question:
      'Which of the following will write the message "Hello World!" in an alert box?',
    answers: [
      "alert(Hello World!);",
      'alert("Hello World!");',
      'confirm("Hello World!");',
      'prompt("Hello World!");',
    ],
    answer: 'alert("Hello World!");',
  },
  // Question 2
  {
    question: "What type of statement will exit or terminate a loop?",
    answers: ["Continue", "Close", "Stop", "Break"],
    answer: "Break",
  },
  // Question 3
  {
    question: "What function stops an interval timer?",
    answers: [
      "clearInterval",
      "clearTimeout",
      "clearTimer",
      "None of the above",
    ],
    answer: "clearInterval",
  },
  // Question 4
  {
    question:
      'What is the output of the following code snippet: console.log(8 + "5" + 25); ?',
    answers: ["38", "165", "8525", "1000"],
    answer: "8525",
  },
  // Question 5
  {
    question: "Which statement is used to declare an array?",
    answers: [
      "var array = [];",
      "array = new array[];",
      "var array;",
      "None of the above",
    ],
    answer: "var array = [];",
  },
];

// DOM Selectors
var countdownEl = document.querySelector('#countdown');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('#answer');
var hintEl = document.querySelector('#hint');
var quizEl = document.querySelector('#quiz');
var scoreContainer = document.querySelector('.score');
var scoreEl = document.querySelector('#score');
var initalsEl = document.querySelector('#initals');
var submitBtn = document.querySelector('#submit');

// Variables for start of quiz
var questionIndex = 0;
var timeLeft = 75;
var timeInterval = 0;

// Start the quiz!
startQuiz();

// Start Quiz:
// start countdown and load questions
function startQuiz(){
  countdownEl.textContent = 'Timer: ' + timeLeft;
  countdownTimer();
  nextQuestion();
}

// Countdown Timer:
// 75 second countdown
function countdownTimer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    countdownEl.textContent = 'Timer: ' + timeLeft;

    if(timeLeft <= 0) {
      countdownEl.style.color = '#ed1b24';
      timeLeft = 0;
      clearInterval(timeInterval);
      countdownEl.textContent = 'Timer: ' + timeLeft;
      quizOver();
    }
  }, 1000);
}

// Show Next Question:
// load each question
function nextQuestion() {
  var currentQuestion = quizQuestions[questionIndex];
  questionEl.textContent = currentQuestion.question;
  answerEl.innerHTML = "";
  currentQuestion.answers.forEach(function(choice, i) {
    var answerBtn = document.createElement("button");
    answerBtn.setAttribute("value", choice);
    answerBtn.setAttribute("id", 'btn');
    answerBtn.textContent = choice;
    answerBtn.addEventListener("click", clickAnswer);
    answerEl.appendChild(answerBtn);
});
}

// Click on Answer:
// deduct time for wrong answers or go to next question for correct answers
function clickAnswer(event) {
  var selection = event.target;
  hintEl.classList.remove("hide");
  if (selection.value === quizQuestions[questionIndex].answer) {
    hintEl.textContent = "Correct!";
    hintEl.style.color = "#3bb44b";
    questionIndex++;
    if (questionIndex === quizQuestions.length) {
      clearInterval(timeInterval);
      quizOver();
    } else {
      nextQuestion();
    }
  } else {
    hintEl.textContent = "Wrong!";
    hintEl.style.color = "#ed1b24";
    timeLeft -= 15;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    countdownEl.textContent = 'Timer: ' + timeLeft;
  } 
}

// Quiz Over Function:
// save initals and score
function quizOver() {
  quizEl.classList.add('hide');
  hintEl.classList.add('hide');
  scoreContainer.classList.remove('hide');
  scoreEl.textContent = 'Your quiz score is: ' + timeLeft;
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var score = timeLeft;
    var initals = initalsEl.value.trim();
    if (initals !== '') {
      var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
      var newScore = {
        score,
        initals
      }
      highscores.push(newScore);
      localStorage.setItem('highscores', JSON.stringify(highscores));
    }
  });
}