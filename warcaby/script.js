const blackfig = '<img src=\"blackfig.png\">';
const whitefig = '<img src=\"whitefig.png\">';

let whosTurn = true;
let turnText = document.getElementById("turn");
let turnColor = "Ruch białych";

let idString;

let start;
let destination;
let possibleDestination1;
let possibleDestination2;

function switchTurn(){
    whosTurn = !whosTurn;
    console.log(whosTurn);

    if(whosTurn ==  true) {
        turnColor = "Ruch białych";
        turnText.innerHTML = turnColor;
    }
    else {
        turnColor = "Ruch czarnych";
        turnText.innerHTML = turnColor;
    }
}

function move(event) {
    if(event.currentTarget.innerHTML == blackfig) {
        if(whosTurn == true) {
            alert("Ruch białych!");
        }
        else {
            event.currentTarget.style.backgroundColor = "#00FF00";

            idString = event.currentTarget.id;
            console.log(idString);
            console.log(idString.length);

            start = Number(idString);
            console.log(start);
      


        }
    }
    else if(event.currentTarget.innerHTML == whitefig) {
        if(whosTurn == false) {
            alert("Ruch czarnych!");
        }
        else {
            event.currentTarget.style.backgroundColor = "#00FF00";

            idString = event.currentTarget.id;
            console.log(idString);
            console.log(idString.length);
        
            start = Number(idString);
            console.log(start);

            
        }
    }
    else {
        alert("Na tym polu nie ma pionka!");
    }
   console.log(event.currentTarget.innerHTML);
}

const cells = document.querySelectorAll(".field");

console.log(cells, cells[0]);

cells.forEach(function(cell){
    cell.addEventListener("click", move);
});