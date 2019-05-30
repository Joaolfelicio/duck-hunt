const keyboardPlayer = prompt("Please insert the name of the keyboard player.");
        const mousePlayer = prompt("Please insert the name of the mouse player.");
        let keyboardPoints = document.querySelector("#keyboardPointsDOM");
        let mousePoints = document.querySelector("#mousePointsDOM");
        let roundNum = document.querySelector("#round");
        let undoBtn = document.querySelector("#undo");
        let winnerBox = document.querySelector('#winner-box')
        let winnerText = document.querySelector('h1');
        const keyboardBox = document.querySelector("#playerBoxKeyboard");
        const mouseBox = document.querySelector("#playerBoxMouse");
        const duck = document.querySelector("#duck");
        document.querySelector("#keyboardPlayer").textContent = keyboardPlayer;
        document.querySelector("#mousePlayer").textContent = mousePlayer;
        let keyboardPointsCounter = 0;
        let mousePointsCounter = 0;
        let lineY;
        let lineX;
        roundNum.textContent = "Round Number: 0";
        let roundNumberCounter = 0;

        randomPos();

        document.addEventListener("keyup", moveDuck);
        duck.addEventListener("click", duckDies);
        undoBtn.addEventListener("click", undo);
        let keyboardWinsTime = setTimeout(duckEscapes, 20000);

        //              MOVE DUCK EVENT
        function moveDuck(event) {

            switch (event.keyCode) {

                case 87:
                case 38: //UP
                    lineY -= 5;

                    if (lineY < 1) {
                        lineY = 90;
                        duck.style.top = lineY + "%";
                    } else {
                        duck.style.top = lineY + "%";
                    }
                    break;

                case 65:
                case 37: //LEFT
                    lineX -= 5;
                    duck.style.transform = "scaleX(-1)";

                    if (lineX < 1) {
                        lineX = 90
                        duck.style.left = lineX + "%";
                    } else {
                        duck.style.left = lineX + "%";
                    }
                    break;

                case 68:
                case 39:
                    lineX += 5; //RIGHT
                    duck.style.transform = "";

                    if (lineX > 90) {
                        lineX = 1
                        duck.style.left = lineX + "%";
                    } else {
                        duck.style.left = lineX + "%";
                    }
                    break;

                case 83:
                case 40: //DOWN
                    lineY += 5;

                    if (lineY > 90) {
                        lineY = 1
                        duck.style.top = lineY + "%";
                    } else {
                        duck.style.top = lineY + "%";

                    }
            }
        }

        //            SHOOTING EVENT
        function duckDies() {
            duckDead();
            removeEvents()
            clearTimeout(keyboardWinsTime);
            updateDashboard("duckDies");
            setTimeout(resetMouse, 1000)
        }

        //              TIMER TO KEYBOARD PLAYER WINNING
        function duckEscapes() {
            duckSurvived();
            removeEvents()
            clearTimeout(keyboardWinsTime);
            updateDashboard("duckSurvives");
            setTimeout(resetKeyboard, 1000);
        }

        //          !FUNCTIONSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
        function resetMouse() {

            if (keyboardPointsCounter < 5 && mousePointsCounter < 5) {
                resetDuck()
                addEvents();
                randomPos();
                duck.classList.remove("dead");
                keyboardWinsTime = setTimeout(duckEscapes, 20000);
            } else {
                winnerText.textContent = mousePlayer + " wins!";
                clearTimeout(keyboardWinsTime);
                showWinnerBox()
            }
        }

        function resetKeyboard() {
            if (keyboardPointsCounter < 5 && mousePointsCounter < 5) {
                resetDuck();
                addEvents();
                randomPos();
                keyboardWinsTime = setTimeout(duckEscapes, 20000);
                duck.classList.remove("duckEscaping");
            } else {
                winnerText.textContent = keyboardPlayer + " wins!";
                clearTimeout(keyboardWinsTime);
                showWinnerBox()
            }
        }

        function undo() {
            roundNumberCounter = 0;
            keyboardPointsCounter = 0;
            mousePointsCounter = 0;
            winnerBox.style.display = "";
            duck.classList.remove("dead");
            duck.classList.remove("duckEscaping");
            resetDuck();
            addEvents();
            updateDashboard(); //FIX THIS BUG
            randomPos();
            clearTimeout(keyboardWinsTime);
            duck.style.backgroundImage = ""
            duck.style.backgroundSize = "";
            duck.style.backgroundPosition = "";
            mouseBox.style.borderColor = "";
            keyboardBox.style.borderColor = "";
            keyboardWinsTime = setTimeout(duckEscapes, 20000);
        }


        function duckDead() {
            duck.classList.add("dead");
            duck.style.backgroundImage = "url('assets/ducksheet.png')"
            duck.style.backgroundSize = "900%";
            duck.style.backgroundPosition = "38% 100%";
            mouseBox.style.borderColor = "#84D310";
            keyboardBox.style.borderColor = "red";
        }

        function duckSurvived() {
            duck.classList.add("duckEscaping");
            duck.style.transform = "";
            mouseBox.style.borderColor = "red";
            keyboardBox.style.borderColor = "#84D310";
        }

        function randomPos() {
            lineY = Math.trunc(Math.random() * 85) + 1;
            lineX = Math.trunc(Math.random() * 85) + 1;
            duck.style.top = lineY + "%";
            duck.style.left = lineX + "%";
        }

        function addEvents() {
            duck.addEventListener("click", duckDies);
            document.addEventListener("keyup", moveDuck);
        }

        function removeEvents() {
            document.removeEventListener("keyup", moveDuck);
            duck.removeEventListener("click", duckDies);
        }

        function updateDashboard(state) {

            if (state == "duckSurvives") {
                keyboardPointsCounter++;
                roundNumberCounter++


            } else if (state == "duckDies") {
                mousePointsCounter++;
                roundNumberCounter++

            }
            keyboardPoints.textContent = keyboardPointsCounter;
            mousePoints.textContent = mousePointsCounter;
            roundNum.textContent = "Round number: " + roundNumberCounter;
        }

        function showWinnerBox() {
            winnerBox.style.display = "flex";
        }

        function resetDuck() {
            duck.style.backgroundImage = ""
            duck.style.transform = "";
            duck.style.backgroundSize = "";
            duck.style.backgroundPosition = "";
            duck.style.backgroundColor = "";
        }