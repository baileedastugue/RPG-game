$(document).ready(function(){
    
    // var dino1 = document.getElementById("dinosaur1");

    $("#dinosaur1").data({
        name: "da dino",
        HP: 200,
        attack: 8,
        counterAttack: 80}
    );

    $("#dinosaur2").data( {
        name: "big guy",
        HP: 200,
        attack: 9,
        counterAttack: 25
    });
    
    $("#dinosaur3").data( {
        name: "lil cute one",
        HP: 100,
        attack: 9,
        counterAttack: 16 
    });
    
    $("#dinosaur4").data( {
        name: "just doing his best",
        HP: 300,
        attack: 2,
        counterAttack: 14 
    });

    var pickFighter = true;
    var pickEnemy = false;
    var gameStarted = false;
    var currentFighter;
    var currentEnemy;

    // console.log($("#dinosaur1").data());

    $(".dino").on("click", function () {
        if (pickFighter) {
            currentFighter = $(this).data();
            console.log("fighter: " + currentFighter.name);
        }
        if (pickEnemy) {
            currentEnemy = $(this).data();
            console.log("enemy: " + currentEnemy.name);
        }
    });

    // prompts user to pick their fighter and their enemy dino
    $(".dino").on("click", function (){
        if (pickFighter) {
            pickFighter = false;
            pickEnemy = true;
            $("#dino-pick").text("Choose your opponent:");
        }
        else if (pickEnemy) {
            pickEnemy = false;
            gameStarted = true;
            $("#dino-pick").hide();
        }
    })

    $("#attack").on("click", function () {
        if (gameStarted && currentEnemy.HP > 0 && currentFighter.HP > 0) {
            currentEnemy.HP = currentEnemy.HP-currentFighter.attack;
            currentFighter.attack = currentFighter.attack *2;
            console.log("Enemy's HP: " + currentEnemy.HP);
            currentFighter.HP = currentFighter.HP-currentEnemy.counterAttack;
            console.log("Fighter's HP: " + currentFighter.HP);
        }
        if (currentEnemy.HP <= 0) {
            console.log("Choose another opponent");
            pickEnemy = true;
        }
        if (currentFighter.HP <= 0) {
            console.log("Game over");
        }
    });

});