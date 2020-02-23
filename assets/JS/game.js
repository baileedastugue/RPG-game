// to-do:
// display HP of each dino at the beginning of the game
// caption by how much HP changed
// add a reset button
// add rules
// change HP + attacks
// add styles
// add animation + sound

$(document).ready(function(){
    // create dinosaur variables, assign this data to images
    $("#dinosaur1").data( {
        name: "da dino",
        HP: 100,
        attack: 4,
        counterAttack: 20 }
    );

    $("#dinosaur2").data( {
        name: "big guy",
        HP: 130,
        attack: 4,
        counterAttack: 15
    });
    
    $("#dinosaur3").data( {
        name: "lil cute one",
        HP: 60,
        attack: 4,
        counterAttack: 10 
    });
    
    $("#dinosaur4").data( {
        name: "just doing his best",
        HP: 260,
        attack: 4,
        counterAttack: 30 
    });

    var pickFighter = true;
    var pickEnemy = false;
    var gameStarted = false;
    var currentFighter;
    var currentEnemy;
    var numDefeated = 0;

    

        if (!gameStarted){
            $("#game-play").hide();
            $("#attack").hide();}


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
                $("#your-dino").prepend($("#fighter"));
            }
        })
    }

    function pickCurrentOpponent () {
        $(".dino").on("click", function () {
            if (pickEnemy) {
                currentEnemy = $(this).data();
                $(this).attr("id", "fightingAgainst");
                $("#fightingAgainst").css("border", "2px solid blue");
                $("#your-opponent").prepend($("#fightingAgainst"));
                $("#fightingAgainst").removeAttr("class", "opponent");
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
            $("#dino-container").hide();
            $("#game-play").show();
            $("#attack").show();
            $("#dinos-left").append($(".opponent"));
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
            $("#opponent-HP").html("HP: 0");
                $("#opponent-AP").html("Counter-Attack Power: " + currentEnemy.counterAttack);
            pickEnemy = true;
            whenDefeated();
            selectNext();
        }
        if (currentFighter.HP <= 0) {
            console.log("Game over");
        }
    });

function selectNext () {
    if (numDefeated === 1) {
        $("#dino-pick").show();
        $("#dino-pick").text("Choose your NEXT opponent:");
    }
    if (numDefeated === 2) {
        $("#dino-pick").show();
        $("#dino-pick").text("Choose your LAST opponent:");
    }
    
}

function whenDefeated () {
    $("#fightingAgainst").removeAttr("class", "dino");
    $("#fightingAgainst").removeAttr("class", "opponent");
    
    $("#fightingAgainst").removeAttr("id", "fightingAgainst").addClass("defeated");
    $(".defeated").css("border", "none");
    $("#defeated-dinos").append($(".defeated"));
    numDefeated++;
}
})