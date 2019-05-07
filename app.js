/*
*******************************
VIEWS
*******************************
*/
var generateBoard = (n) => {
    var table = document.getElementById('board');
    var row, col;
    var arr = [];
    for (var i = 0; i < n; i++) {
        row = table.insertRow(i);
        row.id = i;
        arr.push([]);
        for (var j = 0; j < n; j++) {
            col = row.insertCell(j);
            col.id = j;
            arr[i].push(col);
        }
    }
    return arr;
}

/*
*******************************
MODELS
*******************************
*/
var beginMatch = (n = 3, player = 'x') => {
    // clear the board
    var board = document.getElementById('board');
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }

    // Generate n x n board
    board = generateBoard(n);
    var playerOne = board.map(row => row.map(col => 0));
    var playerTwo = board.map(row => row.map(col => 0));
    var pieces = 0;
    var gameInSession = true;

    // Attach event listeners
    board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            cell.addEventListener("click", function () {
                if (cell.innerHTML === '' && gameInSession) {
                    toggleCell(cell, player);
                    pieces++;
                    if (player === 'x') {
                        playerOne[rowIndex][cellIndex] = 1;
                    } else {
                        playerTwo[rowIndex][cellIndex] = 1;
                    }
                    if (won(playerOne) || won(playerTwo)) {
                        alert(`Player ${player} wins!`);
                        gameInSession = false;
                    }
                    if (!won(playerOne) && !won(playerTwo) && pieces === n*n) {
                        alert('tie!');
                        gameInSession = false;
                    }
                    player = player === 'x' ? 'o' : 'x';
                }
            });
        });
    });


}

var toggleCell = (cell, player) => {
    cell.append(player);
}

var won = (board) => {
    return rowStrike(board) || colStrike(board) || diagStrike(board);
}

var rowStrike = (board) => {
    var bool = false;
    board.forEach(row => {
        bool = row.reduce((accum, elem) => elem && accum == elem, true) ? true : bool;
    });
    return bool;
}

var colStrike = (board) => {
    var bool = false;
    board.forEach((col, colIndex) => {
        bool = board.reduce((accum, row) => row[colIndex] && accum == row[colIndex], true) ? true : bool;
    });
    return bool;
}

var diagStrike = (board) => {
    var flippedBoard = board.map(row => row.slice().reverse());
    var bool = false;
    bool = board.reduce((accum, row, index) => row[index] && accum == row[index], true) || flippedBoard.reduce((accum, row, index) => row[index] && accum == row[index], true) ? true : bool;
    return bool;
}

/*
*******************************
CONTROLLERS
*******************************
*/

