const blackfig = '<img src=\"blackfig.png\">';
const whitefig = '<img src=\"whitefig.png\">';

const cells = document.querySelectorAll(".field");

//console.log(cells, cells[0]);

cells.forEach(function(cell){
    cell.addEventListener("click", selectCell);
});

let whosTurn = true;
let turnText = document.getElementById("turn");
let turnColor = "Ruch białych";

let idString;

let start;
let destination;
let possibleDestination1;
let possibleDestination2;

let selected = false;

function switchTurn(){
    whosTurn = !whosTurn;
    console.log(whosTurn);

    if(whosTurn ==  true) {
        turnColor = "Ruch białych";
        turnText.innerHTML = turnColor;
        return;
    }
    turnColor = "Ruch czarnych";
    turnText.innerHTML = turnColor;

    selected = false;
}

function selectCell(e) {
    if(e.currentTarget.innerHTML == blackfig) {
        if(whosTurn == true) {
            alert("Ruch białych!");
        }
        else {
            e.currentTarget.style.backgroundColor = "#00FF00";

            convertCell(e);
      
            selected = true;
        }
    }
    else if(e.currentTarget.innerHTML == whitefig) {
        if(whosTurn == false) {
            alert("Ruch czarnych!");
        }
        else {
            e.currentTarget.style.backgroundColor = "#00FF00";

            let y = e.target.parentElement.parentElement.rowIndex - 1;
            let x = e.target.parentElement.cellIndex - 1;

            move(convertCell(x, y));

            selected = true;
        }
    }else if(!selected){
        alert("Na tym polu nie ma pionka!");
    }
   console.log(e.currentTarget.innerHTML);
}

function convertCell(x, y){
    return (8 * y + x);
}

function move(perfectCell){
    for(let i = -1; i <= 1; i++){
        if(i == 0) continue;
        for(let j = -1; j <= 1; j++){
            if(j == 0) continue;
            console.log(i, j);
            /* let subjectCell = perfectCell + convertCell(j, i);
            console.log(subjectCell, i, j, perfectCell);
            if(cells[subjectCell].innerHTML == ''){
                cells[subjectCell].style.backgroundColor = '#69B00B'
            } */
        }
    }
}