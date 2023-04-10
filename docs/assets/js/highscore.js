// Declare variables
// "Clear high scores" button
const EraseBtn = document.querySelector("#erase");

//Print data stored in local Storage
const GetName = localStorage.getItem ("Initials");
let GetScore = localStorage.getItem ("Score");

let ScoreList = document.querySelector("#score-list")

function EraseHS() {
ScoreList.removeChild(ScoreList.firstChild)
}

function AddScore() {
        let ScoreSbmt = document.createElement("p");
        if (GetScore <= 0) {
                GetScore = 0;
        }
        ScoreSbmt.textContent = GetName + " - " + GetScore;
        ScoreSbmt.classList.add("show-score");
        ScoreList.appendChild(ScoreSbmt)
}

AddScore()
EraseBtn.addEventListener("click", EraseHS)