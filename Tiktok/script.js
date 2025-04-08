const cells = document.querySelectorAll("td");
const statusDiv = document.getElementById("status");
const scoreX = document.getElementById("scoreX"); // Wybierz element wyniku dla gracza X
const scoreO = document.getElementById("scoreO"); // Wybierz element wyniku dla gracza O
let currentPlayer = "X";
let scores = { X: 0, O: 0 }; // licznik punktów dla graczy X i O

// Dodawanie Event Listener do każdej komórki
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(event) {
    const cell = event.target;

    // Zapobiegaj wielokrotnemu kliknięciu w tę samą komórkę
    if (cell.textContent !== "") return;

    // Ustawienie tekstu w komórce na aktualnego gracza
    cell.textContent = currentPlayer;

    // Sprawdzenie wygranej lub remisu
    if (checkWin(currentPlayer)) {
        statusDiv.textContent = `${currentPlayer} wygrywa!`;
        updateScore(currentPlayer); // Zaktualizowanie wyniku
        resetBoard();
        return;
    } 
    
    if (checkDraw()) {
        statusDiv.textContent = "Remis!";
        resetBoard();
        return;
    }

    // Zmiana gracza
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Ruch gracza: ${currentPlayer}`;
}

function checkWin(player) {
    const winningCombinations = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
        ["A1", "B2", "C3"],
        ["A3", "B2", "C1"]
    ];

    return winningCombinations.some(combination => {
        return combination.every(id => {
            const cell = document.getElementById(id);
            return cell.textContent === player;
        });
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== "");
}

function resetBoard() {
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = "X";
    statusDiv.textContent = `Ruch gracza: ${currentPlayer}`;
}

function updateScore(player) {
    scores[player]++;
    if (player === "X") {
        scoreX.textContent = scores[player]; // Odświeżenie wyniku gracza X
    } else {
        scoreO.textContent = scores[player]; // Odświeżenie wyniku gracza O
    }
}
