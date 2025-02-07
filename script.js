// definere html elements
const board = document.getElementById("gameboard");

// definere spill variabler
let slange = [{x: 10, y:10}]

// tegner spillet, slangen og maten
function tegn() {
    board.innerHTML = "";
    tegnslange();
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
tegn()

