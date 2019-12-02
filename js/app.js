var wordsArray = [
    "steak",
    "repas",
    "poivre",
    "frite",
    "boulette",
    "fourchette",
    "assiette",
];
var submitLetter = document.getElementById("submitLetter");
var yourLetter = document.getElementById("yourLetter");
var choosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var positionLetter = 0;
var nbreLetter = 0;
var toFillArray;
var compteur = 6;
document.getElementById("compteur").innerHTML = "Il vous reste " + compteur + " essais";
var word = document.getElementById("word");

for (var i = 0; i < choosenWord.length; i++) {
    var spanLetter = document.createElement("span");
    word.appendChild(spanLetter);
}
var from = 0;
submitLetter.onclick = function () {

    if (yourLetter.value.length > 0 && yourLetter.value.length < 2) {
        toFillArray = word.getElementsByTagName("span");
        positionLetter = choosenWord.indexOf(yourLetter.value, from);
        if (positionLetter > -1) {
            while (positionLetter > -1) {

                positionLetter = choosenWord.indexOf(yourLetter.value, from);
                from = positionLetter + 1;
                if (positionLetter !== -1) {
                    toFillArray[positionLetter].innerHTML = yourLetter.value;
                    nbreLetter ++;
                }
            }
        } else {
            compteur--;
            document.getElementById("compteur").innerHTML = "Il vous reste <strong>" + compteur + "</strong> essais";
            document.getElementById("message").innerHTML = "La lettre <strong>" + yourLetter.value + "</strong> n'est pas dans le mot";
        }
        positionLetter = 0;
        if (compteur === 0) {
            document.getElementsByClassName("container")[0].innerHTML = "Vous avez perdu, le mot était: " + choosenWord;
        } else if(nbreLetter === choosenWord.length){
            document.getElementsByClassName("container")[0].innerHTML = "Vous avez gagné, le mot était bien: " + choosenWord;
        }
    } else {
        document.getElementById("message").innerHTML = "Entrez une seule lettre SVP";
    }

};
