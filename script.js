// definere html elements
const board = document.getElementById("gameboard");
const instruksjonTekst = document.getElementById("instruksjon")

// definere spill variabler
const gridSize = 20;
let slange = [{ x: 10, y: 10 }]
let food = genererMat();
let direcion = "down"
let spillInterval;
let spillFartDelay = 200;
let spillStartet = false;


// tegner spillet, slangen og maten
function tegn() {
    board.innerHTML = "";
    tegnslange();
    tegnMat();
}

// tegn slange 

function tegnslange() {
    slange.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement)
    })
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
tegn();

function tegnMat() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
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
    switch (direcion) { // for å bevege på grid
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
        // sjekk-Kollisjon()
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
                direcion = "up"
                break;
            case "ArrowDown":
                direcion = "down"
                break;
            case "ArrowRight":
                direcion = "right"
                break;
            case "ArrowLeft":
                direcion = "left"
                break;
        }
    } 
}
document.addEventListener("keydown", tastetrykk)


