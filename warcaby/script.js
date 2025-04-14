const blackfig = '<img src=\"blackfig.png\">';
const whitefig = '<img src=\"whitefig.png\">';

let antiFig = blackfig;

function currentFig(){
    if(antiFig == whitefig){
        return blackfig;
    }
    return whitefig;
}

const markedClass = 'mark';

const turnText = document.getElementById("turn");

const cells = document.querySelectorAll(".field");

cells.forEach(function(cell){
    cell.addEventListener("click", selectCell);
});

let matrix = [];

for(let i = 0; i < 8; i++){
    matrix[i] = [];
    for(let j = 0; j < 8; j++){
        matrix[i][j] = cells[(8 * i + j)];
    }
}

let originY = 0;
let originX = 1;

let checksOnBoard = 0;
let capture = false;

let checkBlack = 12;
let checkWhite = 12;

function switchTurn(){
    if(antiFig == whitefig){
        antiFig = blackfig;
        turnText.innerHTML = "Ruch białych";
        return;
    }
    antiFig = whitefig;
    turnText.innerHTML = "Ruch czarnuch";
}

function selectCell(e){

    if(e.currentTarget.innerHTML == antiFig){
        alert("Nie twój ruch!");
        return;
    }

    if(e.currentTarget.innerHTML == '' && !e.currentTarget.classList.contains(markedClass)){
        alert("Na tym polu nie ma pionka!");
        return;
    }

    e.currentTarget.style.backgroundColor = "#00dd00";

    matrix[originY][originX].style.backgroundColor = '';

    if(e.currentTarget.classList.contains(markedClass)){
        move(originX, originY, e.currentTarget);

        originY = e.currentTarget.parentElement.rowIndex - 1;
        originX = e.currentTarget.cellIndex - 1;

        clearMarks(originX, originY);
        moveCheck(originX, originY);

        if(!capture){
            clearMarks();
            if(!checksOnBoard){
                switchTurn();
                return;
            }
        }

        if(!checksOnBoard){
            switchTurn();
            return;
        }

        return;
    }

    originY = e.currentTarget.parentElement.rowIndex - 1;
    originX = e.currentTarget.cellIndex - 1;

    clearMarks(originX, originY);
    moveCheck(originX, originY);
}

function moveCheck(x, y){
    for(let offsetY = -1; offsetY <= 1; offsetY++){
        if(offsetY == 0) continue;
        if(!matrix[y + offsetY]) continue; //safety for out of bounds
        for(let offsetX = -1; offsetX <= 1; offsetX++){
            if(offsetX == 0) continue;
            if(!matrix[y + offsetY][x + offsetX]) continue; //safety for out of bounds

            if(matrix[y + offsetY][x + offsetX].innerHTML == '' && !matrix[y][x].classList.contains(markedClass)){
                matrix[y + offsetY][x + offsetX].classList.add(markedClass);
                checksOnBoard++;
                continue;
            }

            if(matrix[y + offsetY][x + offsetX].innerHTML == antiFig){
                if(!matrix[y + offsetY * 2]) continue; //safety for out of bounds
                if(!matrix[y + offsetY * 2][x + offsetX * 2] || matrix[y + offsetY * 2][x + offsetX * 2].innerHTML != '') continue;

                matrix[y + offsetY * 2][x + offsetX * 2].classList.add(markedClass);
                checksOnBoard++;
            }
        }
    }
}

function move(x, y, moveToCell){
    capture = false;
    let currentX = moveToCell.cellIndex - 1;
    let currentY = moveToCell.parentElement.rowIndex - 1;

    if(Math.abs(x - currentX) > 1){
        let captureX = (x + currentX)/2;
        let captureY = (y + currentY)/2;

        matrix[captureY][captureX].innerHTML = '';
        capture = true;

        checkWin();
    }
    matrix[y][x].innerHTML = '';
    matrix[currentY][currentX].innerHTML = currentFig();
}

function clearMarks(x, y){
    checksOnBoard = 0;
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(x == j && y == i) continue;
            matrix[i][j].classList.remove(markedClass);
        }
    }
}

function checkWin(){
    if(antiFig == whitefig) checkWhite--;
    if(antiFig == blackfig) checkBlack--;

    if(checkWhite == 0){
        alert("Wygrywa czarny!");
    }

    if(checkBlack == 0){
        alert("Wygrywa biały!");
    }
}