"use strict"


var gamePage = document.querySelector('.dataplay__game');

/*function smoothScroll(pixels, duration) {
    let start = window.scrollY;
    let end = start + pixels;
    let startTime = performance.now();

    // Fonction d'interpolation ease-in-out
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateScroll(currentTime) {
        // Calcul du temps écoulé
        let elapsedTime = currentTime - startTime;
        let progress = Math.min(elapsedTime / duration, 1); // Progression de 0 à 1
        let easedProgress = easeInOutQuad(progress);
        let scrollAmount = start + (pixels * easedProgress);

        window.scrollTo(0, scrollAmount);

        // Continuer l'animation jusqu'à ce que la durée soit écoulée
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            // S'assurer que la page est bien à la position finale
            window.scrollTo(0, end);
        }
    }

    // Démarrer l'animation
    requestAnimationFrame(animateScroll);
}*/

/*
// Vitesse de défilement en pixels par milliseconde
var vitesseDefilement = 1;

// Sélectionner toutes les sections de la page
var sections = gamePage.querySelectorAll('div');

// Index de la section actuellement en cours de défilement
var sectionIndex = 0;

// Fonction de défilement
function defilementAutomatique() {
    if (sectionIndex < sections.length) {
        // Obtenez la position de la section suivante
        var sectionTop = sections[sectionIndex].offsetTop;

        // Défilement de la page vers la section suivante
        window.scrollBy(0, vitesseDefilement);

        // Vérifiez si le bas de la page ou le haut de la section est atteint
        if (window.scrollY >= sectionTop) {
            clearInterval(intervalId); // Arrête le défilement
            sectionIndex++; // Passe à la section suivante

            // Redémarrer le défilement après un délai (par exemple 2 secondes)
            if (sectionIndex < sections.length) {
                setTimeout(function() {
                    intervalId = setInterval(defilementAutomatique, 10);
                }, 2000); // 2000 ms = 2 secondes
            }
        }
    }
}

// Démarrer le défilement après 1 seconde (1000 ms)
var intervalId = setInterval(defilementAutomatique(), 10); // 10 ms pour un défilement fluide
*/




fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        
        const gameMaps = data.gamemaps;

        for (var i = 0; i<43; i++) {
            
            const games = gameMaps[i];
            
            const currentGame = games[0];
            const currentGameSize = games[1];
            const currentGameSizeScale = currentGameSize*5.000000000162988224 + "px";
            const currentGameSizeScaleString = currentGameSizeScale.toString();
            
            let gameDiv = document.createElement('div');
            gameDiv.classList.add('game__test');
            gameDiv.classList.add('game__test--' + i);
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
            gameSquare.style.height = currentGameSizeScaleString;
        }

        /*const sanAndreas = gameMaps[0];
        console.log(sanAndreas);

        const sanAndreasName = sanAndreas[0];
        const sanAndreasSize = sanAndreas[1];
        const sanAndreasSiteSize = sanAndreasSize*500.0000000162988224 + "px";
        const sanAndreasSizeString = sanAndreasSiteSize.toString();
        console.log (sanAndreasSiteSize, sanAndreasSizeString);

        let sanAndreasDiv = document.createElement('div');
        sanAndreasDiv.className = 'game__test';
        gamePage.appendChild(sanAndreasDiv);

        let sanAndreasText1 = document.createElement('p');
        sanAndreasText1.className = 'test__paragraph'
        sanAndreasText1.textContent = sanAndreasName;
        sanAndreasDiv.appendChild(sanAndreasText1);

        let sanAndreasText2 = document.createElement('p');
        sanAndreasText2.className = 'test__paragraph'
        sanAndreasText2.textContent = sanAndreasSize + "km²";
        sanAndreasDiv.appendChild(sanAndreasText2);

        let sanAndreasSquareDiv = document.createElement('div');
        sanAndreasSquareDiv.className = 'test__testsquare';
        sanAndreasDiv.appendChild(sanAndreasSquareDiv);

        let sanAndreasSquare = document.createElement('div');
        sanAndreasSquare.className = 'testsquare__form';
        sanAndreasSquareDiv.appendChild(sanAndreasSquare);
        sanAndreasSquare.style.height = sanAndreasSizeString;*/
        
    });