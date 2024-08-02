"use strict"

var gamePage = document.querySelector('.dataplay__game');

fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {
        
        const gameMaps = data.gamemaps;
        console.log(gameMaps);

        /*const sanAndreas = gameMaps[0];
        console.log(sanAndreas);

        let sanAndreasDiv = document.createElement('div');
        sanAndreasDiv.className = 'game__map';
        sanAndreasDiv.style.width = sanAndreas[1]*1000;
        gamePage.appendChild(sanAndreasDiv);*/
    });