// definere html elements
const board = document.getElementById("gameboard");
const instruksjonTekst = document.getElementById("instruksjon")
const score = document.getElementById('score')
const highScoreTeskt = document.getElementById('highScore');


// definere spill variabler
const gridSize = 20;
let slange = [{ x: 10, y: 10 }]
let food = genererMat();
let direction = "right"
let highScore = 0;
let spillInterval;
let spillFartDelay = 200;
let spillStartet = false;


// tegner spillet, slangen og maten
function tegn() {
    board.innerHTML = "";
    tegnslange();
    tegnMat();
    oppdaterScore();
    oppdaterHighScore()
}

// tegn slange 

function tegnslange() {
    if (spillStartet) {
        slange.forEach((segment) => {
            const snakeElement = createGameElement("div", "snake");
            setPosition(snakeElement, segment)
            board.appendChild(snakeElement)
        })
    }
}

// lage en slange eller mat div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// setter en posisjon til slangen eller maten 
function setPosition(element, position) {
    element.style.gridColumn = position.x; //betyr altså x = 10
    element.style.gridRow = position.y; // betyr altså y = 10
}

// tester tegne funksjon
// tegn();

function tegnMat() {
    if (spillStartet) {
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

//funksjon for å generere mat et tilfeldig sted på spill-bordet 

function genererMat() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

//bevege slangen funksjon

function beveg(params) {
    const hode = { ...slange[0] } // en kopi av "slange"
    switch (direction) { // for å bevege på grid
        case "up": // oppover
            hode.y--;
            break;

        case "down":
            hode.y++;
            break;

        case "left":
            hode.x--;
            break;

        case "right":
            hode.x++;
            break;

    }
    slange.unshift(hode)

    // slange.pop() //gir en illusjon av at slangen beveger seg, 
    //, men egentlig legger den til en div foran dit man skal og sletter den forige
    // hvis man vil legge til deler på slangen fjerner man bare slange.pop()
    if (hode.x == food.x && hode.y == food.y) {
        food = genererMat();
        // clearInterval(); //ressetter sånn at vi unngår feilmeldinger
    } else {
        slange.pop();
    }

}



//test bevegelse

// setInterval(() => {
//     beveg(); // beveger først
//     tegn() // derreter tegner den nye posisjon
// }, 200);

//start spill funksjon

function startSpill() {
    spillStartet = true; // gjør at vi holder spillet gående
    instruksjonTekst.style.display = "none";
    spillInterval = setInterval(() => {
        beveg();
        sjekk_Kollisjon()
        tegn();
    }, spillFartDelay);
}

function tastetrykk(event) {
    if (
        (!spillStartet && event.code === "Space") ||
        (!spillStartet && event.code === " ")
    ) {
        startSpill();
    } else {
        switch (event.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down"
                break;
            case "ArrowRight":
                direction = "right"
                break;
            case "ArrowLeft":
                direction = "left"
                break;
        }
    }
}
document.addEventListener("keydown", tastetrykk)

function sjekk_Kollisjon() {
    const hode = slange[0];
    if (hode.x < 1 || hode.x > gridSize || hode.y < 1 || hode.y > gridSize) {
        RestartSpill();
    }

    for (let i = 1; i < slange.length; i++) {
        if (hode.x === slange[i].x && hode.y === slange[i].y) {
            RestartSpill()

        }
        // sjekker om selve kroppen til slangen er på samme posisjon som hodet 
    }
}

function RestartSpill() {
    slange = [{ x: 10, y: 10 }];
    food = genererMat();
    direction = 'right';
    oppdaterScore()
    oppdaterHighScore()
    stopSpill()
}

function oppdaterScore() {
    const currentScore = slange.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');

}

function stopSpill() {
    clearInterval(spillInterval);
    spillStartet = false;
    instruksjonTekst.style.display = 'block';
}

function oppdaterHighScore() {
    const currentScore = slange.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreTeskt.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreTeskt.style.display = 'block';
}



