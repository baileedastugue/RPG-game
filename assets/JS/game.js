$(document).ready(function(){
    
    // var dino1 = document.getElementById("dinosaur1");

    dino1 = {
        HP: 500,
        attack: 10,
        counterAttack: 80
    };


    var dino2 = {
        HP: 200,
        attack: 2,
        counterAttack: 25
    };
    
    var dino3 = {
        HP: 100,
        attack: 9,
        counterAttack: 16 
    };
    
    var dino4 = {
        HP: 300,
        attack: 15,
        counterAttack: 14 
    };

    var pickFighter = true;
    var pickEnemy = false;
    var gameStarted = false;
    var currentFighter;
    var currentEnemy;

    $("#dinosaur1").on("click", function () {
        if (!gameStarted) {
            pickFighter = false;
            pickEnemy = true;
            currentFighter = dino1;
        }
        console.log(currentFighter);
    });

    $("#dinosaur2").on("click", function () {
        if (!gameStarted) {
            pickFighter = false;
            pickEnemy = true;
            currentFighter = dino2;
        }
        console.log(currentFighter);
    });

    $("#dinosaur3").on("click", function () {
        if (!gameStarted) {
            pickFighter = false;
            pickEnemy = true;
            currentFighter = dino3;
        }
        console.log(currentFighter);
    });

    $("#dinosaur4").on("click", function () {
        if (!gameStarted) {
            pickFighter = false;
            pickEnemy = true;
            currentFighter = dino4;
        }
        console.log(currentFighter);
    });

    $(".dino").on("click", function () {
        if (pickEnemy) {

        }
    });

    $("#attack").on("click", function () {

    });

});