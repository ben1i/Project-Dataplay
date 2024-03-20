"use strict"

$(document).ready(function() {
    $(".answer__card").draggable();
});

var score;
var life = 3;

var posterContainer = document.querySelector('.test__img');
var posterImage = posterContainer.querySelector('img');

var posters = ["alien.jpg", "blairwitch.jpg", "carrie.jpg", "dawnofthedead.jpg", "elmstreet.jpg", "exorcist.jpg", "halloween.jpg", "hellraiser.jpg", "it.jpg", "jaws.jpg", "nightofthelivingdead.jpg", "omen.jpg", "psycho.jpg", "rosemarysbaby.jpg", "shining.jpg", "suspiria.jpg", "texaschainsawmassacre.jpg", "theevildead.jpg", "thering.jpg", "thething.jpg"];

var testText = document.querySelector('.test__text');

var startButton = document.querySelector('.selection__button--1');
var homeSection = document.querySelector('.home');

var questionsSection = document.querySelector('.questions');
var qcmLabel = document.querySelector('.questions__question');
var qcmAnswer1 = document.querySelector('.questions__answer--1');
var qcmAnswer2 = document.querySelector('.questions__answer--2');
var qcmAnswer3 = document.querySelector('.questions__answer--3');
var qcmAnswer4 = document.querySelector('.questions__answer--4');

var collectionButton = document.querySelector('.selection__button--3');


fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {

        const Sense = data.movies[1];
        console.log(Sense[0]);

        const Sounds = data.sounds;
        collectionButton.addEventListener('mouseenter', function() {
            const hoverAudio = new Audio(Sounds[1]);
            hoverAudio.play()
        })
        startButton.addEventListener('mouseenter', function() {
            const hoverAudio = new Audio(Sounds[1]);
            hoverAudio.play()
        })

        startButton.addEventListener('click', function() {
            score = 0;
            homeSection.classList.add('home--animation');

            const startAudio = new Audio(Sounds[0]);
            startAudio.play();
            
            setTimeout(function() {
                homeSection.classList.add('hidden');
                questionsSection.classList.remove('hidden');

                var cheminsAudio = data.musics;
                var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
                var Ambianceaudio = new Audio(cheminAleatoire);
                Ambianceaudio.loop = true;

                Ambianceaudio.play();

                var questionQcm = data.questions.qcm;
                qcmLabel.innerText = questionQcm[Math.floor(Math.random() * questionQcm.length)];
            }, 4860);

            if (score === 10) {
                const cheminPoster = choisirPosterAleatoire();
                afficherPoster(cheminPoster);
                console.log(cheminPoster);
                if (cheminPoster === "./assets/images/basic/alien.jpg") {
                    localStorage.setItem("Alien", "Y");
                    testText.classList.remove('hidden');
                    posterImage.alt = "Poster de Alien (1979)";
                }
            }
            
            if (score === 20) {
                const cheminPoster = choisirPosterShinyAleatoire();
                afficherShinyPoster(cheminPoster);
                if (cheminPoster === "./assets/images/shiny/alien.jpg") {
                    localStorage.setItem("AlienShiny", "Y");
                }
            }
            
            /*var Alien = localStorage.getItem("Alien")
            if (Alien === "Y") {
                posters.slice('alien.jpg');
            }*/
        })
      });


function getRandomIntInclusive(min,max) {
    min= Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function choisirPosterAleatoire() {
    const cheminDossier = "./assets/images/basic";
     // Liste des noms de fichiers de vos images
    const indexAleatoire = Math.floor(Math.random() * posters.length);
    const posterChoisi = posters[indexAleatoire];
    const cheminPoster = `${cheminDossier}/${posterChoisi}`;

    return cheminPoster;
}

function choisirPosterShinyAleatoire() {
    const cheminDossier = "./assets/images/shiny";
    const posters = ["alien.jpg", "poster2.jpg", "poster3.jpg"]; // Liste des noms de fichiers de vos images

    const indexAleatoire = Math.floor(Math.random() * posters.length);
    const posterChoisi = posters[indexAleatoire];
    const cheminPoster = `${cheminDossier}/${posterChoisi}`;

    return cheminPoster;
}

function afficherPoster(cheminPoster) {
    posterImage.src = cheminPoster;
}

function afficherShinyPoster(cheminPoster) {
    posterImage.src = cheminPoster;

}

if (score === 10) {
    const cheminPoster = choisirPosterAleatoire();
    afficherPoster(cheminPoster);
    console.log(cheminPoster)
    if (cheminPoster === "./assets/images/basic/alien.jpg") {
        localStorage.setItem("Alien", "Y");
        testText.classList.remove('hidden');
        posterImage.alt = "Poster de Alien (1979)"
    }
}

if (score === 20) {
    const cheminPoster = choisirPosterShinyAleatoire();
    afficherShinyPoster(cheminPoster);
    if (cheminPoster === "./assets/images/shiny/alien.jpg") {
        localStorage.setItem("AlienShiny", "Y");
    }
}

var Alien = localStorage.getItem("Alien")

if (Alien === "Y") {
    posters.slice('alien.jpg');
}

