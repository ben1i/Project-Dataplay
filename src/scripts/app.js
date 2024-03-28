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
    var cardNumbersArrayArray = [];

    function handledrop(event, ui){
        var slotNumber = $(this).data('number');
        var cardNumber = ui.draggable.data('number');
        console.log(slotNumber, cardNumber);

        cardNumbersArray.push(cardNumber);

        if (slotNumber === cardNumber){
            console.log('correct')
        }else{
            console.log('incorrect')
        }
    }

    $('#validerBtn').click(function() {
        // Stockez les valeurs de cardNumber dans cardNumberArray
        cardNumbersArray.forEach(function(cardNumber) {
            cardNumbersArrayArray.push(cardNumber);
        })
    
        // Affichez cardNumberArray dans la console
        console.log(cardNumbersArrayArray);
    });

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
        console.log('checked');
        choice1.classList.add('selected');
        choice2.classList.remove('selected');
        choice3.classList.remove('selected');
        choice4.classList.remove('selected');
    });


    label2.addEventListener('click', function(){
        radio2.checked = true;
        console.log('checked');
        choice2.classList.add('selected');
        choice3.classList.remove('selected');
        choice4.classList.remove('selected');
        choice1.classList.remove('selected');
    });

    label3.addEventListener('click', function(){
        radio3.checked = true;
        console.log('checked');
        choice3.classList.add('selected');
        choice4.classList.remove('selected');
        choice1.classList.remove('selected');
        choice2.classList.remove('selected');
    });
    label4.addEventListener('click', function(){
        radio4.checked = true;
        console.log('checked');
        choice4.classList.add('selected');
        choice1.classList.remove('selected');
        choice2.classList.remove('selected');
        choice3.classList.remove('selected');
    });



var score;
var life;

var posterContainer = document.querySelector('.test__img');
var posterImage = posterContainer.querySelector('img');

var posters = ["alien.jpg", "blairwitch.jpg", "carrie.jpg", "dawnofthedead.jpg", "elmstreet.jpg", "exorcist.jpg", "halloween.jpg", "hellraiser.jpg", "it.jpg", "jaws.jpg", "nightofthelivingdead.jpg", "omen.jpg", "psycho.jpg", "rosemarysbaby.jpg", "shining.jpg", "suspiria.jpg", "texaschainsawmassacre.jpg", "theevildead.jpg", "thering.jpg", "thething.jpg"];

var testText = document.querySelector('.test__text');

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

var validAnswertoGet


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

    var questionData = data.questions;
    var questionChosen = questionData[4]; //Math.floor(Math.random() * questionData.length)

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

        var cheminsAudio = data.musics;
        var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
        var Ambianceaudio = new Audio(cheminAleatoire);
        Ambianceaudio.loop = true;

        Ambianceaudio.play();

        var questionQcm = data.questions[0];
        var qcmChosenQuestion = questionQcm[Math.floor(Math.random() * questionQcm.length)];
        qcmQuestion.innerText = qcmChosenQuestion;
                    
        var cheminsReponses = data.movies;
        shuffle(cheminsReponses);
        console.log(cheminsReponses[0][0]);
                    
        //var RandomNumber1 = Math.floor(Math.random() * cheminsReponses.length);
        //console.log(RandomNumber1);
        var ReponseAleatoire1 = cheminsReponses[0];
        console.log(ReponseAleatoire1);
        var qcmAnswer1Name = document.querySelector('.multipleform__label--1');
        qcmAnswer1Name.innerText = ReponseAleatoire1[0];
        //cheminsReponses.splice(RandomNumber1);

        //var RandomNumber2 = Math.floor(Math.random() * cheminsReponses.length);
        //console.log(RandomNumber2);
        var ReponseAleatoire2 = cheminsReponses[1];
        console.log(ReponseAleatoire2);
        var qcmAnswer2Name = document.querySelector('.multipleform__label--2');
        qcmAnswer2Name.innerText = ReponseAleatoire2[0];
        //cheminsReponses.splice(RandomNumber2);

        //var RandomNumber3 = Math.floor(Math.random() * cheminsReponses.length);
        //console.log(RandomNumber3);
        var ReponseAleatoire3 = cheminsReponses[2];
        console.log(ReponseAleatoire3);
        var qcmAnswer3Name = document.querySelector('.multipleform__label--3');
        qcmAnswer3Name.innerText = ReponseAleatoire3[0];
        //cheminsReponses.splice(RandomNumber3);

        //var RandomNumber4 = Math.floor(Math.random() * cheminsReponses.length);
        //console.log(RandomNumber4);
        var ReponseAleatoire4 = cheminsReponses[3];
        console.log(ReponseAleatoire4);
        var qcmAnswer4Name = document.querySelector('.multipleform__label--4');
        qcmAnswer4Name.innerText = ReponseAleatoire4[0];
        //cheminsReponses.splice(RandomNumber4);

        if (qcmChosenQuestion === questionQcm[0]) {
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

            console.log(validAnswertoGet);
                    
        } else if (qcmChosenQuestion === questionQcm[1]) {
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
                        
            console.log(validAnswertoGet);
        }
}

const radios = document.querySelectorAll('.multipleform__input');
console.log(radios);
radios.forEach((radio) => {
    radio.addEventListener('click', () => {
        console.log("test");
        if (radio.checked) {
            const radioLabel = radio.nextElementSibling;
            var radioChosen = radioLabel.textContent;

            console.log(radioChosen);
            
            checkAnswerAndDisplayNextQuestion(radioChosen,radio);
        };
    });
});

function checkAnswerAndDisplayNextQuestion(radioChosen,radio){ 
    
    Ambianceaudio;

    var data = jsonData;

    if (radioChosen === validAnswertoGet) {
        score = score + 1;
        console.log(score);
        radio.checked = false;
    } else {
        life = life - 1;
        console.log(life);
        radio.checked = false;
    }

    if (questionNumber < 20 && life > 0) {
        qcmLabel.classList.add('hidden');
        Ambianceaudio.pause();
        ChooseQuestion(data);
    } else if (life === 0) {
        questionsSection.classList.add('hidden');
    }
}

function pictureQuestionLoader(data) {
    questionsSection.classList.remove('hidden');
    pictureGame.classList.remove('hidden');

    var cheminsAudio = data.musics;
    var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
    var Ambianceaudio = new Audio(cheminAleatoire);
    Ambianceaudio.loop = true;

    Ambianceaudio.play();

    var pictureQuestion = data.questions[1];
    var pictureQuestionChosen = pictureQuestion[Math.floor(Math.random() * pictureQuestion.length)];
    var pictureLabel = document.querySelector('.picture__question');
    pictureLabel.innerText = pictureQuestionChosen;

    var cheminsReponses = data.movies;
    shuffle(cheminsReponses);
    var moviePoster = cheminsReponses[0][6];
    var movieName = cheminsReponses[0][0];
    console.log(movieName);
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
    console.log(movieName);

    pictureSubmit.addEventListener('click', function(){
        console.log(pictureInput.value);
        if (pictureInput.value === movieName) {
            score = score + 1;
            console.log(score);
        } else {
            life = life - 1;
            console.log(life);
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

    var cheminsAudio = data.musics;
    var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
    var Ambianceaudio = new Audio(cheminAleatoire);
    Ambianceaudio.loop = true;

    Ambianceaudio.play();

    var trueorfalseQuestion = data.questions[2];
    var trueorfalseQuestionChoose = trueorfalseQuestion[Math.floor(Math.random() * trueorfalseQuestion.length)];
    var trueorfalseQuestionChosen = trueorfalseQuestionChoose[0];
    var trueorfalseLabel = document.querySelector('.trueorfalse__question');
    trueorfalseLabel.innerText = trueorfalseQuestionChosen;

    var trueorfalsecheminsReponses = trueorfalseQuestionChoose[1];
    console.log(trueorfalsecheminsReponses)

    const radios = document.querySelectorAll('.tofradio');
    console.log(radios);
    radios.forEach((radio) => {
        radio.addEventListener('click', () => {
            console.log("test");
            if (radio.checked) {
                var radioChosen = radio.value;
                console.log(radioChosen);

                if (radioChosen === trueorfalsecheminsReponses) {
                    score = score + 1;
                    console.log(score);
                    radio.checked = false;
                } else {
                    life = life - 1;
                    console.log(life);
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

    var cheminsAudio = data.musics;
    var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
    var Ambianceaudio = new Audio(cheminAleatoire);
    Ambianceaudio.loop = true;

    Ambianceaudio.play();

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
        console.log(ReponseAleatoire1);
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = ReponseAleatoire1[0];
        
        var ReponseAleatoire2 = thisorthatcheminsReponses[1];
        console.log(ReponseAleatoire2);
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
        console.log(ReponseAleatoire1);
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = ReponseAleatoire1[0];
        
        var ReponseAleatoire2 = thisorthatcheminsReponses[1];
        console.log(ReponseAleatoire2);
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

        console.log(validAnswertoGet);
    } else if (thisorthatQuestionChosen === thisorthatQuestion[2]) {
        var deadReponseAleatoire1 = thisorthatDeadReponses[0];
        console.log(deadReponseAleatoire1);
        var thisorthatAnswer1Name = document.querySelector('.totradio--1');
        thisorthatAnswer1Name.innerText = deadReponseAleatoire1[0];
        
        var deadReponseAleatoire2 = thisorthatDeadReponses[1];
        console.log(deadReponseAleatoire2);
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
    console.log(radios);
    radios.forEach((radio) => {
        radio.addEventListener('click', () => {
            console.log("test");
            if (radio.checked) {
                const radioLabel = radio.nextElementSibling;
                var radioChosen = radioLabel.textContent;
        
                console.log(radioChosen);
                    
                if (validAnswertoGet.length === 2) {
                    if (radioChosen === validAnswertoGet[0] || radioChosen === validAnswertoGet[1]) {
                        score = score + 1;
                        console.log(score);
                        radio.checked = false;
                    } else {
                        life = life - 1;
                        console.log(life);
                        radio.checked = false;
                       }
                } else if (validAnswertoGet === ReponseAleatoire1[0] || validAnswertoGet === ReponseAleatoire2[0]) {
                    if (radioChosen === validAnswertoGet) {
                        score = score + 1;
                        console.log(score);
                        radio.checked = false;
                    } else {
                        life = life - 1;
                        console.log(life);
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

    var cheminsAudio = data.musics;
    var cheminAleatoire = cheminsAudio[Math.floor(Math.random() * cheminsAudio.length)];
    var Ambianceaudio = new Audio(cheminAleatoire);
    Ambianceaudio.loop = true;

    Ambianceaudio.play();

    var rankQuestion = data.questions[4];
    var rankQuestionChosen = rankQuestion[Math.floor(Math.random() * rankQuestion.length)];
    var rankLabel = document.querySelector('.rank__question');
    rankLabel.innerText = rankQuestionChosen;

    var rankcheminsReponses = data.movies;
    shuffle(rankcheminsReponses);

    var rankBudgetReponses = data.moviesBudget;
    shuffle(rankBudgetReponses);

    if (rankQuestionChosen === rankQuestion[1] || rankQuestionChosen === rankQuestion[2]) {
        console.log(rankQuestionChosen);
        if (rankQuestionChosen === data.questions[4][1]) {
            
            var ReponseAleatoire1 = rankcheminsReponses[0][0];
            console.log(ReponseAleatoire1);
            var cheminNombre = rankcheminsReponses[0][3]
            const card1 = createCard(ReponseAleatoire1, cheminNombre);
            cardcontainer.appendChild(card1);

            var ReponseAleatoire2 = rankcheminsReponses[1][0];
            console.log(ReponseAleatoire2);
            var cheminNombre = rankcheminsReponses[1][3];
            const card2 = createCard(ReponseAleatoire2, cheminNombre);
            cardcontainer.appendChild(card2);

            var ReponseAleatoire3 = rankcheminsReponses[2][0];
            console.log(ReponseAleatoire3);
            var cheminNombre = rankcheminsReponses[2][3];
            const card3 = createCard(ReponseAleatoire3,cheminNombre);
            cardcontainer.appendChild(card3);

            var ReponseAleatoire4 = rankcheminsReponses[3][0];
            console.log(ReponseAleatoire4);
            var cheminNombre = rankcheminsReponses[3][3];
            const card4 = createCard(ReponseAleatoire4, cheminNombre);
            cardcontainer.appendChild(card4);

            var ReponseAleatoire5 = rankcheminsReponses[4][0];
            console.log(ReponseAleatoire5);
            var cheminNombre = rankcheminsReponses[4][3];
            const card5 = createCard(ReponseAleatoire5, cheminNombre);
            cardcontainer.appendChild(card5);

            movienumbers = [rankcheminsReponses[0][3], rankcheminsReponses[1][3], rankcheminsReponses[2][3], rankcheminsReponses[3][3], rankcheminsReponses[4][3]];
        } else if (rankQuestionChosen === data.questions[4][2]){
            var ReponseAleatoire1 = rankcheminsReponses[0][0];
            console.log(ReponseAleatoire1);
            var cheminNombre = rankcheminsReponses[0][2];
            const card1 = createCard(ReponseAleatoire1, cheminNombre);
            cardcontainer.appendChild(card1);

            var ReponseAleatoire2 = rankcheminsReponses[1][0];
            console.log(ReponseAleatoire2);
            var cheminNombre = rankcheminsReponses[1][2];
            const card2 = createCard(ReponseAleatoire2, cheminNombre);
            cardcontainer.appendChild(card2);

            var ReponseAleatoire3 = rankcheminsReponses[2][0];
            console.log(ReponseAleatoire3);
            var cheminNombre = rankcheminsReponses[2][2];
            const card3 = createCard(ReponseAleatoire3, cheminNombre);
            cardcontainer.appendChild(card3);

            var ReponseAleatoire4 = rankcheminsReponses[3][0];
            console.log(ReponseAleatoire4);
            var cheminNombre = rankcheminsReponses[3][2];
            const card4 = createCard(ReponseAleatoire4, cheminNombre);
            cardcontainer.appendChild(card4);

            var ReponseAleatoire5 = rankcheminsReponses[4][0];
            console.log(ReponseAleatoire5);
            var cheminNombre = rankcheminsReponses[4][2];
            const card5 = createCard(ReponseAleatoire5, cheminNombre);
            cardcontainer.appendChild(card5);

            movienumbers = [rankcheminsReponses[0][2], rankcheminsReponses[1][2], rankcheminsReponses[2][2], rankcheminsReponses[3][2], rankcheminsReponses[4][2]];
        } 
    } else if (rankQuestionChosen === rankQuestion[0]) {
        var ReponseAleatoire1 = rankBudgetReponses[0][0];
        console.log(ReponseAleatoire1);
        var cheminNombre = rankBudgetReponses[0][1];
        const card1 = createCard(ReponseAleatoire1, cheminNombre);
        cardcontainer.appendChild(card1);

        var ReponseAleatoire2 = rankBudgetReponses[1][0];
        console.log(ReponseAleatoire2);
        var cheminNombre = rankBudgetReponses[1][1];
        const card2 = createCard(ReponseAleatoire2, cheminNombre);
        cardcontainer.appendChild(card2);

        var ReponseAleatoire3 = rankBudgetReponses[2][0];
        console.log(ReponseAleatoire3);
        var cheminNombre = rankBudgetReponses[2][1];
        const card3 = createCard(ReponseAleatoire3, cheminNombre);
        cardcontainer.appendChild(card3);

        var ReponseAleatoire4 = rankBudgetReponses[3][0];
        console.log(ReponseAleatoire4);
        var cheminNombre = rankBudgetReponses[3][1];
        const card4 = createCard(ReponseAleatoire4, cheminNombre);
        cardcontainer.appendChild(card4);

        var ReponseAleatoire5 = rankBudgetReponses[4][0];
        console.log(ReponseAleatoire5);
        var cheminNombre = rankBudgetReponses[4][1];
        const card5 = createCard(ReponseAleatoire5, cheminNombre);
        cardcontainer.appendChild(card5);

        movienumbers = [rankBudgetReponses[0][1], rankBudgetReponses[1][1], rankBudgetReponses[2][1], rankBudgetReponses[3][1], rankBudgetReponses[4][1]];
    }
    
    //movienumbers = [ReponseAleatoire1, ReponseAleatoire2, ReponseAleatoire3, ReponseAleatoire4, ReponseAleatoire5];
    console.log(movienumbers);

    slotsnumbers = movienumbers.sort(function(a,b){return b-a});
    console.log(slotsnumbers);
    slotNumber(slotsnumbers);



    rankSubmit.addEventListener('click', function() {

        cardNumbersArray;

        if (slotNumber === trueorfalsecheminsReponses) {
            score = score + 1;
            console.log(score);
            radio.checked = false;
        } else {
            life = life - 1;
            console.log(life);
            radio.checked = false;
        }
    
        if (questionNumber < 20 && life > 0) {
            qcmLabel.classList.add('hidden');
            ChooseQuestion(data);
        } else if (life === 0) {
            questionsSection.classList.add('hidden');
        }
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

/*if (score === 10) {
    var cheminMovies = cheminsReponses[Math.floor(Math.random() * cheminMovies.length)];
    var chosenPoster = cheminMovies[6];
    posterImage.src = chosenPoster;
}
            
if (score === 20) {
    const cheminPoster = choisirPosterShinyAleatoire();
    afficherShinyPoster(cheminPoster);
    if (cheminPoster === "./assets/images/shiny/alien.jpg") {
        localStorage.setItem("AlienShiny", "Y");
    }
}*/

/*function getRandomIntInclusive(min,max) {
    min= Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}*/