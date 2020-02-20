$(document).ready(function(){
    
    // var dino1 = document.getElementById("dinosaur1");

    dino1 = {
        name: "da dino",
        HP: 500,
        attack: 10,
        counterAttack: 80
    };


    var dino2 = {
        name: "big guy",
        HP: 200,
        attack: 2,
        counterAttack: 25
    };
    
    var dino3 = {
        name: "lil cute one",
        HP: 100,
        attack: 9,
        counterAttack: 16 
    };
    
    var dino4 = {
        name: "just doing his best",
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
        if (pickFighter) {
            currentFighter = dino1;
            console.log("fighter: " + currentFighter.name);
        }
        else {
            currentEnemy = dino1;
            console.log("enemy: " + currentEnemy.name);
        }
    });

    $("#dinosaur2").on("click", function () {
        if (pickFighter) {
            currentFighter = dino2;
            console.log("fighter: " + currentFighter.name);
        }
        else {
            currentEnemy = dino2;
            console.log("enemy: " + currentEnemy.name);
        }
    });

    $("#dinosaur3").on("click", function () {
        if (pickFighter) {
            currentFighter = dino3;
            console.log("fighter: " + currentFighter.name);
        }
        else {
            currentEnemy = dino3;
            console.log("enemy: " + currentEnemy.name);
        }
    });

    $("#dinosaur4").on("click", function () {
        if (pickFighter) {
            currentFighter = dino4;
            console.log("fighter: " + currentFighter.name);
        }
        else {
            currentEnemy = dino4;
            console.log("enemy: " + currentEnemy.name);
        }
            
    });

    $(".dino").on("click", function () {
        if (pickEnemy) {

        }
    });

    $(".dino").on("click", function (){
        if (!gameStarted && !pickEnemy) {
            pickFighter = false;
            pickEnemy = true;
            console.log("egg");
        }
    })

    $("#attack").on("click", function () {

    });

});