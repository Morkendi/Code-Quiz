var Question1 = document.querySelector("#qstn-1")
var StartButton = document.querySelector("#start-button")

function StartQuiz() {
    Question1.style.display = "none";
}

StartButton.addEventListener ("click", StartQuiz)