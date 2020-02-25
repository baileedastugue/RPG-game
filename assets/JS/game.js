    var dino1 = {
        name: "Brachiosaurus",
        healthPoints: 100,
        attackPoints: 4,
        counterAttackPoints: 15, 
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
        counterAttackPoints: 20,
        isFighter: false,
        isCurrentOpponent: false,
        cardID: "#dinosaur2",
        reference: "dino2",
        defeated: false
    };
    
    var dino3 = {
        name: "Triceratops",
        healthPoints: 100,
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
        healthPoints: 250,
        attackPoints: 4,
        counterAttackPoints: 90,
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
    var opponentNumber;
    var numDefeated = 0;

    let opponentHealth = document.getElementById("opponent-health");
    let fighterHealth = document.getElementById("fighter-health")
    
    $("#player-container").hide();
    $("#defeated-container").hide();
    $("#restart").hide();
    $("#attack").hide();

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
            $("#attack").hide();
            $("#user-prompt").show();
            $("#user-prompt").html("Choose your next opponent:");
             // when the user chooses their dinosaurs
            for (var i = 0; i < characterArray.length; i++) {
                if (characterArray[i].reference === userChoice && !characterArray[i].isFighter
                    && !characterArray[i].defeated) {
                    chosenOpponent = characterArray[i];
                    chosenOpponent.isCurrentOpponent = true;
                    opponentChosen = true;
                    opponentNumber = i;
                    $("#current-opponent").prepend("<img src=" + imageHolder[i] + " width='400px'  id='opponent'>");
                    $(chosenOpponent.cardID).removeClass("col-3");
                    $(chosenOpponent.cardID).addClass("remove-text");
                    opponentHealth.value = chosenOpponent.healthPoints;
                    opponentHealth.max = chosenOpponent.healthPoints;
                    $("#opponent-name").html(chosenOpponent.name);
                    opponentHP = chosenOpponent.healthPoints;
                    opponentCA = chosenOpponent.counterAttackPoints;
                }
            }        
        }
        if (opponentChosen) {
            $("#user-prompt").hide();
        }
    }
    

    var imageHolder = ["assets/images/dino1.png", "assets/images/dino2.png", "assets/images/dino3.png", "assets/images/dino4.png"]

    // function for choosing user's fighting dino - will only be called when game is reset
    function chooseFightingDino () {
        if (!fighterChosen) {
            for (var i = 0; i < characterArray.length; i++) {
                if (characterArray[i].reference === userChoice) {
                    chosenFighter = characterArray[i];
                    chosenFighter.isFighter = true;
                    fighterChosen = true;
                    $("#user-fighter").prepend("<img src=" + imageHolder[i] + " width='400px'>");
                    $(chosenFighter.cardID).removeClass("col-3");
                    $(chosenFighter.cardID).addClass("remove-text");
                    fighterHealth.value = chosenFighter.healthPoints;
                    fighterHealth.max = chosenFighter.healthPoints;
                    $("#fighter-name").html(chosenFighter.name);
                    fighterHP = chosenFighter.healthPoints;
                    fighterAt = chosenFighter.attackPoints;
                }
            }    
        }
    }


    function gameOver () {
        if (gameReset) {
        alert(chosenFighter.name + " met their match - click 'restart' to try again");
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
            $("#restart").hide();
            $("#player-container").show();
            $("#attack").show();

        }
        else {
            $("#dino-container").show();
        }
    })

   function fighterAttacks () {
       // decrease opponent's HP
       opponentHP = opponentHP - fighterAt;
       // increase fighter's attack power
       fighterAt = fighterAt * 2;
       opponentHealth.value -= fighterAt;

   }

   function opponentAttacks () {
       if (opponentHP > 0) {
            // decrease fighter's HP
            fighterHP = fighterHP - opponentCA;
            
            fighterHealth.value -= opponentCA;
       }
   }

    $("#attack").on("click", function () {
        
        if (fighterHP > 0) {
           fighterAttacks();
           displayPoints();
        }
        if (opponentHP > 0) {
            opponentAttacks();
            displayPoints();
        }

        if (opponentHP <= 0 && fighterHP > 0 && !chosenOpponent.defeated && opponentChosen) {
            $("#opponent").remove();
            $("#defeated-container").show();
            chosenOpponent.isCurrentOpponent = false;
            chosenOpponent.defeated = true;
            numDefeated++;
            $("#defeated-container").append("<img src=" + imageHolder[opponentNumber] + " width='400px'>");
            chosenOpponent = "";
            opponentHP = 0;
            opponentCA = "";
            opponentChosen = false;
            chooseOpponent();
        }
        

        else if (fighterHP <= 0) {
            displayPoints();
            gameReset = true;
            $("#restart").show();
            $("#attack").hide();
            gameOver();
        }

        displayPoints();
        if (numDefeated === 3) {
            alert("you won!");
            $("#dino-container").hide();
            $("#restart").show();
            $("#user-prompt").hide();
        }
        
    })

    
    