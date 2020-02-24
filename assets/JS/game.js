// to-do:
// display HP of each dino at the beginning of the game
// caption by how much HP changed
// add a reset button
// add rules
// change HP + attacks
// add styles
// add animation + sound


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
    var currentFighterData;
    var currentFighter;
    var currentEnemyData;
    var currentEnemy;
    var numDefeated = 0;

    

        if (!gameStarted){
            $("#game-play").hide();
            $("#attack").hide();}


    function pickDinoFighter () {
        $(".dino").on("click", function () {
            if (pickFighter) {
                currentFighterData = $(this).data();
                currentFighter = $(this);
                // assigns the chosen dino the role of 'fighter'
                currentFighter.attr("id", "fighter");
                
                // updates stats data on screen
                $("#fighter-HP").html("HP: " + currentFighterData.HP);
                $("#fighter-AP").html("Attack Power: " + currentFighterData.attack);
                // adds green border to chosen fighter
                $("#fighter").css("border", "2px solid green");
                $("#your-dino").prepend($("#fighter"));
                $("#vs").show();
            }
        })
    }


    function pickCurrentOpponent () {
        $(".dino").on("click", function () {
            if (pickEnemy) {
                currentChoice = $(this).data();
                // if (currentChoice.HP > 0 ) {
                currentEnemyData = $(this).data();
                currentEnemy = $(this);
                console.log(currentEnemy);
                $(this).attr("id", "fightingAgainst");
                $("#fightingAgainst").css("border", "2px solid blue");
                $("#your-opponent").prepend($("#fightingAgainst"));
                $("#fightingAgainst").removeAttr("class", "opponent");
                
                $("#opponent-HP").html("HP: " + currentEnemyData.HP);
                $("#opponent-AP").html("Counter-Attack Power: " + currentEnemyData.counterAttack);
                otherOpponents();
                // }
                // else {
                //     gameStarted = false;
                //     pickCurrentOpponent();
                // }
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
            $("#dino-container").show();
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
        if (gameStarted && currentEnemyData.HP > 0 && currentFighterData.HP > 0) {
            // decrease opponent's HP
            currentEnemyData.HP = currentEnemyData.HP-currentFighterData.attack;
            // decrease fighter's HP
            currentFighterData.HP = currentFighterData.HP-currentEnemyData.counterAttack;
            // increase fighter's attack power
            currentFighterData.attack = currentFighterData.attack *2;

            // update HP and attack + counter-attack power on page
            $("#opponent-HP").html("HP: " + currentEnemyData.HP);
            $("#opponent-AP").html("Counter-Attack Power: " + currentEnemyData.counterAttack);
            $("#fighter-HP").html("HP: " + currentFighterData.HP);
            $("#fighter-AP").html("Attack Power: " + currentFighterData.attack);
        }
        if (currentEnemyData.HP <= 0) {
            // mark defeated dino as 'defeated'
            $("#opponent-HP").html("HP: 0");
                $("#opponent-AP").html("Counter-Attack Power: " + currentEnemyData.counterAttack);
            pickEnemy = true;
            whenDefeated();
            selectNext();
        }
        if (currentFighterData.HP <= 0) {
            console.log("Game over");
        }
    });

function selectNext () {
    if (numDefeated === 1) {
        $("#dino-pick").show();
        // $("#dino-container").show();
        $("#dino-pick").text("Choose your NEXT opponent:");
    }
    if (numDefeated === 2) {
        $("#dino-pick").show();
        // $("#dino-container").show();
        $("#dino-pick").text("Choose your LAST opponent:");
    }
    
}

function whenDefeated () {
    currentEnemy.removeAttr("class", "dino");
    
    currentEnemy.removeAttr("class", "opponent");
    
    currentEnemy.removeAttr("id", "fightingAgainst").addClass("defeated");
    
    currentEnemyData = "";
    currentEnemy = "";
    
    $(".defeated").css("border", "none");
    $("#defeated-dinos").append($(".defeated"));
    $("#defeated-dinos").hide();
    numDefeated++;
}
