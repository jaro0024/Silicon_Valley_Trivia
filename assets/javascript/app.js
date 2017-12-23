
// Ready function
$(function () {
    showSection(showStart);
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
        question: "Who said: 'Most CEOs don’t have a best friend just hanging around'?",
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
        question: "Who said: 'It’s weird having a girl in the house, it’s a very strange energy'?",
        answers: ["Big Head", "Richard", "Erlich", "Dinesh"],
        correctAnswer: "Dinesh",
        image: ("assets/images/dinesh.gif")
    }];

// Global variables
var sectionId = "";
var showStart = $("#start-section");
var showQuestion = $("#question-section");
var showAnswer = $("#answer-section");
var showResults = $("#results-section");
var correctTotal = 0;
var incorrectTotal = 0;
var unansweredTotal = 0;
var timeLeft = 20;
var interval;
var playerChoice = "";
var correctOption;
var currentQuestion = 0;

// To show the section needed
function showSection(sectionId) {
    //Hide all sections
    showStart.hide();
    showQuestion.hide();
    showAnswer.hide();
    showResults.hide();
    // Show only the choosen section
    if (sectionId) {
        sectionId.show();
    }
}

// Button to start game - when clicked it will show first question
$("#start-game").click(function () {
    showSection(showQuestion);
    createQuestion();
})

// Function to get first question and possible answers for that question 
function createQuestion() {
    // Get timer to show on page and run the timer function
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    runTimer();
    // Get question to show on page
    $("#trivia-question").html("<h3>" + triviaGame[currentQuestion].question + "</h3>");
    // Get the answers to show on page
    $("#answerA").html(triviaGame[currentQuestion].answers[0]);
    $("#answerB").html(triviaGame[currentQuestion].answers[1]);
    $("#answerC").html(triviaGame[currentQuestion].answers[2]);
    $("#answerD").html(triviaGame[currentQuestion].answers[3]);
}

// Function to create and run the timer
function runTimer() {
    clearInterval(interval);
    interval = setInterval(timeUp, 1000);
}

// Function to set countdown, so we can run the timer function
function timeUp() {
    timeLeft--;
    // Get timer countdown to show on page
    $("#timer").html("<h3>" + "Time remaining: " + timeLeft + "</h3>");
    // When time gets down all the way to zero, timer stops 
    if (timeLeft <= 0) {
        clearInterval(interval);
        // Number of unanswered questions increase by 1 and it shows page with "time is up" message, correct answer and gif
        unansweredTotal++;
        console.log(unansweredTotal);
        showSection(showAnswer);
        $("#correct-answer").html("<h3> Time is up! </h3>" + "<h3> The correct answer is " + triviaGame[currentQuestion].correctAnswer + "!" + "<h3>");
        $("#answer-gif").html('<img class="gifs" src="' + triviaGame[currentQuestion].image + '"/>');
    }
}

// Function to go to next question after player answers a question or time runs out
function nextQuestion() {
    currentQuestion++;
    timeLeft = 20;
    createQuestion();
}

// Function to get player's answer and check if it is correct or not
$(".options").click(function () {
    playerChoice = $(this).text();
    console.log(playerChoice);
    clearInterval(interval);
    correctOption = triviaGame[currentQuestion].correctAnswer;
    console.log(correctOption);
    // If player's choice is correct, run the function for answered correctly. Else, it will run the function for answered incorrectly
    if (playerChoice === correctOption) {
        answeredCorrectly();
    }
    else {
        answeredIncorrectly();
    }
})

// If player guesses correctly, correct total increases by 1 and it shows page with "you got it right" message and gif
function answeredCorrectly() {
    correctTotal++;
    console.log(correctTotal);
    showSection(showAnswer);
    $("#correct-answer").html("<h3> Awesome! </h3>" + "<h3> You got it right!</h3>");
    $("#answer-gif").html('<img class="gifs" src="' + triviaGame[currentQuestion].image + '"/>');
}

// If player guesses incorrectly, incorrect total increases by 1 and it shows page with "sorry" message, correct answer and gif
function answeredIncorrectly() {
    incorrectTotal++;
    console.log(incorrectTotal);
    showSection(showAnswer);
    $("#correct-answer").html("<h3> Bummer! </h3>" + "<h3> The correct answer is " + triviaGame[currentQuestion].correctAnswer + "!" + "</h3>");
    $("#answer-gif").html('<img class="gifs" src="' + triviaGame[currentQuestion].image + '"/>');
}

// Button to move to next question
$("#next").click(function () {
    showSection(showQuestion);
    // If not last question, move to next question when clicked
    if (currentQuestion < triviaGame.length - 1) {
        nextQuestion();
    }
    // If last question, show results page
    else {
        results();
    }
    // If statement to change text on the button of last question answered
    if (currentQuestion === triviaGame.length - 1) {
        $("#next").text("GET RESULTS");
    }
})


// Function to show the stats and give an option to click on a reset button to play again after game is over
function results() {
    showSection(showResults);
    $("#correct-total").html("<h3> Correct answers: " + correctTotal + "</h3>");
    $("#incorrect-total").html("<h3> Incorrect answers: " + incorrectTotal + "</h3>");
    $("#unanswered-total").html("<h3> Unanswered answers: " + unansweredTotal + "</h3>");
}

// Function to reset and restart game when clicking "play again?" button
$("#play-again").click(function () {
    showSection(showQuestion);
    currentQuestion = 0;
    correctTotal = 0;
    incorrectTotal = 0;
    unansweredTotal = 0;
    timeLeft = 20;
    createQuestion();
    runTimer();
})
