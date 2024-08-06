"use strict"

var gamePage = document.querySelector('.dataplay__game');

fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        
        const gameMaps = data.gamemaps;

        for (let i = 0; i<43; i++) {
            
            const games = gameMaps[i];
            
            const currentGame = games[0];
            const currentGameSize = games[1];
            const currentGameSizeScale = currentGameSize*500.0000000162988224 + "px";
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
            gameSize.classList.add('test__paragraph');
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