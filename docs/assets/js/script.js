// Array with questions and answers
const Questionnaire = [
        {
            Qstn: "Commonly used data types DO NOT include:",
            Answers: [
                {Text: "Alerts", Status: true}, 
                {Text: "Strings", Status: false},
                {Text: "Booleans", Status: false},
                {Text: "Numbers", Status: false},
            ]
        },
        {
            Qstn: "The condition in an if / else statement is enclosed with _____.",
            Answers: [
                {Text: "Quotes", Status: false},
                {Text: "Curly brackets", Status: false},
                {Text: "Parenthesis", Status: true}, 
                {Text: "Square brackets", Status: false},
            ]
        },
        {
            Qstn: "Arrays in JavaScript can be used to store _____.",
            Answers: [
                {Text: "Numbers & strings", Status: false},
                {Text: "Other arrays", Status: false},
                {Text: "Booleans", Status: false},
                {Text: "All of the above", Status: true},
            ]
        },
        {
            Qstn: "String values must be enclosed within _____ when being assigned to variables.",
            Answers: [
                {Text: "Commas", Status: false},
                {Text: "Curly brackets", Status: false},
                {Text: "Quotes", Status: true},
                {Text: "Parenthesis", Status: false},
            ]
        },
        {
            Qstn: "A very useful tool used during development and debugging for printing content to the debugger is:",
            Answers: [
                {Text: "JavaScript", Status: false},
                {Text: "Terminal / Bash", Status: false},
                {Text: "for loops", Status: false},
                {Text: "console.log", Status: true},
            ]
        }
];

//Set variables
    // Block elements
    const Intro = document.querySelector("#intro-card");
    const Qstn = document.querySelector("#qstn");
    const Ending = document.querySelector("#ending");

    //Question elements
    const QstnTxt = document.querySelector("#qstn-txt");
    const AnswrTxt = document.querySelector(".answr-msg");
    const ErrorMsg = document.querySelector(".error-msg")

    // Buttons
    const StartBtn = document.querySelector("#start-btn");
    const BtnGrid = document.querySelector("#btn-grid");
    const SbmtBtn = document.querySelector("#hs-submit");

    // Other variables
    var FinalScore = document.querySelector("#final-score");
    var TimerElement = document.querySelector("#remaining-time");
    var Timer;
    var TimerCount;
    var CurrentQuestionIndex;

// Set starting conditions when page is loaded
function Init() {
    Qstn.style.display = "none";
    Ending.style.display = "none";
    TimerElement.textContent = 0;
}

// Called when user select correct answer
function RightAnswr() {
    AnswrTxt.style.display = "block";
    AnswrTxt.textContent = "Correct!";
}

//Called when user answers incorrectly
function WrongAnswr() {
    AnswrTxt.style.display = "block";
    AnswrTxt.textContent = "Incorrect!";
// Reduce timer by 10 seconds
    TimerCount = TimerCount -10;
    
}

function ShowQuestion() {
    // Replace question and answers with new ones
    ResetState()
    // Display the question
    var CurrentQuestion = Questionnaire[CurrentQuestionIndex];
    if(CurrentQuestionIndex > Questionnaire.length) {
        return
    }
    QstnTxt.textContent = CurrentQuestion.Qstn
    // Display the corresponding answers to the question
    CurrentQuestion.Answers.forEach(Answer => {
        const QstnBtn = document.createElement("button");
        QstnBtn.textContent = Answer.Text;
        QstnBtn.classList.add("btn", "qstn-btn");
        BtnGrid.appendChild(QstnBtn);
        if(Answer.Status) {
            QstnBtn.dataset.correct = Answer.Status;
        }
        QstnBtn.addEventListener("click", SelectAnswer);
    });
}

function ResetState() {
    if (CurrentQuestionIndex < Questionnaire.length) {
        while(BtnGrid.firstChild) {
            BtnGrid.removeChild(BtnGrid.firstChild)
        }
    } else {
        // Stop timer
        clearInterval(Timer);
        TimerElement.textContent = 0;
        // Set remaining time as Highscore
        FinalScore.textContent = TimerCount
        // If final score is less than 0, final score is displayed as 0
        if (TimerCount <= 0) {
            FinalScore.textContent = 0;
        }
        // Display "Ending" block element
        Qstn.style.display = "none";
        ErrorMsg.style.display = "none";
        Ending.style.display = "block";
    }
}

// Determine if answer selected is true or false
function SelectAnswer(e) {
    const SelectedBtn = e.target;
    const isCorrect = SelectedBtn.dataset.correct === "true";
    if (isCorrect) {
        RightAnswr();
        // Increase QuestionIndex to display next question
        CurrentQuestionIndex ++;
        ShowQuestion();
    } else {
        WrongAnswr();
        CurrentQuestionIndex ++;
        ShowQuestion();
    }
}

    function RunTimer() {
    //Starting conditions
    TimerElement.textContent = 75;
    TimerCount = 75;
    // Sets timer
Timer = setInterval(function() {
    TimerCount--;
    TimerElement.textContent = TimerCount;
    // Tests if time has run out
    if (TimerCount <= 0) {
    // Clear Timer
    clearInterval(Timer);
    // Reset timer to 0
    TimerElement.textContent = 0;
    Intro.style.display = "none";
    Qstn.style.display = "none";
    Ending.style.display = "block";
    FinalScore.textContent = 0;
    }
}, 1000);
}

function SubmitScore() {
    let ErrorMsg = document.querySelector(".error-msg")
    let Score = TimerCount;
    let Name = document.querySelector("#name-input").value;
    console.log (Name);
    localStorage.setItem("Score", Score)
    localStorage.setItem("Initials", Name)
    if (Name === "") {
        ErrorMsg.style.display = "block";
        ErrorMsg.textContent = "Please enter your Initials";
    } else {
        window.open("https://morkendi.github.io/Code-Quiz/highscores.html")
        window.location.reload();
    } 
}

function RunQuiz() {
    RunTimer();
    document.querySelector("main").style.display = "none";
    Intro.style.display = "none";
    Qstn.style.display = "block";
    AnswrTxt.style.display = "none";
    CurrentQuestionIndex = 0;
    ShowQuestion();
}

Init()
StartBtn.addEventListener("click", RunQuiz)
SbmtBtn.addEventListener("click", SubmitScore)