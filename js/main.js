/*----- constants -----*/

const COLORS = {
    '0': 'white',
    '1': 'orange',
    '-1': 'black',
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
    console.log('drop detected');
    // const Index = elements.boardElements[event.target.id];
    const Index = event.target.id
    if (state.board[Index] !== 0) {                 //    console.log(winner)
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
        elements.boardElements[index].style.backgroundColor = COLORS[square];
        });
    };
    
    
    function renderMessage() {          // show winner
     if (state.winner) {
            elements.message.innerHTML = `<span style="color: ${ COLORS[state.winner] }">${ COLORS[state.winner] }</span> wins!`; 
        } else {
            elements.message.innerHTML = `<span style="color: ${ COLORS[state.turn] }">${ COLORS[state.turn] }</span>'s turn`;   
        }
    }
    
  /*  
    function renderControls() {
        elements.boardElements.forEach(function (square) {
            square.style.visibility = state.winner ? 'hidden' : 'visible';
        });
};
*/