let progress = 0;
let score = 0;
let endingMessage = "";


function progressCounter() {
    console.log('`progressCounter` is running...');
    //increments progress counter when called
    progress += 1;
}

function handleCorrectAnswer(answer) {
    //disabled other buttons, indicate correct answer in green, increment `score`
    console.log('`handleCorrectAnswer` is running...');
    $(answer).addClass('answer-correct');
    $(answer).removeClass('answer');
    $(answer).prop('disabled', true);
    $('.answer').prop('disabled', true);
    $('.answer').removeClass('answer:hover');
    score += 1;
    displayScoreAndProgress();
    $('main').append(`<p class="answer-feedback">Correct<br><button class="next">&gt;</button></p>`)
    handleNextClicks();

}

function handleIncorrectAnswer(answer) {
    console.log('`handleIncorrectAnswer` is running...');
    $(answer).addClass('answer-incorrect');
    $(answer).removeClass('answer');
    $('.answer').prop('disabled', true);
    $(answer).prop('disabled', true);
    $('main').append(`<p class="answer-feedback">Incorrect<br><button class="next">&gt;</button></p>`)
    handleNextClicks();

}

function handleAnswerClicks() {
    console.log('`handleAnswerClicks` is running...');
    //calls incorrect/correct answer functions
    $('.answer').click(function(event) {
        event.preventDefault();
        console.log($(event.currentTarget).html());
        if ($(event.currentTarget).html() == STORE[progress]["correct"]) {
            handleCorrectAnswer($(event.currentTarget));
        } else {
            handleIncorrectAnswer($(event.currentTarget));
        }
    });
}

function renderQuestion() {
    console.log('`renderQuestion` is running...');
    //renders the current question + set of answers
    $('main').html(`<p class="question">${STORE[progress]["question"]}</p>`);
}

function renderAnswers() {
    //displays the next set of answers
    console.log('`renderAnswers` is running...');
    $('main').append(`
    <form class="answers">
        <ul class="answers-list">
            <button class="answer">${STORE[progress]["answers"][0]}</button>
            <button class="answer">${STORE[progress]["answers"][1]}</button>
            <button class="answer">${STORE[progress]["answers"][2]}</button>
            <button class="answer">${STORE[progress]["answers"][3]}</button>
        </ul>
    </form>`);
    handleAnswerClicks();
}

function displayFinalScore() {
    console.log('`displayFinalScore` is running');
    //returns score at the end of the quiz
    mainToIntroMode();
    if (score > 8) {
        endingMessage = "Well done, nerd!";
    } else if (score > 6) {
        endingMessage = "Not bad, but not great either. Have you tried being better?";
    } else {
        endingMessage = "Yikes! Go watch a YouTube video or something!";
    }
    $('main').append(`<section class="ending-content">
    <p class='final-score'>Final score: ${score * 10}%</p>
    <p class="ending-message">${endingMessage}</p>
    <button class="try-again">Try Again?</button>
    </section>`);
    restartQuiz();
}

function restartQuiz() {
    //restarts quiz when restart button is clicked
    $('.try-again').click(function() {
        score = 0;
        progress = 0;
        startQuiz();
    });
}

function displayScoreAndProgress() {
    console.log('`displayScoreAndProgress` is running...');
    //displays and updates the player's score
    $('.score').text(`Score: ${score}`);
    $('.progress').text(`${progress + 1}/10`);
}


function startQuiz() {
    console.log('`startQuiz` is running...');
    //starts the first question of the quiz
    $('.intro-text').addClass('hidden');
    $('.score').removeClass('hidden');
    $('.progress').removeClass('hidden');
    renderQuestion();
    renderAnswers();
    displayScoreAndProgress();
}

function nextQuestion() {
    //increments the progress counter, updates the score, and displays new question/answers
    progressCounter();
    renderQuestion();
    renderAnswers();
    displayScoreAndProgress();
}

function clearAnswers() {
    console.log('`clearAnswers` is running...');
    //clears the current question and answers from the screen
    $('.answers-list').empty();
    $('.question').remove();
}

function mainToIntroMode () {
    console.log('`mainToIntroMode` is running...');
    //resets the quiz to its starting position
    clearAnswers();
    $('.intro-text').removeClass('hidden');
    $('.score').addClass('hidden');
    $('.progress').addClass('hidden');
    $('.answer-feedback').remove();
}

function handleBeginClicks() {
    console.log('`handleBeginClicks` is running...');
    //starts the quiz
    $('.begin').click(function() {
        console.log('starting quiz...');
        startQuiz();
    });
}

function handleNextClicks() {
    console.log('`handleNextClicks is running...');
    //moves the quiz forward when the 'next' button is clicked
        $('.next').click(function()  {
            if (progress == 9) {
                displayFinalScore();
            } else {
                nextQuestion();
            }
            
        });

}


function initializeQuiz () {
    mainToIntroMode();
    handleBeginClicks();
}

$(initializeQuiz);