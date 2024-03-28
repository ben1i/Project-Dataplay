"use strict"
/*drag and drop*/

    var movienumbers = [ 1, 2, 3, 4, 5 ];
    var slotsnumbers = [ 1, 2, 3, 4, 5 ];
    
    movienumbers.sort(function() {
        return Math.random() - 0.5;
    });

    var cardcontainer = document.querySelector('.answer');

    //movienumbers.forEach(function(number){
        //const card = createCard(number);
        //cardcontainer.appendChild(card);        

    //})

    function createCard(number, cheminNombre) {
        var card = document.createElement('div');
        card.classList.add('answer__card');
        card.textContent = number;
        card.setAttribute("data-number", cheminNombre);
         $(card).draggable();
        return card;

    }

    function slotNumber(slotsnumbers) {
        $(".rank__slot").each(function(index){
            $(this).data('number',slotsnumbers[index]);
            $(this).droppable({
                accept: ".answer__card",
                drop: handledrop
            });
        })
    }

    var cardNumbersArray = [];

    function handledrop(event, ui){
        var slotNumber = $(this).data('number');
        var cardNumber = ui.draggable.data('number');

        if (cardNumber === slotNumber) {
            cardNumbersArray.push(cardNumber);

        }
    }

    /*$('#validerBtn').click(function() {
        // Stockez les valeurs de cardNumber dans cardNumberArray
        cardNumbersArray.forEach(function(cardNumber) {
            cardNumbersArrayArray.push(cardNumber);
        })
    });*/

    $(".answer__card").hover(function(){
        $(".rank").toggleClass("hovered")
    })

    /*radio multipe*/
    var choice1 = document.querySelector('.multipleform__option--1');
    var choice2 = document.querySelector('.multipleform__option--2');
    var choice3 = document.querySelector('.multipleform__option--3');
    var choice4 = document.querySelector('.multipleform__option--4');
    var label1 = document.querySelector('.multipleform__label--1');
    var label2 = document.querySelector('.multipleform__label--2');
    var label3 = document.querySelector('.multipleform__label--3');
    var label4 = document.querySelector('.multipleform__label--4');
    var radio1 = document.getElementById('1');
    var radio2 = document.getElementById('2');
    var radio3 = document.getElementById('3');
    var radio4 = document.getElementById('4');

    label1.addEventListener('click', function(){
        radio1.checked = true;
        choice1.classList.add('selected');
        choice2.classList.remove('selected');
        choice3.classList.remove('selected');
        choice4.classList.remove('selected');
    });


    label2.addEventListener('click', function(){
        radio2.checked = true;
        choice2.classList.add('selected');
        choice3.classList.remove('selected');
        choice4.classList.remove('selected');
        choice1.classList.remove('selected');
    });

    label3.addEventListener('click', function(){
        radio3.checked = true;
        choice3.classList.add('selected');
        choice4.classList.remove('selected');
        choice1.classList.remove('selected');
        choice2.classList.remove('selected');
    });
    label4.addEventListener('click', function(){
        radio4.checked = true;
        choice4.classList.add('selected');
        choice1.classList.remove('selected');
        choice2.classList.remove('selected');
        choice3.classList.remove('selected');
    });

//collection//
var basicbutn = document.querySelector('.collection__basic--active');
var shinybutn = document.querySelector('.collection__shiny--active');
var basiccollection = document.querySelector('.collection__basic');
var shinycollection = document.querySelector('.collection__shiny');

basicbutn.addEventListener('click', function(){
    basiccollection.classList.remove('hidden');
    shinycollection.classList.add('hidden');
    basicbutn.classList.add('selected');

});

shinybutn.addEventListener('click', function(){
    basiccollection.classList.add('hidden');
    shinycollection.classList.remove('hidden');
});

//sidebyside

var right = document.querySelector('.sidebyside__right');
var left = document.querySelector('.sidebyside__left');
var sbsradio1 = document.getElementById('totradio--1');
var sbsradio2 = document.getElementById('totradio--2');

right.addEventListener('click', function(){
    sbsradio2.checked = true;
})
left.addEventListener('click', function(){
    sbsradio1.checked = true;
})
var score;
var life;

var startButton = document.querySelector('.selection__button--1');
var homeSection = document.querySelector('.home');

var questionsSection = document.querySelector('.jeu');

var rankGame = document.querySelector('.rank');
var rankSubmit = document.querySelector('.rank__next');

var qcmLabel = document.querySelector('.multiplechoice');
var qcmQuestion  = document.querySelector('.multiplechoice__question');

var pictureGame = document.querySelector('.picture');

var trueorfalseGame = document.querySelector('.trueorfalse');

var thisorthatGame = document.querySelector('.thisorthat');

var collectionButton = document.querySelector('.selection__button--3');
var collectionSection = document.querySelector('.collection');

var questionNumber = 0;

var jsonData;

var validAnswertoGet;

var lifeVisu = document.querySelector('.top__lives');


var imageBasic = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55];
var imageShiny = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55];


fetch('assets/json/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(data => {

        jsonData = data;

        const Sounds = data.sounds;
        collectionButton.addEventListener('mouseenter', function() {
            const hoverAudio = new Audio(Sounds[1]);
            hoverAudio.play()
        })
        startButton.addEventListener('mouseenter', function() {
            const hoverAudio = new Audio(Sounds[1]);
            hoverAudio.play()
        })

        pointstoposter();
        postertowatch();

        collectionButton.addEventListener('click', function() {
            homeSection.classList.add('home--animation');

            const startAudio = new Audio(Sounds[0]);
            startAudio.play();
            
            setTimeout(function() {
                collectionSection.classList.remove('hidden');
                homeSection.classList.add('hidden');
            }, 4860);
        })

        startButton.addEventListener('click', function() {
            score = 0;
            life = 3
            homeSection.classList.add('home--animation');

            const startAudio = new Audio(Sounds[0]);
            startAudio.play();
            
            setTimeout(function() {

                homeSection.classList.add('hidden');
                questionsSection.classList.remove('hidden');

                ChooseQuestion(data);
            }, 4860);
            
            /*var Alien = localStorage.getItem("Alien")
            if (Alien === "Y") {
                posters.slice('alien.jpg');
            }*/
        });
      });

function ChooseQuestion(data, questionData) {
    rankGame.classList.add('hidden');
    qcmLabel.classList.add('hidden');
    pictureGame.classList.add('hidden');
    trueorfalseGame.classList.add('hidden');
    thisorthatGame.classList.add('hidden');
    
    if (Ambianceaudio) {
        Ambianceaudio.pause();
    }

    var cheminsAudio = data.musics;
    var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
    var Ambianceaudio = new Audio(cheminAleatoire);
    Ambianceaudio.loop = true;
    Ambianceaudio.play();

    lifeheart();
    pointstoposter();
    postertowatch();

    var questionData = data.questions;
    var questionChosen = questionData[Math.floor(Math.random() * questionData.length)]; //Math.floor(Math.random() * questionData.length)

    homeSection.classList.add('hidden');
    if (questionChosen === questionData[0]) {
        qcmQuestionLoader(data);
    } else if (questionChosen === questionData[1]) {
        pictureQuestionLoader(data);
    } else if (questionChosen === questionData[2]) {
        trueorfalseQuestionLoader(data);
    } else if (questionChosen === questionData[3]) {
        thisorthatQuestionLoader(data);
    } else if (questionChosen === questionData[4]) {
        rankQuestionLoader(data);
    }
}

function qcmQuestionLoader(data) {
    questionsSection.classList.remove('hidden');
    qcmLabel.classList.remove('hidden');

        var questionQcm = data.questions[0];
        var qcmChosenQuestion = questionQcm[Math.floor(Math.random() * questionQcm.length)];
        qcmQuestion.innerText = qcmChosenQuestion;

        if (qcmChosenQuestion === questionQcm[0]) {

            var cheminsReponses = data.movies;
            shuffle(cheminsReponses);
                    
            var ReponseAleatoire1 = cheminsReponses[0];

            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];
            var ReponseAleatoire3 = cheminsReponses[2];
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];
            var ReponseAleatoire4 = cheminsReponses[3];
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];
            var qcmAnswer1BoxOffice = ReponseAleatoire1[1];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[1];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[1];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[1];
            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[0];

            if (qcmAnswer2BoxOffice > validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[0];
            }

            if (qcmAnswer3BoxOffice > validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[0];
            }

            if (qcmAnswer4BoxOffice > validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[0];
            }

            
                    
        } else if (qcmChosenQuestion === questionQcm[1]) {

            var cheminsReponses = data.movies;
            shuffle(cheminsReponses);
            

            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
            
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
            
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[1];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[1];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[1];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[1];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[0];

            if (qcmAnswer2BoxOffice < validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[0];
            }

            if (qcmAnswer3BoxOffice < validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[0];
            }

            if (qcmAnswer4BoxOffice < validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[0];
            }
                        
            
        } else if (qcmChosenQuestion === questionQcm[2]) {

            var cheminsReponses = data.movies;
            shuffle(cheminsReponses);
            

            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
            
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
            
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[3];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[3];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[3];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[3];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[0];

            if (qcmAnswer2BoxOffice > validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[0];
            }

            if (qcmAnswer3BoxOffice > validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[0];
            }

            if (qcmAnswer4BoxOffice > validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[0];
            }
                        
            
        } else if (qcmChosenQuestion === questionQcm[3]) {
            
            var cheminsReponses = data.movies;
            shuffle(cheminsReponses);
            

            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
            
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
            
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[5];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[5];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[5];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[5];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[5];

            if (qcmAnswer2BoxOffice < validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[5];
            }

            if (qcmAnswer3BoxOffice < validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[5];
            }

            if (qcmAnswer4BoxOffice < validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[5];
            }
                        
            
        } else if (qcmChosenQuestion === questionQcm[4]) {

            var cheminsReponses = data.movies;
            shuffle(cheminsReponses);
            
            
            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
            
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
            
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[4];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[4];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[4];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[4];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[4];

            if (qcmAnswer2BoxOffice > validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[4];
            }

            if (qcmAnswer3BoxOffice > validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[4];
            }

            if (qcmAnswer4BoxOffice > validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[4];
            }
                        

        } else if (qcmChosenQuestion === questionQcm[5]) {

            var cheminsReponses = data.moviesDeathCount;
            shuffle(cheminsReponses);
            
            
            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
            
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
            
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
            
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[1];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[1];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[1];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[1];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[1];

            if (qcmAnswer2BoxOffice < validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[1];
            }

            if (qcmAnswer3BoxOffice < validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[1];
            }

            if (qcmAnswer4BoxOffice < validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[1];
            }
                        
           
        } else if (qcmChosenQuestion === qcmQuestion[6]) {
            
            var cheminsReponses = data.moviesDeathCount;
            shuffle(cheminsReponses);
            
            
            var ReponseAleatoire1 = cheminsReponses[0];
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];

            var ReponseAleatoire2 = cheminsReponses[1];
           
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = cheminsReponses[2];
           
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            var ReponseAleatoire4 = cheminsReponses[3];
          
            var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
            qcmAnswer4Name.innerText = ReponseAleatoire4[0];

            var qcmAnswer1BoxOffice = ReponseAleatoire1[1];
            var qcmAnswer2BoxOffice = ReponseAleatoire2[1];
            var qcmAnswer3BoxOffice = ReponseAleatoire3[1];
            var qcmAnswer4BoxOffice = ReponseAleatoire4[1];

            var validAnswer = qcmAnswer1BoxOffice;
            validAnswertoGet = ReponseAleatoire1[1];

            if (qcmAnswer2BoxOffice > validAnswer) {
                validAnswer = qcmAnswer2BoxOffice;
                validAnswertoGet = ReponseAleatoire2[1];
            }

            if (qcmAnswer3BoxOffice > validAnswer) {
                validAnswer = qcmAnswer3BoxOffice;
                validAnswertoGet = ReponseAleatoire3[1];
            }

            if (qcmAnswer4BoxOffice > validAnswer) {
                validAnswer = qcmAnswer4BoxOffice;
                validAnswertoGet = ReponseAleatoire4[1];
            }
                        
          
        } else if (qcmChosenQuestion === qcmQuestion[7]) {
            
            var ReponseAleatoire1 = "Benjamin";
            
            var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
            qcmAnswer1Name.innerText = ReponseAleatoire1[0];
            var ReponseAleatoire2 = "Pearl";
            var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
            qcmAnswer2Name.innerText = ReponseAleatoire2[0];

            var ReponseAleatoire3 = "Célia";
            var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
            qcmAnswer3Name.innerText = ReponseAleatoire3[0];

            validAnswertoGet = ReponseAleatoire1;
        }
}

const radios = document.querySelectorAll('.multipleform__input');
radios.forEach((radio) => {
    radio.addEventListener('click', () => {
        if (radio.checked) {
            const radioLabel = radio.nextElementSibling;
            var radioChosen = radioLabel.textContent;

            
            checkAnswerAndDisplayNextQuestion(radioChosen,radio);
        };
    });
});

function checkAnswerAndDisplayNextQuestion(radioChosen,radio){ 

    var data = jsonData;

    if (radioChosen === validAnswertoGet) {
        score = score + 1;
        radio.checked = false;
    } else {
        life = life - 1;
        radio.checked = false;
    }

    if (questionNumber < 20 && life > 0) {
        qcmLabel.classList.add('hidden');
        ChooseQuestion(data);
    } else if (life === 0) {
        questionsSection.classList.add('hidden');
    }
}

function pictureQuestionLoader(data) {
    questionsSection.classList.remove('hidden');
    pictureGame.classList.remove('hidden');

    var pictureQuestion = data.questions[1];
    var pictureQuestionChosen = pictureQuestion[Math.floor(Math.random() * pictureQuestion.length)];
    var pictureLabel = document.querySelector('.picture__question');
    pictureLabel.innerText = pictureQuestionChosen;

    if (pictureQuestionChosen === pictureQuestion[0]){
        var cheminsReponses = data.movies;
        shuffle(cheminsReponses);
        var moviePoster = cheminsReponses[0][6];
        var movieName = cheminsReponses[0][0];
        console.log(movieName);
    } else if (pictureQuestionChosen === pictureQuestion[1]) {
        var cheminsReponses = data.moviesCharacter;
        shuffle(cheminsReponses);
        var moviePoster = cheminsReponses[0][1];
        var movieName = cheminsReponses[0][0];
        console.log(movieName);
    }
    var pictureDiv = document.querySelector('.picture__picture');
    var pictureImg = pictureDiv.querySelector('img');
    pictureImg.src = moviePoster;
    pictureImg.alt = movieName;

    pictureCheckAnswerAndDisplayNextQuestion(data,movieName);
}

function pictureCheckAnswerAndDisplayNextQuestion(data,movieName) {
    var pictureInput = document.querySelector('.picture__input');
    var pictureSubmit = document.querySelector('.picture__confirm');
    var data = jsonData;

    pictureSubmit.addEventListener('click', function(){
        if (pictureInput.value === movieName) {
            score = score + 1;
        } else {
            life = life - 1;
        }
    
        if (questionNumber < 20 && life > 0) {
            pictureGame.classList.add('hidden');
            ChooseQuestion(data);
            pictureInput.value = [];
        } else if (life === 0) {
            questionsSection.classList.add('hidden');
        }
    })
    

}

function trueorfalseQuestionLoader(data) {

    questionsSection.classList.remove('hidden');
    trueorfalseGame.classList.remove('hidden');

    var trueorfalseQuestion = data.questions[2];
    var trueorfalseQuestionChoose = trueorfalseQuestion[Math.floor(Math.random() * trueorfalseQuestion.length)];
    var trueorfalseQuestionChosen = trueorfalseQuestionChoose[0];
    var trueorfalseLabel = document.querySelector('.trueorfalse__question');
    trueorfalseLabel.innerText = trueorfalseQuestionChosen;

    var trueorfalsecheminsReponses = trueorfalseQuestionChoose[1];

    const radios = document.querySelectorAll('.tofradio');
    radios.forEach((radio) => {
        radio.addEventListener('click', () => {
            if (radio.checked) {
                var radioChosen = radio.value;

                if (radioChosen === trueorfalsecheminsReponses) {
                    score = score + 1;
                    radio.checked = false;
                } else {
                    life = life - 1;
                    radio.checked = false;
                }
            
                if (questionNumber < 20 && life > 0) {
                    qcmLabel.classList.add('hidden');
                    ChooseQuestion(data);
                } else if (life === 0) {
                    questionsSection.classList.add('hidden');
                }
            };
        });
    });
}

function thisorthatQuestionLoader(data) {
    questionsSection.classList.remove('hidden');
    thisorthatGame.classList.remove('hidden');

    var thisorthatQuestion = data.questions[3];
    var thisorthatQuestionChosen = thisorthatQuestion[Math.floor(Math.random() * thisorthatQuestion.length)];
    var trueorfalseLabel = document.querySelector('.thisorthat__question');
    trueorfalseLabel.innerText = thisorthatQuestionChosen;

    var thisorthatcheminsReponses = data.movies;
    shuffle(thisorthatcheminsReponses);

    var thisorthatDeadReponses  = data.moviesDeathCount;
    shuffle(thisorthatDeadReponses);

    if (thisorthatQuestionChosen === thisorthatQuestion[0]) {
        var ReponseAleatoire1 = thisorthatcheminsReponses[0];
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = ReponseAleatoire1[0];
        
        var ReponseAleatoire2 = thisorthatcheminsReponses[1];
        var thisorthatAnswer2Name = document.querySelector('.totradio--2');
        thisorthatAnswer2Name.innerText = ReponseAleatoire2[0];

        var thisorthatAnswer1BoxOffice = ReponseAleatoire1[1];
        var thisorthatAnswer2BoxOffice = ReponseAleatoire2[1];

        var validAnswer = thisorthatAnswer1BoxOffice;
        validAnswertoGet = ReponseAleatoire1[0];

        if (thisorthatAnswer2BoxOffice > validAnswer) {
            validAnswer = thisorthatAnswer2BoxOffice;
            validAnswertoGet = ReponseAleatoire2[0];
        }
    } else if (thisorthatQuestionChosen === thisorthatQuestion[1]) {

        var ReponseAleatoire1 = thisorthatcheminsReponses[0];
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = ReponseAleatoire1[0];
        
        var ReponseAleatoire2 = thisorthatcheminsReponses[1];
        var thisorthatAnswer2Name = document.querySelector('.totradio--2');
        thisorthatAnswer2Name.innerText = ReponseAleatoire2[0];
        
        var thisorthatAnswer1Oscars = ReponseAleatoire1[4];
        var thisorthatAnswer2Oscars = ReponseAleatoire2[4];

        var validAnswer = thisorthatAnswer1Oscars;
        validAnswertoGet = ReponseAleatoire1[0];

        if (thisorthatAnswer2Oscars === validAnswer) {
            validAnswer = [thisorthatAnswer1Oscars,thisorthatAnswer2Oscars]
            validAnswertoGet = [ReponseAleatoire1[0], ReponseAleatoire2[0]];
        } else if (thisorthatAnswer2Oscars > validAnswer) {
            validAnswer = thisorthatAnswer2Oscars;
            validAnswertoGet = ReponseAleatoire2[0];
        }

    } else if (thisorthatQuestionChosen === thisorthatQuestion[2]) {
        var deadReponseAleatoire1 = thisorthatDeadReponses[0];
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = deadReponseAleatoire1[0];
        
        var deadReponseAleatoire2 = thisorthatDeadReponses[1];
        var thisorthatAnswer2Name = document.querySelector('.totradio--2');
        thisorthatAnswer2Name.innerText = deadReponseAleatoire2[0];

        var thisorthatAnswer1Oscars = deadReponseAleatoire1[4];
        var thisorthatAnswer2Oscars = deadReponseAleatoire2[4];

        var validAnswer = thisorthatAnswer1Oscars;
        validAnswertoGet = deadReponseAleatoire1[0];

        if (thisorthatAnswer2Oscars === validAnswer) {
            validAnswer = [thisorthatAnswer1Oscars,thisorthatAnswer2Oscars]
            validAnswertoGet = [deadReponseAleatoire1[0], deadReponseAleatoire2[0]];
        } else if (thisorthatAnswer2Oscars > validAnswer) {
            validAnswer = thisorthatAnswer2Oscars;
        }
    }

    const radios = document.querySelectorAll('.totradio');
    radios.forEach((radio) => {
        radio.addEventListener('click', () => {
            if (radio.checked) {
                const radioLabel = radio.nextElementSibling;
                var radioChosen = radioLabel.textContent;
        
                    
                if (validAnswertoGet.length === 2) {
                    if (radioChosen === validAnswertoGet[0] || radioChosen === validAnswertoGet[1]) {
                        score = score + 1;
                        radio.checked = false;
                    } else {
                        life = life - 1;
                        radio.checked = false;
                       }
                } else if (validAnswertoGet === ReponseAleatoire1[0] || validAnswertoGet === ReponseAleatoire2[0]) {
                    if (radioChosen === validAnswertoGet) {
                        score = score + 1;
                        radio.checked = false;
                    } else {
                        life = life - 1;
                        radio.checked = false;
                    }
                }
                
                if (questionNumber < 20 && life > 0) {
                    qcmLabel.classList.add('hidden');
                    ChooseQuestion(data);
                } else if (life === 0) {
                    questionsSection.classList.add('hidden');
                }
            };
        });
    });
}

function rankQuestionLoader(data) {
    questionsSection.classList.remove('hidden');
    rankGame.classList.remove('hidden');

    var rankQuestion = data.questions[4];
    var rankQuestionChosen = rankQuestion[Math.floor(Math.random() * rankQuestion.length)];
    var rankLabel = document.querySelector('.rank__question');
    rankLabel.innerText = rankQuestionChosen;

    var rankcheminsReponses = data.movies;
    shuffle(rankcheminsReponses);

    var rankBudgetReponses = data.moviesBudget;
    shuffle(rankBudgetReponses);

    if (rankQuestionChosen === rankQuestion[1] || rankQuestionChosen === rankQuestion[2]) {
        if (rankQuestionChosen === data.questions[4][1]) {
            
            var ReponseAleatoire1 = rankcheminsReponses[0][0];
            var cheminNombre = rankcheminsReponses[0][3]
            const card1 = createCard(ReponseAleatoire1, cheminNombre);
            cardcontainer.appendChild(card1);

            var ReponseAleatoire2 = rankcheminsReponses[1][0];
            var cheminNombre = rankcheminsReponses[1][3];
            const card2 = createCard(ReponseAleatoire2, cheminNombre);
            cardcontainer.appendChild(card2);

            var ReponseAleatoire3 = rankcheminsReponses[2][0];
            var cheminNombre = rankcheminsReponses[2][3];
            const card3 = createCard(ReponseAleatoire3,cheminNombre);
            cardcontainer.appendChild(card3);

            var ReponseAleatoire4 = rankcheminsReponses[3][0];
            var cheminNombre = rankcheminsReponses[3][3];
            const card4 = createCard(ReponseAleatoire4, cheminNombre);
            cardcontainer.appendChild(card4);

            var ReponseAleatoire5 = rankcheminsReponses[4][0];
            var cheminNombre = rankcheminsReponses[4][3];
            const card5 = createCard(ReponseAleatoire5, cheminNombre);
            cardcontainer.appendChild(card5);

            movienumbers = [rankcheminsReponses[0][3], rankcheminsReponses[1][3], rankcheminsReponses[2][3], rankcheminsReponses[3][3], rankcheminsReponses[4][3]];
        } else if (rankQuestionChosen === data.questions[4][2]){
            var ReponseAleatoire1 = rankcheminsReponses[0][0];
            var cheminNombre = rankcheminsReponses[0][2];
            const card1 = createCard(ReponseAleatoire1, cheminNombre);
            cardcontainer.appendChild(card1);

            var ReponseAleatoire2 = rankcheminsReponses[1][0];
            var cheminNombre = rankcheminsReponses[1][2];
            const card2 = createCard(ReponseAleatoire2, cheminNombre);
            cardcontainer.appendChild(card2);

            var ReponseAleatoire3 = rankcheminsReponses[2][0];
            var cheminNombre = rankcheminsReponses[2][2];
            const card3 = createCard(ReponseAleatoire3, cheminNombre);
            cardcontainer.appendChild(card3);

            var ReponseAleatoire4 = rankcheminsReponses[3][0];
            var cheminNombre = rankcheminsReponses[3][2];
            const card4 = createCard(ReponseAleatoire4, cheminNombre);
            cardcontainer.appendChild(card4);

            var ReponseAleatoire5 = rankcheminsReponses[4][0];
            var cheminNombre = rankcheminsReponses[4][2];
            const card5 = createCard(ReponseAleatoire5, cheminNombre);
            cardcontainer.appendChild(card5);

            movienumbers = [rankcheminsReponses[0][2], rankcheminsReponses[1][2], rankcheminsReponses[2][2], rankcheminsReponses[3][2], rankcheminsReponses[4][2]];
        } 
    } else if (rankQuestionChosen === rankQuestion[0]) {
        var ReponseAleatoire1 = rankBudgetReponses[0][0];
        var cheminNombre = rankBudgetReponses[0][1];
        const card1 = createCard(ReponseAleatoire1, cheminNombre);
        cardcontainer.appendChild(card1);

        var ReponseAleatoire2 = rankBudgetReponses[1][0];
        var cheminNombre = rankBudgetReponses[1][1];
        const card2 = createCard(ReponseAleatoire2, cheminNombre);
        cardcontainer.appendChild(card2);

        var ReponseAleatoire3 = rankBudgetReponses[2][0];
        var cheminNombre = rankBudgetReponses[2][1];
        const card3 = createCard(ReponseAleatoire3, cheminNombre);
        cardcontainer.appendChild(card3);

        var ReponseAleatoire4 = rankBudgetReponses[3][0];
        var cheminNombre = rankBudgetReponses[3][1];
        const card4 = createCard(ReponseAleatoire4, cheminNombre);
        cardcontainer.appendChild(card4);

        var ReponseAleatoire5 = rankBudgetReponses[4][0];
        var cheminNombre = rankBudgetReponses[4][1];
        const card5 = createCard(ReponseAleatoire5, cheminNombre);
        cardcontainer.appendChild(card5);

        movienumbers = [rankBudgetReponses[0][1], rankBudgetReponses[1][1], rankBudgetReponses[2][1], rankBudgetReponses[3][1], rankBudgetReponses[4][1]];
    }
    
    //movienumbers = [ReponseAleatoire1, ReponseAleatoire2, ReponseAleatoire3, ReponseAleatoire4, ReponseAleatoire5];

    slotsnumbers = movienumbers.sort(function(a,b){return b-a});
    slotNumber(slotsnumbers);



    rankSubmit.addEventListener('click', function() {

        cardNumbersArray;

        if (cardNumbersArray.length === 5) {
            score = score + 1;
        } else {
            life = life - 1;
        }
    
        if (questionNumber < 20 && life > 0) {
            qcmLabel.classList.add('hidden');
            ChooseQuestion(data);
            $('.answer__card').remove();
        } else if (life === 0) {
            questionsSection.classList.add('hidden');
            $('.answer__card').remove();
        }
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function pointstoposter() {
    if (score === 10) {
        if (!localStorage.getItem('posterBasic')) {

            var initialNumber = imageBasic[Math.floor(Math.random() * imageBasic.length)];
            var initialArray = [initialNumber];
        
            localStorage.setItem('posterBasic', JSON.stringify(initialArray));
    
        } else {

            var existingArray = JSON.parse(localStorage.getItem('posterBasic'));
            var newRandomNumber = imageBasic[Math.floor(Math.random() * imageBasic.length)];
        
            existingArray.push(newRandomNumber);
        
            localStorage.setItem('posterBasic', JSON.stringify(existingArray));
        }
    }
            
    if (score === 20) {
        if (!localStorage.getItem('posterShiny')) {

            var initialNumber = imageShiny[Math.floor(Math.random() * imageShiny.length)];
            var initialArray = [initialNumber];
        
            localStorage.setItem('posterShiny', JSON.stringify(initialArray));
        
        } else {

            var existingArray = JSON.parse(localStorage.getItem('posterShiny'));
            var newRandomNumber = imageShiny[Math.floor(Math.random() * imageShiny.length)];
        
            existingArray.push(newRandomNumber);
        
            localStorage.setItem('posterShiny', JSON.stringify(existingArray));
        }
    }
}

function postertowatch() {

    var BasicstoredArray = JSON.parse(localStorage.getItem('posterBasic'));

    if (BasicstoredArray && Array.isArray(BasicstoredArray)) {

        if (BasicstoredArray.includes(1)) {
            var posterUnlocked = document.querySelector('.28dayslater');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(2)) {
            var posterUnlocked = document.querySelector('.30daysofnight');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(3)) {
            var posterUnlocked = document.querySelector('.alien');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(4)) {
            var posterUnlocked = document.querySelector('.aquietplace');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(5)) {
            var posterUnlocked = document.querySelector('.aquietplace2');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(6)) {
            var posterUnlocked = document.querySelector('.brightburn');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(7)) {
            var posterUnlocked = document.querySelector('.carrie');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(8)) {
            var posterUnlocked = document.querySelector('.conjuring');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(9)) {
            var posterUnlocked = document.querySelector('.conjuring2');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(10)) {
            var posterUnlocked = document.querySelector('.dashcam');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(11)) {
            var posterUnlocked = document.querySelector('.dawnofthedead');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(12)) {
            var posterUnlocked = document.querySelector('.elmstreet');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(13)) {
            var posterUnlocked = document.querySelector('.exorcist');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(14)) {
            var posterUnlocked = document.querySelector('.firstpurge');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(15)) {
            var posterUnlocked = document.querySelector('.fridaythe13th');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(16)) {
            var posterUnlocked = document.querySelector('.fromdusktilldawn');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(17)) {
            var posterUnlocked = document.querySelector('.halloween');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(18)) {
            var posterUnlocked = document.querySelector('.hannibal');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(19)) {
            var posterUnlocked = document.querySelector('.hereditary');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(20)) {
            var posterUnlocked = document.querySelector('.host');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(21)) {
            var posterUnlocked = document.querySelector('.hush');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(22)) {
            var posterUnlocked = document.querySelector('.iamlegend');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(23)) {
            var posterUnlocked = document.querySelector('.insidious');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(24)) {
            var posterUnlocked = document.querySelector('.it');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(25)) {
            var posterUnlocked = document.querySelector('.itchapter2');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(26)) {
            var posterUnlocked = document.querySelector('.itfollows');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(27)) {
            var posterUnlocked = document.querySelector('.janedoe');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(28)) {
            var posterUnlocked = document.querySelector('.killersklowns');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(29)) {
            var posterUnlocked = document.querySelector('.oculus');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(30)) {
            var posterUnlocked = document.querySelector('.paranormalactivity');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(31)) {
            var posterUnlocked = document.querySelector('.prometheus');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(32)) {
            var posterUnlocked = document.querySelector('.psycho');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(33)) {
            var posterUnlocked = document.querySelector('.purge3');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(34)) {
            var posterUnlocked = document.querySelector('.rec');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(35)) {
            var posterUnlocked = document.querySelector('.saw');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(36)) {
            var posterUnlocked = document.querySelector('.scream3');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(37)) {
            var posterUnlocked = document.querySelector('.shining');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(38)) {
            var posterUnlocked = document.querySelector('.signs');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(39)) {
            var posterUnlocked = document.querySelector('.silenceofthelambs');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(40)) {
            var posterUnlocked = document.querySelector('.sinister');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(41)) {
            var posterUnlocked = document.querySelector('.slither');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(42)) {
            var posterUnlocked = document.querySelector('.terrified');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(43)) {
            var posterUnlocked = document.querySelector('.texaschainsawmassacre');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(44)) {
            var posterUnlocked = document.querySelector('.thebabadook');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(45)) {
            var posterUnlocked = document.querySelector('.thebelkoexperiment');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(46)) {
            var posterUnlocked = document.querySelector('.thecabininthewoods');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(47)) {
            var posterUnlocked = document.querySelector('.thedescent');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(48)) {
            var posterUnlocked = document.querySelector('.theinvisibleman');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(49)) {
            var posterUnlocked = document.querySelector('.themist');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(50)) {
            var posterUnlocked = document.querySelector('.thenun');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(51)) {
            var posterUnlocked = document.querySelector('.thering');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(52)) {
            var posterUnlocked = document.querySelector('.thesixthsense');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(53)) {
            var posterUnlocked = document.querySelector('.thething');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(54)) {
            var posterUnlocked = document.querySelector('.us');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (BasicstoredArray.includes(55)) {
            var posterUnlocked = document.querySelector('.worldwarz');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }

    }

    var ShinystoredArray = JSON.parse(localStorage.getItem('posterShiny'));

    if (ShinystoredArray && Array.isArray(ShinystoredArray)) {

        if (ShinystoredArray.includes(1)) {
            var posterUnlocked = document.querySelector('.28dayslatershiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinytoredArray.includes(2)) {
            var posterUnlocked = document.querySelector('.30daysofnightshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(3)) {
            var posterUnlocked = document.querySelector('.alienshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(4)) {
            var posterUnlocked = document.querySelector('.aquietplaceshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(5)) {
            var posterUnlocked = document.querySelector('.aquietplace2shiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(6)) {
            var posterUnlocked = document.querySelector('.brightburnshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(7)) {
            var posterUnlocked = document.querySelector('.carrieshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(8)) {
            var posterUnlocked = document.querySelector('.conjuringshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(9)) {
            var posterUnlocked = document.querySelector('.conjuring2shiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(10)) {
            var posterUnlocked = document.querySelector('.dashcamshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(11)) {
            var posterUnlocked = document.querySelector('.dawnofthedeadshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(12)) {
            var posterUnlocked = document.querySelector('.elmstreetshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(13)) {
            var posterUnlocked = document.querySelector('.exorcistshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(14)) {
            var posterUnlocked = document.querySelector('.firstpurgeshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(15)) {
            var posterUnlocked = document.querySelector('.fridaythe13thshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(16)) {
            var posterUnlocked = document.querySelector('.fromdusktilldawnshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(17)) {
            var posterUnlocked = document.querySelector('.halloweenshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(18)) {
            var posterUnlocked = document.querySelector('.hannibalshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(19)) {
            var posterUnlocked = document.querySelector('.hereditaryshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(20)) {
            var posterUnlocked = document.querySelector('.hostshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(21)) {
            var posterUnlocked = document.querySelector('.hushshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(22)) {
            var posterUnlocked = document.querySelector('.iamlegendshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(23)) {
            var posterUnlocked = document.querySelector('.insidiousshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(24)) {
            var posterUnlocked = document.querySelector('.itshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(25)) {
            var posterUnlocked = document.querySelector('.itchapter2shiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(26)) {
            var posterUnlocked = document.querySelector('.itfollowsshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(27)) {
            var posterUnlocked = document.querySelector('.janedoeshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(28)) {
            var posterUnlocked = document.querySelector('.killersklownsshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(29)) {
            var posterUnlocked = document.querySelector('.oculusshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(30)) {
            var posterUnlocked = document.querySelector('.paranormalactivityshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(31)) {
            var posterUnlocked = document.querySelector('.prometheusshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(32)) {
            var posterUnlocked = document.querySelector('.psychoshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(33)) {
            var posterUnlocked = document.querySelector('.purge3shiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(34)) {
            var posterUnlocked = document.querySelector('.recshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(35)) {
            var posterUnlocked = document.querySelector('.sawshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(36)) {
            var posterUnlocked = document.querySelector('.scream3shiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(37)) {
            var posterUnlocked = document.querySelector('.shiningshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(38)) {
            var posterUnlocked = document.querySelector('.signsshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(39)) {
            var posterUnlocked = document.querySelector('.silenceofthelambsshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(40)) {
            var posterUnlocked = document.querySelector('.sinistershiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(41)) {
            var posterUnlocked = document.querySelector('.slithershiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(42)) {
            var posterUnlocked = document.querySelector('.terrifiedshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(43)) {
            var posterUnlocked = document.querySelector('.texaschainsawmassacreshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(44)) {
            var posterUnlocked = document.querySelector('.thebabadookshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(45)) {
            var posterUnlocked = document.querySelector('.thebelkoexperimentshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(46)) {
            var posterUnlocked = document.querySelector('.thecabininthewoodsshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(47)) {
            var posterUnlocked = document.querySelector('.thedescentshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(48)) {
            var posterUnlocked = document.querySelector('.theinvisiblemanshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(49)) {
            var posterUnlocked = document.querySelector('.themistshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(50)) {
            var posterUnlocked = document.querySelector('.thenunshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(51)) {
            var posterUnlocked = document.querySelector('.theringshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(52)) {
            var posterUnlocked = document.querySelector('.thesixthsenseshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(53)) {
            var posterUnlocked = document.querySelector('.thethingshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(54)) {
            var posterUnlocked = document.querySelector('.usshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
        if (ShinystoredArray.includes(55)) {
            var posterUnlocked = document.querySelector('.worldwarzshiny');
            
            posterUnlocked.classList.add('collection__item--show');
            posterUnlocked.classList.remove('collection__item');
        }
    }
}

function lifeheart() {
    if (life === 3) {
        lifeVisu.style.backgroundImage = "url('../assets/images/SVG/lives-full.svg')";
    } else if (life === 2) {
        lifeVisu.style.backgroundImage = "url('../assets/images/SVG/lives-two-thirds.svg')";
    } else if (life === 1) {
        lifeVisu.style.backgroundImage = "url('../assets/images/SVG/lives-one-third.svg')";
    } else if (life === 0) {
        lifeVisu.style.backgroundImage = "";
    }
}

/*function getRandomIntInclusive(min,max) {
    min= Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}*/