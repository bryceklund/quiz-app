let progress = 0;
let score = 0;

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
    $('.answer').prop('disabled', true);
    score += 1;
}

function handleIncorrectAnswer(answer) {
    console.log('`handleIncorrectAnswer` is running...');
    $(answer).addClass('answer-incorrect');
    $(answer).removeClass('answer');
    $('.answer').prop('disabled', true);
    $(STORE[progress]["correct"]) //need to highlight the correct answer. maybe need to implement an id systems????
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
    //returns score at the end of the quiz
}

function restartQuiz() {
    //restarts quiz when restart button is clicked
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
    progressCounter();
    renderQuestion();
    renderAnswers();
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
}

function handleBeginClicks() {
    console.log('`handleBeginClicks` is running...');
    //starts the quiz
    $('.begin').click(function() {
        console.log('starting quiz...');
        startQuiz();
    });
}

function initializeQuiz () {
    mainToIntroMode();
    handleBeginClicks();
}

$(initializeQuiz);