const pole = document.querySelectorAll("td");

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



