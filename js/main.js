/*----- constants -----*/

const COLORS = {
    '0': 'white',
    '1': 'orange',
    '-1': 'black',
};

const SYMBOL = {
    '0': '',
    '1': 'X',
    '-1': 'O',
};


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*----- state variables -----*/

const state = {
    board: null,
    turn: null,
    winner: null,
};


/*----- cached elements  -----*/

const elements = {
    message: document.querySelector('h1'),
    playAgain: document.querySelector('button'),
    boardElements: document.querySelectorAll('#board > div'),
}




/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleDrop); 

elements.playAgain.addEventListener('click', init);



/*----- functions -----*/

init();

function init() {
    state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    state.turn = 1;
    state.winner = null;
    render();
}


function handleDrop(event) {  
    const Index = event.target.id
    if (state.board[Index] !== 0) {                 
        return; // exit the function (so the rest doesn't get mad)
    }
    if (state.winner !== null) {
        return;
    }
    state.board[Index] = state.turn;  
    state.turn *= -1;                  // change to the next player
    state.winner = checkWinner(Index);    // check for a winner?
    render();
}


function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (state.board[a] && state.board[a] === state.board[b] && state.board[b] === state.board[c]) {
            return state.board[a];
        }
    }
    return null;            // No winner found
}


   
function render() {
    renderBoard();
    renderMessage();
}


function renderBoard() {
    state.board.forEach(function (square, index) {
        elements.boardElements[index].innerText = SYMBOL[square];
        elements.boardElements[index].style.color = COLORS[square];
        elements.boardElements[index].style.textAlign = 'center';
        elements.boardElements[index].style.padding = '15px';
        elements.boardElements[index].style.fontSize = '40px';
        elements.boardElements[index].style.fontWeight = '900';
    });
};


    
function renderMessage() {          // show winner
    if (state.winner) {
        elements.message.innerHTML = `<span style="color: ${ COLORS[state.winner] }">${ COLORS[state.winner] }</span> wins!`; 
    } else {
        elements.message.innerHTML = `<span style="color: ${ COLORS[state.turn] }">${ COLORS[state.turn] }</span>'s turn`;   
    }
}
    
