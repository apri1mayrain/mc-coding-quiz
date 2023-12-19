// DOM Element Selectors
var highscoresEl = document.querySelector('#highscores');
var clearBtn = document.querySelector('#clear');

// Show Highscores:
// sort highscores and create highscore list
function showHighscores() {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.sort(function(a, b){
    return b.score - a.score;
    });
    highscores.forEach(function(score){
    var listEl = document.createElement("li");
    listEl.textContent = 'Player: ' + score.initals + " - Score: " + score.score;
    highscoresEl.appendChild(listEl);
    });
}

// Clear Highscores:
// clear highscores on button click
clearBtn.addEventListener("click", function (event) {
    localStorage.clear();
    location.reload();
});

// Call to show highscores
showHighscores();