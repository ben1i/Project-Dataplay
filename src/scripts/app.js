var homePage = document.querySelector('.dataplay__home');
var rulePage = document.querySelector('.dataplay__rules');
var introPage = document.querySelector('.dataplay__intro');
var gamePage = document.querySelector('.dataplay__game');

const gameQuestions = document.querySelector('.game__questions');

function scrollPage(pixels, duration) {
    let start = window.scrollY;
    let end = start + pixels;
    let startTime = Date.now();
    let intervalTime = 16; // Environ 60 FPS

    function animateScroll() {
        let now = Date.now();
        let elapsedTime = now - startTime;
        let progress = Math.min(elapsedTime / duration, 1);
        let scrollAmount = start + (pixels * progress);

        window.scrollTo(0, scrollAmount);

        if (progress < 1) {
            setTimeout(animateScroll, intervalTime);
        } else {
            window.scrollTo(0, end);
        }
    }

    animateScroll();
}

const radio1 = document.querySelector('.answer__radio--1');
const radio2 = document.querySelector('.answer__radio--2');
const radio1Div = document.querySelector('.answers__answer--1');
const radio2Div = document.querySelector('.answers__answer--2');

const QuestionText = document.querySelector('.questions__question');
var userAnswer;
var randomNum;
var questionPrompt;
var questionAnswer;
var gameMaps;
var searchQuestion = 1;  // Commencer à 1 pour la question sur San Andreas
var sectionHeight;
var sectionTime;
var userTime;

var mobileHeight = [];
var mobileTime = [2822, 3154, 3490, 3695, 3772, 3875, 3901, 3901, 4106, 4569, 5158, 5340, 5800, 6417, 7419, 7626, 7883, 8626, 8783, 11093, 11761, 12097, 12123, 13405, 15155, 17159, 18079, 17878, 28130, 28438, 35247, 51743, 54079, 56468, 156008, 667312, 1000046, 1153102, 5372096, 8994655, 137942959, 137942959, 137942959];

radio1Div.addEventListener('click', function() {
    if (!radio1.checked) {
        radio1.checked = true;
        checkAnswer(); // Appelle checkAnswer seulement une fois
    }
});

radio2Div.addEventListener('click', function() {
    if (!radio2.checked) {
        radio2.checked = true;
        checkAnswer(); // Appelle checkAnswer seulement une fois
    }
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function QuestionSearcher() {
    if (searchQuestion >= gameMaps.length) {
        return; // Évitez les dépassements d'index
    }

    console.log(searchQuestion);
    
    gameQuestions.classList.remove('hidden');

    randomNum = getRandomIntInclusive(0, 4);

    questionPrompt = gameMaps[searchQuestion][2][randomNum][0];
    questionAnswer = gameMaps[searchQuestion][2][randomNum][1];

    QuestionText.textContent = questionPrompt;
}

function checkAnswer() {
    if (radio1.checked || radio2.checked) {
        if ((radio1.checked && questionAnswer === 1) || (radio2.checked && questionAnswer === 0)) {
            userAnswer = 1;
        } else {
            userAnswer = 0;
        }

        radio1.checked = false;
        radio2.checked = false;

        gameQuestions.classList.add('hidden');

        // Assurez-vous que les hauteurs sont calculées correctement pour la section suivante
        sectionHeight = mobileHeight[searchQuestion] || 0; // Valeur par défaut pour éviter les erreurs
        sectionTime = mobileTime[searchQuestion] || 0;

        // Déterminez le temps de défilement
        userTime = userAnswer === 1 ? sectionTime / 2 : sectionTime;

        // Assurez-vous que le défilement se fait correctement
        scrollPage(sectionHeight, userTime);

        // Incrémenter la question après le défilement
        setTimeout(function() {
            searchQuestion = searchQuestion + 1;
            if (searchQuestion < gameMaps.length) {
                QuestionSearcher();
            }
        }, userTime + 100); // Ajouter un léger délai pour s'assurer que la question suivante est chargée correctement
    }
}

fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        gameMaps = data.gamemaps;

        var ruleButton = homePage.querySelector('.buttons__button--rules');
        ruleButton.addEventListener('click', function() {
            homePage.classList.add('hidden');
            rulePage.classList.remove('hidden');
        });

        var introButton = homePage.querySelector('.buttons__button--play');
        introButton.addEventListener('click', function() {
            homePage.classList.add('hidden');
            introPage.classList.remove('hidden');
        });

        var homeButton = rulePage.querySelector('.button__home');
        homeButton.addEventListener('click', function() {
            rulePage.classList.add('hidden');
            homePage.classList.remove('hidden');
        });

        var playButton = introPage.querySelector('.button__continue');
        playButton.addEventListener('click', function() {
            introPage.classList.add('hidden');
            gamePage.classList.remove('hidden');

            // Boucle commence à i = 1 pour la création des jeux
            for (let i = 1; i < gameMaps.length; i++) {
                const games = gameMaps[i];
                const currentGame = games[0];
                const currentGameSize = games[1];
                const currentGameSizeScale = currentGameSize * 5.000000000162988224 + "px";

                let gameDiv = document.createElement('div');
                gameDiv.classList.add('game__test', 'game__test--' + i);
                gamePage.appendChild(gameDiv);

                let gameName = document.createElement('p');
                gameName.classList.add('test__paragraph');
                gameName.textContent = currentGame;
                gameDiv.appendChild(gameName);

                let gameSize = document.createElement('p');
                gameSize.classList.add('test__paragraph', 'test__paragraph--bottom');
                gameSize.textContent = currentGameSize + "km²";
                gameDiv.appendChild(gameSize);

                let gameSquareDiv = document.createElement('div');
                gameSquareDiv.classList.add('test__testsquare');
                gameDiv.appendChild(gameSquareDiv);

                let gameSquare = document.createElement('div');
                gameSquare.classList.add('testsquare__form');
                gameSquareDiv.appendChild(gameSquare);
                gameSquare.style.height = currentGameSizeScale;

                mobileHeight[i] = (gameDiv.offsetHeight) + 200;
            }

            // Ajouter une vérification de la hauteur et du défilement de la section spécifique (exemple avec un élément particulier)
            let rocketleagueDiv = document.querySelector('.game__league');
            if (rocketleagueDiv) {
                let rocketLeagueHeight = (rocketleagueDiv.offsetHeight) + 200;
                scrollPage(rocketLeagueHeight, 2000);
            }

            setTimeout(function() {
                QuestionSearcher(); // Début des questions à l'index 1 (San Andreas)
            }, 2000);
        });
    });
