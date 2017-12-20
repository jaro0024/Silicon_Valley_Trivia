
// Ready function
$(function () {
    $("#question-section").hide();
    $("#results-section").hide();
    $("#answer-section").hide();

    initGame();
})

// Array for the trivia game including question, answers, correct answer and image for the correct answer
var triviaGame = [
    {
        question: "Who sold an aviation start-up called Aviato?",
        answers: ["Big Head", "Richard", "Erlich", "Jared"],
        correctAnswer: "Erlich",
        image: ("assets/images/erlich.gif")
    },

    {
        question: "What is the name of the website Richard is working on in the pilot episode?",
        answers: ["Green Archer", "Pied Piper", "Red Hood", "Green Arrow"],
        correctAnswer: "Pied Piper",
        image: ("assets/images/piedpiper.gif")
    },

    {
        question: 'Who said: "Most CEOs don’t have a best friend just hanging around"?',
        answers: ["Gilfoyle", "Richard", "Erlich", "Jared"],
        correctAnswer: "Jared",
        image: ("assets/images/jared.gif")
    },

    {
        question: "Who is revealed to be Canadian and gets himself a work visa?",
        answers: ["Gilfoyle", "Peter", "Jared", "Richard"],
        correctAnswer: "Gilfoyle",
        image: ("assets/images/gilfoyle.gif")
    },

    {
        question: 'Who said: "It’s weird having a girl in the house, it’s a very strange energy"?',
        answers: ["Big Head", "Richard", "Erlich", "Dinesh"],
        correctAnswer: "Dinesh",
        image: ("assets/images/dinesh.gif")
    }];

// Global variables
var correctTotal = 0;
var incorrectTotal = 0;
var unansweredTotal = 0;
var timeLeft = 20;
var timeInterim;
var interval;
var playerChoice = "";
var correctOption;
var currentQuestion = 0;

// function to start game by clicking the "start game" button
function initGame() {
    $("#start-game").click(function () {
        $("#question-section").show();
        $("#start-section").hide();
        createQuestion();
    })
}

// Function to get question and possible answers for that question 
function createQuestion() {
    // Get timer to show on page
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    runTimer();
    // Get question to show on page
    $("#trivia-question").html("<h3>" + triviaGame[currentQuestion].question + "</h3>");
    // Get the answers to show on page
    $("#answerA").html(triviaGame[currentQuestion].answers[0]);
    $("#answerB").html(triviaGame[currentQuestion].answers[1]);
    $("#answerC").html(triviaGame[currentQuestion].answers[2]);
    $("#answerD").html(triviaGame[currentQuestion].answers[3]);

    checkAnswer();
}

// Function to go to next question after player answers a question or time runs out
function nextQuestion() {
    $("#answer-section").hide();
    currentQuestion++;
    createQuestion();
}

// Functions to set the timer per question
// Function to run the timer
function runTimer() {
    interval = setInterval(timeUp, 1000);
}

// Function to set decrement, so we can run the timer function
function timeUp() {
    timeLeft--;
    // Get timer decrement to show on page
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    // When time gets down all the way to zero, timer stops 
    if (timeLeft === 0) {
        clearInterval(interval);
        // Number of unanswered questions increase by 1 and it shows page with time is up msg, correct answer and gif
        unansweredTotal++;
        $("#question-section").hide();
        $("#answer-section").show();
        $("#correct-answer").html("<h3>" + "Time is up! The correct answer is " + "<h3>");
        $("#answer-gif").html();
    }
}


// Function to get player's answer and check if it is correct or not
function checkAnswer() {
    $(".options").click(function () {
        playerChoice = $(this).text();
        console.log(playerChoice);
        clearInterval(interval);
        for (var i = 0; i < triviaGame.length; i++) {
            correctOption = triviaGame[i].correctAnswer;
            console.log(correctOption);
            if (playerChoice === correctOption) {
                correctTotal++;
                $("#correct-answer").html("<h3>" + "Good Job! You got it right!" + "</h3>");
                console.log("correct " + correctTotal);
            }
            else {
                incorrectTotal++;
                $("#correct-answer").html("<h3>" + "Sorry! The correct answer is " + correctOption + "!" + "</h3>");
                console.log(incorrectTotal);
            }
        }
       
        $("#question-section").hide();
        $("#answer-section").show();
        timeInterim = setTimeout(function () {
            $("#question-section").show()
        }, 5000);
    })
}
 
// function answeredCorrectly() {

// }

// function answeredIncorrectly() {

// }


// Function to show the stats and give an option to click on a reset button to play again after game is over
function gameOver() {
    $("#start-section").hide();
    $("#questions-section").hide();
    $("#answer-section").hide();
    $("#results-section").show();
    $("#correct-total").html("Correct answers: " + correctTotal);
    $("#incorrect-total").html("Incorrect answers: " + incorrectTotal);
    $("#unanswered-total").html("Unanswered answers: " + unansweredTotal);
}

// Function to reset and restart game when clicking "play again?" button
$("#play-again").click(function () {
    $("#Start-section").hide();
    $("#results-section").hide();
    $("#answer-section").hide();
    $("#questions-section").show();
    correctTotal = 0;
    incorrectTotal = 0;
    unansweredTotal = 0;
    timeLeft = 20;
    createQuestion();
    runTimer();
    checkAnswer();
})







/* Pseudo code:
 1) Start button to go to the first question (click event)
 2) once start button is clicked, start 30 second timer and show 1 question and 4 options - only one can be clicked (timer)
 3) once an answer is clicked, timer stops and evaluate if answer is correct or not (click event and win/lose function)
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