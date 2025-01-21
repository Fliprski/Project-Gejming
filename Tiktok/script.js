const pole = document.querySelectorAll("td");
const reset = document.querySelector("reset");

let round = false;

pole.forEach(function(pole2){
    pole2.addEventListener('mousedown', clickHandler);
});

function clickHandler(event){
    if(event.target.innerHTML) return;
    round = !round;
    if(round){
        event.target.innerHTML = 'O';
        return;
    }
    event.target.innerHTML = 'X';
}

reset.forEach(function(reset2){
    reset2.addEventListener('mousedown', ResetFunc);
});

function ResetFunc(td){
    td.target.innerHTML = '';
}