const blackfig = '<img src=\"blackfig.png\">';
const whitefig = '<img src=\"whitefig.png\">'

function move(event) {
    if(event.currentTarget.innerHTML == blackfig) {
        
    }
    else if(event.currentTarget.innerHTML == whitefig) {

    }
    else {
        alert("Na tym polu nie ma pionka!");
    }
   console.log(event.currentTarget);
}

const cells = document.querySelectorAll(".field");

console.log(cells, cells[0]);

cells.forEach(function(cell){
    cell.addEventListener("click", move);
});


