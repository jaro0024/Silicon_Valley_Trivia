
/* Pseudo code:
 1) Start button to go to the first question (click event)
 2) once start button is clicked, start 30 second timer and show 1 question and 4 options - only one can be clicked (timer)
 3) once an answered is clicked, timer stops and evaluate if answer is correct or not (click event and win/lose function)
 4) if correct, show page that says correct and a giphy (if / else statement)
 5) else if is incorrect, show page that says incorrect, gives the correct answer and a giphy (if / else statement)
 6) else, no answer before timer is up, show page that says you ran out of time, gives the correct answer and a giphy (if / else statement)
 7) after 5 seconds, go to next question (timer) (for loop)
 8) every time it evaluates if the answer is correct, incorrect or not answered, increment the respective variable (++)
 9) once the player has gone through all questions, show a screen with the stats:
  a) correct answers
  b) incorrect answers
  c) unanswered questions
 10) add a "start over" button that will reset the game to the begiinning without reloading the page */

// Ready function
$(function () {
    $("#play-again").hide();
    $("#trivia-answers").hide();
    
    initGame();
    

// Global variables
var correctTotal = 0;
var incorrectTotal = 0;
var unansweredTotal = 0;

// Array for the trivia game
var triviaGame = [
    {
        question: "Who sold an aviation start-up called Aviato?",

        answers: {
            a: "Big Head",
            b: "Richard",
            c: "Erlich",
            d: "Jared"
        },

        correctAnswer: "Erlich",
        
        image: ("assets/images/erlich.gif")
    },

    {
        question: "What is the name of the website Richard is working on in the pilot episode?",

        answers: {
            a: "Green Archer",
            b: "Pied Piper",
            c: "Red Hood",
            d: "Green Arrow"
        },

        correctAnswer: "Pied Piper",

        image: ("assets/images/piedpiper.gif")
    },

    {
        question: "Who said: 'Most CEOs don’t have a best friend just hanging around.'",

        answers: {
            a: "Gilfoyle",
            b: "Richard",
            c: "Erlich",
            d: "Jared"
        },

        correctAnswer: "Jared",

        image: ("assets/images/jared.gif")
    },

    {
        question: "Who is revealed to be Canadian and gets himself a work visa?",

        answers: {
            a: "Gilfoyle",
            b: "Peter",
            c: "Jared",
            d: "Richard"
        },

        correctAnswer: "Gilfoyle",

        image: ("assets/images/gilfoyle.gif")
    },

    {
        question: "Who said: “It’s weird having a girl in the house, it’s a very strange energy.”",

        answers: {
            a: "Big Head",
            b: "Richard",
            c: "Erlich",
            d: "Dinesh"
        },

        correctAnswer: "Dinesh",
        
        image: ("assets/images/dinesh.gif")
    },

];
   
// function to start game by clicking the "start game" button
function initGame() {
    
    $("#start-game").click(function () {
        $("#start-gif").hide();
        $("#start-game").hide();
        createQuestion();
        runTimer();
    
    })
}

// Function to get question
function createQuestion() {
   for(var i = 0; i < triviaGame.length; i++) {
       $("#trivia-question").html("<h3>" + triviaGame[i].question + "</h3>");

       $("#answerA").html(triviaGame[i].answers.a);
       $("#answerB").html(triviaGame[i].answers.b);
       $("#answerC").html(triviaGame[i].answers.c);
       $("#answerD").html(triviaGame[i].answers.d);

       $("#trivia-answers").show();  
       $("#timer").html("<h3>" + "Time remaining: " + number + "</h3>");

    }
    console.log(createQuestion);
}

// Function to set the timer per question
    var number = 30;
    var intervalId;

function runTimer() {
    intervalId = setInterval(decrement, 1000);
    
}

function decrement() {
    number--;

    $("#timer").html("<h3>" + "Time remaining: " + number + "</h3>");

    if(number === 0) {
        stopTimer();
        alert("Time is up!");
    }
}
    
function stopTimer() {
    clearInterval(intervalId);
}


// Function to check if answer is correct or not




// Function to restart game when clicking button


});
