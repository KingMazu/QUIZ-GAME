const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton  = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


//Quiz questions

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ]
  },
  {
    question: "Who developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Galileo Galilei", correct: false },
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
    ]
  },
  {
    question: "Which language is mainly used for web styling?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "C++", correct: false },
    ]
  },
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Program Utility", correct: false },
      { text: "Control Processing User", correct: false },
    ]
  },
  {
    question: "Which company created the iPhone?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Google", correct: false },
      { text: "Apple", correct: true },
      { text: "Microsoft", correct: false },
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
    ]
  },
  {
    question: "Which continent is Egypt located in?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Europe", correct: false },
      { text: "Africa", correct: true },
      { text: "South America", correct: false },
    ]
  },
  {
    question: "What year did World War II end?",
    answers: [
      { text: "1945", correct: true },
      { text: "1939", correct: false },
      { text: "1918", correct: false },
      { text: "1963", correct: false },
    ]
  },
  {
    question: "Which data structure uses FIFO?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ]
  },
  {
    question: "What is the result of 5 × 6?",
    answers: [
      { text: "25", correct: false },
      { text: "30", correct: true },
      { text: "35", correct: false },
      { text: "40", correct: false },
    ]
  }
];

function startQuiz(){
  //reset vars 

  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion()
}


// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


//event listener 

startButton.addEventListener("click", ()=>{
  currentQuestionIndex = 0 ;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
});


function showQuestion(){
  //reset state

  answersDisabled = false;

   const currentQuestion = quizQuestions[currentQuestionIndex];
   

   currentQuestionSpan.textContent = currentQuestionIndex + 1;

   const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
   progressBar.style.width = progressPercent + "%";

   questionText.textContent = currentQuestion.question;
   

   //todo : explain this in a second

   answersContainer.innerHTML = "";
 

   currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add('answer-btn');

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);


   });

}


function selectAnswer(event){
//Optimization check

if(answersDisabled) return

answersDisabled = true 

const seletedButton = event.target;

const isCorrect = seletedButton.dataset.correct == "true";

Array.from(answersContainer.children).forEach((button) =>{
if(button.dataset.correct === "true"){
  button.classList.add("correct");
}else{
  button.classList.add("incorrect");
}
});

if(isCorrect){
  score++;
  scoreSpan.textContent = score;
}


setTimeout(() =>{ 
currentQuestionIndex++;

//check if there are more questions or if the quiz is over 

if(currentQuestionIndex < quizQuestions.length){
showQuestion()
}else{
  showResult()
}
}, 1000)

}


function showResult(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100;

  if(percentage === 100){
    resultMessage.textContent = "Perfect ! You're a genius!";
  }else if (percentage >= 80){
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >=60){
    resultMessage.textContent = "Good effort! Keep learning!";
  }else if (percentage >= 40){
    resultMessage.textContent = "Not bad! Try again to improve!";
  }else{
     resultMessage.textContent = "Keep studying ! You'll get better!";
  }

}

restartButton.addEventListener('click', restartQuiz)


function restartQuiz(){
  resultScreen.classList.remove("active");

  startQuiz()
}




