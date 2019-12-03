var wordsArray = [
    "steak",
    "repas",
    "poivre",
    "frite",
    "boulette",
    "fourchette",
    "assiette",
];
var dejaPropose = [];
var selectPlay = document.getElementById("selectPlay");
var submitLetter = document.getElementById("submitLetter");
var yourLetter = document.getElementById("yourLetter");
var choosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var positionLetter = 0;
var nbreLetter = 0;
var toFillArray;
var proposition = document.getElementById("proposition");
var compteur;

var word = document.getElementById("word");

for (var i = 0; i < choosenWord.length; i++) {
    var spanLetter = document.createElement("span");
    word.appendChild(spanLetter);
}
var from = 0;
selectPlay.onchange = function () {
    draw();
    if (selectPlay.value === "noob") {
        compteur = 6;
    } else {
        compteur = 4;
    }
    document.getElementById("compteur").innerHTML = "Il vous reste " + compteur + " essais";
    play();
};

function play() {
    document.getElementById("playContent").style.display = "none";
    document.getElementById("play").style.display = "block";

    submitLetter.onclick = function () {

        if (dejaPropose.indexOf(yourLetter.value) === -1) {
            dejaPropose.push(yourLetter.value);
            yourLetter.value = yourLetter.value.toLowerCase();
            if (yourLetter.value.length === 1) {
                var li = document.createElement("li");
                proposition.appendChild(li);
                li.innerHTML += yourLetter.value;
                toFillArray = word.getElementsByTagName("span");
                positionLetter = choosenWord.indexOf(yourLetter.value, from);
                if (positionLetter > -1) {
                    while (positionLetter > -1) {
                        positionLetter = choosenWord.indexOf(yourLetter.value, from);
                        from = positionLetter + 1;
                        if (positionLetter !== -1) {
                            toFillArray[positionLetter].innerHTML = yourLetter.value;
                            nbreLetter++;
                        }
                    }
                } else {
                    compteur--;
                    document.getElementById("compteur").innerHTML = "Il vous reste <strong>" + compteur + "</strong> essais";
                    document.getElementById("message").innerHTML = "La lettre <strong>" + yourLetter.value + "</strong> n'est pas dans le mot";
                    draw();
                }
                positionLetter = 0;
                if (compteur === 0) {
                    document.getElementsByClassName("container")[0].innerHTML = "Vous avez perdu, le mot était: " + choosenWord;
                } else if (nbreLetter === choosenWord.length) {
                    document.getElementsByClassName("container")[0].innerHTML = "Vous avez gagné, le mot était bien: " + choosenWord;
                }
                yourLetter.value = "";
            } else {
                document.getElementById("message").innerHTML = "Entrez une seule lettre SVP";
            }
        }
    };
}

function draw() {
    var canvas = document.getElementById('pendu');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        if (compteur === 5) {
            ctx.fillRect(20, 20, 5, 280);
            ctx.fillRect(20, 20, 125, 5);
            ctx.fillRect(145, 20, 5, 40);
        } else if (compteur === 4) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(147.5, 75, 15, 0, 2 * Math.PI);//tete
        } else if (compteur === 3) {
            ctx.fillRect(20, 20, 5, 280);
            ctx.fillRect(20, 20, 125, 5);
            ctx.fillRect(145, 20, 5, 40);
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(147.5, 75, 15, 0, 2 * Math.PI);//tete
            ctx.moveTo(147.5, 90);//corps
            ctx.lineTo(147.5, 155);//corps
        } else if (compteur === 2) {
            ctx.lineTo(110, 185);//pied
        } else if (compteur === 1) {
            ctx.moveTo(147.5, 155);//pied
            ctx.lineTo(185, 185);//pied
        } else if (compteur === 0) {
            ctx.moveTo(147.5, 120);//bras
            ctx.lineTo(120, 130);//bras
            ctx.moveTo(147.5, 120);//bras
            ctx.lineTo(175, 130);//bras
        }
        ctx.stroke();
    } else {
        alert("Canvas n'est pas supporté");
    }
}

