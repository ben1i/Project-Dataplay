
    var homePage = document.querySelector('.dataplay__home');
    var rulePage = document.querySelector('.dataplay__rules');
    var introPage = document.querySelector('.dataplay__intro');
    var gamePage = document.querySelector('.dataplay__game');

    const gameQuestions = document.querySelector('.game__questions');

    var warningMessage = document.querySelector('.home__warning');
    var warningOk = document.querySelector('.warning__ok');

    if (window.innerWidth < 700) {
        warningMessage.classList.remove('hidden');
    }

    warningOk.addEventListener('click', function() {
        warningMessage.classList.add('hidden');
    });

    function scrollPage(pixels, duration) {
        let start = window.scrollY;
        let end = start + pixels;
        let startTime = null;
    
        function animateScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            let elapsedTime = timestamp - startTime;
            let progress = Math.min(elapsedTime / duration, 1);
            let scrollAmount = start + (pixels * progress);
    
            window.scrollTo(0, scrollAmount);
    
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, end);
            }
        }
    
        requestAnimationFrame(animateScroll);
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
    var searchQuestion = 1;
    var sectionHeight;
    var sectionTime;
    var userTime;

    var mobileHeight = [];
    var mobileTime = [2822, 3154, 3490, 3695, 3772, 3875, 3901, 3901, 4106, 4569, 5158, 5340, 5800, 6417, 7419, 7626, 7883, 8626, 8783, 11093, 11761, 12097, 12123, 13405, 15155, 17159, 18079, 17878, 28130, 28438, 35247, 51743, 54079, 56468, 156008, 667312, 1000046, 1153102, 5372096, 8994655, 137942959, 137942959, 137942959];

    radio1Div.addEventListener('click', function() {
        if (!radio1.checked) {
            radio1.checked = true;
            checkAnswer(radio1, radio2); // Appelle checkAnswer seulement une fois
        }
    });

    radio2Div.addEventListener('click', function() {
        if (!radio2.checked) {
            radio2.checked = true;
            checkAnswer(radio1, radio2); // Appelle checkAnswer seulement une fois
        }
    });

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function QuestionSearcher() {

        radio1.checked = false;
        radio2.checked = false;

        if (searchQuestion >= gameMaps.length) {
            return;
        }

        console.log(searchQuestion);
    
        gameQuestions.classList.remove('hidden');

        randomNum = getRandomIntInclusive(0, 4);

        questionPrompt = gameMaps[searchQuestion][2][randomNum][0];
        questionAnswer = gameMaps[searchQuestion][2][randomNum][1];

        QuestionText.textContent = questionPrompt;
    }

    function checkAnswer(radio1, radio2) {
        if (radio1.checked || radio2.checked) {
            if ((radio1.checked && questionAnswer === 1) || (radio2.checked && questionAnswer === 0)) {
                userAnswer = 1;
                console.log('correct');
            } else {
                userAnswer = 0;
                console.log('incorrect');
            }

            radio1.checked = false;
            radio2.checked = false;

            gameQuestions.classList.add('hidden');

            sectionHeight = mobileHeight[searchQuestion] || 0; // Valeur par défaut pour éviter les erreurs
            sectionTime = mobileTime[searchQuestion] || 0;

            userTime = userAnswer === 1 ? sectionTime / 2 : sectionTime;

            scrollPage(sectionHeight, userTime);

            setTimeout(function() {
                searchQuestion = searchQuestion + 1;
                if (searchQuestion < gameMaps.length) {
                    QuestionSearcher();
                }
            }, userTime + 100);
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

                for (let i = 1; i < 43; i++) {
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

                    if (window.innerWidth < 1200) {
                        mobileHeight[i] = (gameDiv.offsetHeight) + 200;
                    } else {
                        mobileHeight[i] = (gameDiv.offsetHeight) + 400;
                    }
                    
                    console.log(mobileHeight[i]);
                }

                let rocketleagueDiv = document.querySelector('.game__league');
                if (rocketleagueDiv) {
                    if (window.innerWidth < 1200) {
                        var rocketLeagueHeight = (rocketleagueDiv.offsetHeight) + 220;
                    } else {
                        var rocketLeagueHeight = (rocketleagueDiv.offsetHeight) + 400;
                    }
                    
                    scrollPage(rocketLeagueHeight, 2000);
                }

                setTimeout(function() {
                    QuestionSearcher();
                }, 2000);
            });
        });
