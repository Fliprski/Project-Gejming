/*====================*/
const tableWidth = 30;
const tableHeight = 15;
const bombAmountModifier = 0.25;

const bombMarker = '💣';
const safetyMarker = 'S';
const flagMarker = '🚩';

const colors = ['#000000', '#2cb000', '#00b049', '#00b09b', '#005bb0', '#6f00b0', '#b000b0', '#d16d02', '#d1ce02'];

const visibleClass = 'visible';
/*====================*/

const bombAmount = Math.ceil((tableHeight * tableWidth) * bombAmountModifier);
//console.log(bombAmount);

let bombCount = 0;
let flagsOnField = 0;
let gameEnded = false;

let matrix = [];

let cellCount = 0;

const body = document.body;
const table = document.createElement('table');
const display = document.querySelector('#display');

document.addEventListener('contextmenu', function (e){
    e.preventDefault();
}, false);

tableCreate();

const allCells = table.querySelectorAll('td');

function tableCreate(){
    for (let i = 0; i < tableHeight; i++){
        const tr = table.insertRow();
        matrix[i] = [];
        for (let j = 0; j < tableWidth; j++){
            const td = tr.insertCell();
            matrix[i][j] = 0;

            td.addEventListener('mousedown', clickHandler);
        }
    }
    body.appendChild(table);
}

function generateMap(){
    //randomly spawning bombs
    while(!(bombCount == bombAmount)){
        let x = Math.floor(Math.random() * tableWidth);
        let y = Math.floor(Math.random() * tableHeight);
        if(matrix[y][x] == bombMarker || matrix[y][x] == safetyMarker) continue;
        matrix[y][x] = bombMarker;
        bombCount++;
    }

    //assign surrouding bombs number to every cell
    for (let i = 0; i < tableHeight; i++){
        for (let j = 0; j < tableWidth; j++){
            if(matrix[i][j] == bombMarker) continue;

            cellCount = 0;

            for(let offsetY = -1; offsetY <= 1; offsetY++){
                for(let offsetX = -1; offsetX <= 1; offsetX++){
                    try{
                        if(matrix[i + offsetY][j + offsetX] == bombMarker){
                            cellCount++;
                        }
                    }
                    catch(error){}
                }
            }
            matrix[i][j] = cellCount;
        }
    }

    //inputting values from the matrix into the html table + assigning colors for each cell
    allCells.forEach((cell) => {
        if(!matrix[cell.parentElement.rowIndex][cell.cellIndex]) return;
        cell.innerHTML = matrix[cell.parentElement.rowIndex][cell.cellIndex];
        if(matrix[cell.parentElement.rowIndex][cell.cellIndex] == bombMarker){
            //cell.style.color = 'red';
            return;
        }
        cell.style.color = colors[matrix[cell.parentElement.rowIndex][cell.cellIndex]];
    });
}

function matrixToTable(x, y){
    return allCells[y * tableWidth + x];
}

function clickHandler(e){
    if(gameEnded) return;
    let x = e.target.cellIndex;
    let y = e.target.parentElement.rowIndex;

    //leftclick action
    if(!e.button && !matrixToTable(x, y).classList.contains(visibleClass)){
        if(matrix[y][x] == bombMarker){
            endGame();
            return;
        }
        if (!bombCount) {
            //placing safeties around the first click - guarantees a good spawning conditions
            for(let offsetY = -1; offsetY <= 1; offsetY++){
                for (let offsetX = -1; offsetX <= 1; offsetX++){
                    try{
                        matrix[y + offsetY][x + offsetX] = safetyMarker;
                    }
                    catch(error){}
                }
            }
            generateMap();
        }

        revealCell(x, y);

        emptyCheck(x, y);
        updateDisplay();
        checkWin();
        return;
    }
    //middle/rightclick action
    toggleFlag(x, y);
    checkWin();
}

function updateDisplay(){
    display.innerHTML = `All bombs: ${bombAmount} Flags: ${flagsOnField}/${bombAmount}`;
}

function emptyCheck(x, y){
    for(let offsetY = -1; offsetY <= 1; offsetY++){
        for(let offsetX = -1; offsetX <= 1; offsetX++){
            if(y + offsetY < 0 || y + offsetY >= tableHeight || x + offsetX < 0 || x + offsetX >= tableWidth) continue; //safety to not escape the matrix
            //if clicking on number and number has empty next to it - grace check, if no empty - no grace check
            if(!matrix[y + offsetY][x + offsetX] && !matrixToTable(x + offsetX, y + offsetY).classList.contains(visibleClass)){
                revealCell(x + offsetX, y + offsetY);
                emptyCheck(x + offsetX, y + offsetY);
                //debuggingRevealCell(x + offsetX, y + offsetY);
                continue;
            }
            if(matrix[y][x]) continue;
            if(matrix[y + offsetY][x + offsetX] != bombMarker){
                revealCell(x + offsetX, y + offsetY);
                //debuggingRevealCell(x + offsetX, y + offsetY);
            }
        }
    }
}

function revealCell(x, y){
    matrixToTable(x, y).classList.add(visibleClass);
}

function endGame(){
    gameEnded = true;

    allCells.forEach((cell) => {
        if(matrix[cell.parentElement.rowIndex][cell.cellIndex] == bombMarker){
            revealCell(cell.cellIndex, cell.parentElement.rowIndex);
        }
    });

    display.innerHTML = `GAME OVER :\(`;
}

function makeAllSoftVisible(){
    allCells.forEach(function(cell){
        cell.style.opacity = 1;
    });
    console.log('Turned on soft visibility for all cells');
}

/* function debuggingRevealCell(x, y){
    matrixToTable(x, y).style.borderColor = 'green';
} */

function toggleFlag(x, y){
    let currentCell = matrixToTable(x, y);
    if(currentCell.innerHTML == flagMarker){
        currentCell.classList.remove(visibleClass);
        currentCell.innerHTML = matrix[y][x];
        flagsOnField--;
        updateDisplay();
        return;
    }
    if(currentCell.classList.contains(visibleClass) || !bombCount) return;
    currentCell.classList.add(visibleClass);
    currentCell.innerHTML = flagMarker;
    flagsOnField++;
    updateDisplay();
}

function checkWin(){
    let visibleCells = 0;

    allCells.forEach(function(cell){
        visibleCells += cell.classList.contains(visibleClass);
    });

    if(flagsOnField == bombAmount && visibleCells == allCells.length){
        console.log('win');
    }
}