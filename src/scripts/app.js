"use strict"

$(document).ready(function() {
    var movienumbers = [ 1, 2, 3, 4, 5 ];
    var slotsnumbers = [ 1, 2, 3, 4, 5 ];
    
    movienumbers.sort(function() {
        return Math.random() - 0.5;
    });

    var cardcontainer = document.querySelector('.answer');

    movienumbers.forEach(function(number){
        const card = createCard(number);
        cardcontainer.appendChild(card);        

    })
 

    function createCard(number) {
        var card = document.createElement('div');
        card.classList.add('answer__card');
        card.textContent = 'carte' + number;
        card.setAttribute("data-number", number);

        return card;

    }
    $(".answer__card").draggable();


    $(".rank__slot").each(function(index){
        $(this).data('number',slotsnumbers[index]);
        $(this).droppable({
            accept: ".answer__card",
            drop: handledrop
        });
    }) 
    function handledrop(event, ui){
        var slotNumber = $(this).data('number');
        var cardNumber = ui.draggable.data('number');
        console.log(slotNumber, cardNumber)

        if (slotNumber === cardNumber){
            console.log('correct')
        }else{
            console.log('incorrect')
        }

    }

    /*$(".rank__slot").droppable({
        accept: ".answer__card", // Accepter seulement les cartes pour le drop
        drop: function(event, ui) {
            var slotNumber = $(this).data('number'); // Numéro de l'emplacement
            var cardNumber = ui.draggable.data('number'); // Numéro de la carte droppée
            
            // Vérifier si la carte droppée est dans le bon emplacement
            if (slotNumber === cardNumber) {
                // La carte est dans le bon emplacement
                console.log('correct')
                $(this).addClass('correct');
                ui.draggable.addClass('correct').draggable('disable'); // Marquer la carte comme correcte et la désactiver
            } else {
                // La carte est dans le mauvais emplacement
                console.log('incorrect')
                $(this).addClass('incorrect');
                ui.draggable.addClass('incorrect');
            }
        }
    });*/
});

var score;
var life = 3;

var posterContainer = document.querySelector('.test__img');
var posterImage = posterContainer.querySelector('img');

var posters = ["alien.jpg", "blairwitch.jpg", "carrie.jpg", "dawnofthedead.jpg", "elmstreet.jpg", "exorcist.jpg", "halloween.jpg", "hellraiser.jpg", "it.jpg", "jaws.jpg", "nightofthelivingdead.jpg", "omen.jpg", "psycho.jpg", "rosemarysbaby.jpg", "shining.jpg", "suspiria.jpg", "texaschainsawmassacre.jpg", "theevildead.jpg", "thering.jpg", "thething.jpg"];

var testText = document.querySelector('.test__text');

var startButton = document.querySelector('.selection__button--1');
var homeSection = document.querySelector('.home');

var questionsSection = document.querySelector('.jeu');
var rankGame = document.querySelector('.rank');
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
                rankGame.classList.remove('hidden');

                var cheminsAudio = data.musics;
                var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
                var Ambianceaudio = new Audio(cheminAleatoire);
                Ambianceaudio.loop = true;

                Ambianceaudio.play();

                var questionQcm = data.questions[0];
                var qcmChosenQuestion = questionQcm[Math.floor(Math.random() * questionQcm.length)];
                //qcmLabel.innerText = qcmChosenQuestion;
                
                var cheminsReponses = data.movies;
                
                
                var ReponseAleatoire1 = cheminsReponses[Math.floor(Math.random() * cheminsReponses.length)];
                var qcmAnswer1Name = document.querySelector('.answer__text--1');
                //qcmAnswer1Name.innerText = ReponseAleatoire1[0];

                var ReponseAleatoire2 = cheminsReponses[Math.floor(Math.random() * cheminsReponses.length)];
                var qcmAnswer2Name = document.querySelector('.answer__text--2');
                //qcmAnswer2Name.innerText = ReponseAleatoire2[0];

                var ReponseAleatoire3 = cheminsReponses[Math.floor(Math.random() * cheminsReponses.length)];
                var qcmAnswer3Name = document.querySelector('.answer__text--3');
                //qcmAnswer3Name.innerText = ReponseAleatoire3[0];

                var ReponseAleatoire4 = cheminsReponses[Math.floor(Math.random() * cheminsReponses.length)];
                var qcmAnswer4Name = document.querySelector('.answer__text--4');
                //qcmAnswer4Name.innerText = ReponseAleatoire4[0];

                if (qcmChosenQuestion === questionQcm[0]) {
                    var qcmAnswer1BoxOffice = ReponseAleatoire1[1];
                    var qcmAnswer2BoxOffice = ReponseAleatoire2[1];
                    var qcmAnswer3BoxOffice = ReponseAleatoire3[1];
                    var qcmAnswer4BoxOffice = ReponseAleatoire4[1];

                    var validAnswer = qcmAnswer1BoxOffice;

                    if (qcmAnswer2BoxOffice > validAnswer) {
                        validAnswer = qcmAnswer2BoxOffice;
                    }

                    if (qcmAnswer3BoxOffice > validAnswer) {
                        validAnswer = qcmAnswer3BoxOffice;
                    }

                    if (qcmAnswer4BoxOffice > validAnswer) {
                        validAnswer = qcmAnswer4BoxOffice;
                    }

                    console.log(validAnswer);
                }
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

