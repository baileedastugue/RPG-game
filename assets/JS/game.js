$(document).ready(function(){
    // create dinosaur variables, assign this data to images
    $("#dinosaur1").data( {
        name: "da dino",
        HP: 200,
        attack: 8,
        counterAttack: 80}
    );

    $("#dinosaur2").data( {
        name: "big guy",
        HP: 400,
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

    
//     function gameSetup () {
//         if (!gameStarted){
//             $("#game-play").hide();
//             $("#attack").hide();
//     }

// gameSetup();

    function pickDinoFighter () {
        $(".dino").on("click", function () {
            if (pickFighter) {
                currentFighter = $(this).data();
                // assigns the chosen dino the role of 'fighter'
                $(this).attr("id", "fighter");
                
                // updates stats data on screen
                $("#fighter-HP").html("HP: " + currentFighter.HP);
                $("#fighter-AP").html("Attack Power: " + currentFighter.attack);
                // adds green border to chosen fighter
                $("#fighter").css("border", "2px solid green");
            }
        })
    }

    function pickCurrentOpponent () {
        $(".dino").on("click", function () {
            if (pickEnemy) {
                currentEnemy = $(this).data();
                $(this).attr("id", "fightingAgainst");
                $("#fightingAgainst").css("border", "2px solid blue");
                $("#opponent-HP").html("HP: " + currentEnemy.HP);
                $("#opponent-AP").html("Counter-Attack Power: " + currentEnemy.counterAttack);
                otherOpponents();
            }

        })
    }

    $(".dino").on("click", pickDinoFighter());
    $(".dino").on("click", pickCurrentOpponent());


    function otherOpponents () {
        $("img:not(#fighter, #fightingAgainst, .defeated)").attr("class", "opponent");
        $(".opponent:not(#fightingAgainst)").css("border", "2px solid red");
    };

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
        }
        if (gameStarted) {
            console.log("game started");
            $("#dino-pick").hide();
            $("#game-play").show();
            $("#attack").show();
            $("#dinos-left").append($(".opponent:not(#fightingAgainst, .defeated)"));
        }
    });

    // function decreaseHP
    $("#attack").on("click", function () {
        if (gameStarted && currentEnemy.HP > 0 && currentFighter.HP > 0) {
            // decrease opponent's HP
            currentEnemy.HP = currentEnemy.HP-currentFighter.attack;
            // decrease fighter's HP
            currentFighter.HP = currentFighter.HP-currentEnemy.counterAttack;
            // increase fighter's attack power
            currentFighter.attack = currentFighter.attack *2;

            // update HP and attack + counter-attack power on page
            $("#opponent-HP").html("HP: " + currentEnemy.HP);
            $("#opponent-AP").html("Counter-Attack Power: " + currentEnemy.counterAttack);
            $("#fighter-HP").html("HP: " + currentFighter.HP);
            $("#fighter-AP").html("Attack Power: " + currentFighter.attack);
        }
        if (currentEnemy.HP <= 0) {
            // mark defeated dino as 'defeated'
            console.log("Choose another opponent:");
            pickEnemy = true;
            whenDefeated();
        }
        if (currentFighter.HP <= 0) {
            console.log("Game over");
        }
    });

    // $(".defeated").removeAttr("class", "opponent");
    // $("#defeated-dinos").append($(".defeated"));

function whenDefeated () {
    $("#fightingAgainst").removeAttr("class", "opponent");
    $("#fightingAgainst").removeAttr("id", "fightingAgainst").addClass("defeated");
    // $(".defeated").removeAttr("class", "opponent");
    $("#defeated-dinos").append($(".defeated"));
}


// // when fighter + opponent have been selected, move remaining two dino pictures into #dinos-left
//     // when fighter is selected --> add #selected #fighter
//     // when opponent is selected --> add #selected #fighter
// // when picking dinosaurs, hide attack button
// // 
})