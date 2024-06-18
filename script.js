// Fisher-Yates shuffle algorithm
function shuffle(anyList)
{
    for(let i = anyList.length - 1; i > 0; i--)
    {
        // pick a random index for the second last element 
        const j = Math.floor(Math.random() * (i + 1));
        [anyList[i], anyList[j]] = [anyList[j], anyList[i]];
    }
    return anyList;
}





// Initialize data storage
const quizData = [
    {
        question : "Where did mochi originate from?",
        options : ["Italy", "Ohio", "Japan", "China"],
        answer: "Japan"
    },

    {
        question : "Which one of the following is a local food in Singapore?",
        options : ["Squid", "Mango sticky rice", "Risotto", "Chilli Crab"],
        answer: "Chilli Crab"
    },

    {
        question : "Where does Dim sum come from?",
        options : ["France", "Singapore", "Taiwan", "China"],
        answer: "China"
    },

    {
        question : "Where do Croissants originate from?",
        options : ["France", "US", "Greece", "Qatar"],
        answer: "France"
    },

    {
        question : "How many kinds of pasta are there?",
        options : ["137", "250", ">300", "200"],
        answer: ">300"
    },
];

const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('timerText');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsContainer = document.getElementById('option-container');
const resultElement = document.getElementById('result');
const timerSettings = document.getElementById('timer-settings');
const timerSettingsLabel = document.getElementById('timer-settings-label');
const feedbackLabel = document.getElementById('feedback');


// Initialize progress bar to 0% before the quiz starts
progressBar.style.width = '0%';

startButton.addEventListener('click', startQuiz);

let current_index = 0;
let score = 0;
let countdownTime = parseInt(timerSettings.value);

// update countdown time when dropdown value changes
timerSettings.addEventListener('change', () => {
    countdownTime = parseInt(timerSettings.value);
    timerText.textContent = countdownTime;
});


function startQuiz()
{
    shuffle(quizData);
    startButton.style.display = 'none'; // to hide the start button
    timerSettings.style.display = 'none';
    timerSettingsLabel.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(current_index < quizData.length)
    {
        timerText.textContent = countdownTime;

        progressBar.style.width = `${((current_index + 1) / quizData.length) * 100}%`;

        const currentQuestionSet = quizData[current_index];
        questionElement.textContent = currentQuestionSet.question;

        // remove previous button clones
        optionsContainer.innerHTML = '';

        // Clone a button for each option
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsContainer.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        // create a timer object using setInterval() function
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer
                clearInterval(timer);
                showFeedback(null);

            }
        }, 1000);
    } else
    {
        endQuiz();
    }
}


function checkAnswer(option)
{
    const answer = quizData[current_index].answer;
    if(option === answer)
    {
        score++;
    }
    resultElement.textContent = `You scored ${score} point(s)`;
    //current_index++;
    //loadQuestion();
    clearInterval(timer);
    showFeedback(option);
}

function showFeedback(option)
{
    const currentQuizData = quizData[current_index];
    let feedback = "";

    if(option === currentQuizData.answer)
    {
        feedback = "Correct!";
    } else if (option === null)
    {
        feedback = `Time's up! The correct answer was ${currentQuizData.answer}.`;
    } else
    {
        feedback = `Incorrect! The correct answer was ${currentQuizData.answer}.`; 
    }

    feedbackLabel.textContent = feedback;

    setTimeout(() => {
        current_index++;
        loadQuestion();
        feedbackLabel.textContent = "";
    }, 3000);
}


function endQuiz()
{
    clearInterval(timer);

    progressBarContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    timerElement.style.display = 'none';
    feedbackLabel.textContent = "";
    questionElement.textContent = "Quiz has ended Hooray!";
}