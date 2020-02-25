    var dino1 = {
        name: "Brachiosaurus",
        healthPoints: 100,
        attackPoints: 4,
        counterAttackPoints: 20, 
        isFighter: false,
        isCurrentOpponent: false,
        cardID: "#dinosaur1",
        reference: "dino1",
        defeated: false
    };

    var dino2 = {
        name: "Velociraptor",
        healthPoints: 130,
        attackPoints: 4,
        counterAttackPoints: 15,
        isFighter: false,
        isCurrentOpponent: false,
        cardID: "#dinosaur2",
        reference: "dino2",
        defeated: false
    };
    
    var dino3 = {
        name: "Triceratops",
        healthPoints: 60,
        attackPoints: 4,
        counterAttackPoints: 10, 
        isFighter: false,
        isCurrentOpponent: false,
        cardID: "#dinosaur3",
        reference: "dino3",
        defeated: false
    };
    
    var dino4 = {
        name: "Tyrannosaurus",
        healthPoints: 260,
        attackPoints: 4,
        counterAttackPoints: 30,
        isFighter: false,
        isCurrentOpponent: false,
        cardID: "#dinosaur4",
        reference: "dino4",
        defeated: false
    };

    var characterArray = [dino1, dino2, dino3, dino4];

    var userDecisions = true;
    var fighterChosen = false;
    var opponentChosen = false;
    var gameStarted = false;
    var gameReset = false;

    var chosenFighter = "";
    var chosenOpponent = "";
    var fighterHP = "";
    var fighterAt = "";
    var opponentHP = "";
    var opponentCA = "";
    var $this;
    var userChoice;


    function displayPoints () {
        $("#opponent-HP").html("HP: " + opponentHP);
        $("#opponent-CA").html("Counter-Attack Power: " + opponentCA);
        $("#fighter-HP").html("HP: " + fighterHP);
        $("#fighter-AP").html("Attack Power: " + fighterAt);
    }

    // function for choosing an opponent - will be called after each dinosaur is defeated
    function chooseOpponent() {
        if (!opponentChosen) {
            $("#dino-container").show();
            $("#user-prompt").show();
            $("#user-prompt").html("Choose your next opponent:");
             // when the user chooses their dinosaurs
            for (var i = 0; i < characterArray.length; i++) {
                if (characterArray[i].reference === userChoice && !characterArray[i].isFighter
                    && !characterArray[i].defeated) {
                    chosenOpponent = characterArray[i];
                    chosenOpponent.isCurrentOpponent = true;
                    opponentChosen = true;
                    $("#current-opponent").prepend($(chosenOpponent.cardID));
                    opponentHP = chosenOpponent.healthPoints;
                    opponentCA = chosenOpponent.counterAttackPoints;
                }
            }        
        }
        if (opponentChosen) {
            $("#user-prompt").hide();
        }
    }

    // function for choosing user's fighting dino - will only be called when game is reset
    function chooseFightingDino () {
        if (!fighterChosen) {
            for (var i = 0; i < characterArray.length; i++) {
                if (characterArray[i].reference === userChoice) {
                    chosenFighter = characterArray[i];
                    chosenFighter.isFighter = true;
                    fighterChosen = true;
                    $("#user-fighter").prepend($(chosenFighter.cardID));
                    fighterHP = chosenFighter.healthPoints;
                    fighterAt = chosenFighter.attackPoints;
                }
            }    
        }
    }

    function gameOver () {
        if (gameReset) {
        alert("Game is over - click 'restart' to try again");
        }
    }

    $("#restart").on("click", function () {
        window.location.reload();
    })

    $(".dino").on("click", function() {
        $this = this;
        userChoice = $($this).attr("value");
        chooseFightingDino();
        chooseOpponent();
        displayPoints();
        if (fighterChosen && opponentChosen) {
            $("#dino-container").hide();
        }
        else {
            $("#dino-container").show();
        }
    })


    $("#attack").on("click", function () {
        if (opponentHP > 0 && fighterHP > 0) {
            // decrease opponent's HP
            opponentHP = opponentHP - fighterAt;
            // decrease fighter's HP
            fighterHP = fighterHP - opponentCA;
            // increase fighter's attack power
            fighterAt = fighterAt * 2;

        }

        else if (opponentHP <= 0 && fighterHP > 0) {
            chosenOpponent.isCurrentOpponent = false;
            chosenOpponent.defeated = true;
            $("#defeated-container").append($(chosenOpponent.cardID));
            chosenOpponent = "";
            opponentHP = 0;
            opponentCA = "";
            opponentChosen = false;
            chooseOpponent();
        }

        else {
            gameReset = true;
            gameOver();
        }
        displayPoints();
    })

