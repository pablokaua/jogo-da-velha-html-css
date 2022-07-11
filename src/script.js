// Seleciona todos os elementos que vão ser alterados
const elements = {
    playerContainer: document.querySelector('.player-container'),
    selectPlayerX: document.querySelector('.options .playerX'),
    selectPlayerO: document.querySelector('.options .playerO'),
    currentPlayerX: document.querySelector('.currentX'),
    currentPlayerO: document.querySelector('.currentO'),
    board: document.querySelector('.board'),
    cells: document.querySelectorAll('.cell'),
    resultContainer: document.querySelector('.result'),
    wonText: document.querySelector('.won-text p'),
    restart: document.querySelector('.btnRestart')
};

// Todas as possíveis combinações de vitória
const winnerCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [3,5,8],
    [0,4,8],
    [2,4,6]
]; 

// Define se o player vai ser X ou O
let isPlayerX;

// Checa se alguém venceu
const checkForWin = (currentPlayer) => {
    return winnerCombinations.some(combination => {
        return combination.every(index => {
            return elements.cells[index].textContent == currentPlayer;
        })
    })
}

// Checa se foi empate
const checkDraw = () => {
    for(const cell of elements.cells){
        if(cell.classList.contains('filled') == false){
            return false
        }
    }
    return true;
}


// Adiciona uma classe ao elemento
const addClass = (element, action) => {
    element.classList.add(action);
}

// Remove uma classe do elemento
const removeClass = (element, action) => {
    element.classList.remove(action);
}

// Alterna uma classe do elemento
const toggleClass = (element, action) => {
    element.classList.toggle(action);
}

// Adiciona texto ao elemento 
const addText = (element, text) => {
    element.innerText = text;
}


// Define quem será o primeiro jogador
const setPlayer = () => {
    // Exibe as opções de player
    toggleClass(elements.playerContainer, 'hidden');
    // Seleciona player X como inicial
    elements.selectPlayerX.onclick = () => {
        isPlayerX = true;
        toggleClass(elements.currentPlayerX, 'active');
        toggleClass(elements.playerContainer, 'hidden');
        toggleClass(elements.board, 'hidden');
    }
    // Seleciona player O como inicial
    elements.selectPlayerO.onclick = () => {
        isPlayerX = false; 
        toggleClass(elements.currentPlayerO, 'active');
        toggleClass(elements.playerContainer, 'hidden');
        toggleClass(elements.board, 'hidden');
    }
}


// Alterna qual jogador deve jogar na rodada
const toggleCurrentPlayer = () => {
    toggleClass(elements.currentPlayerX, 'active');
    toggleClass(elements.currentPlayerO, 'active');
}

// Muda a vez do jogador
const swapTurns = () => {
    isPlayerX = !isPlayerX;
    toggleCurrentPlayer();
}

// Marca o local escolhido
const placeMark = (cell, currentPlayer) => {
    // Verifica se local já foi escolhido
    if(!(cell.classList.contains('filled'))){
        addText(cell, currentPlayer);
        addClass(cell, 'filled');
        swapTurns();
    } 
}

// Finaliza o jogo
const endGame = () => {
    toggleClass(elements.board, 'hidden');
    toggleClass(elements.resultContainer, 'hidden');
}

// Computa ações
const handleClick = (e) => {
    const cell = e.target;
    const currentPlayer = isPlayerX ? 'X': 'O';
    placeMark(cell, currentPlayer);

    const isWin = checkForWin(currentPlayer);
    const isDraw = checkDraw();
    if(isDraw){
        addText(elements.wonText, 'EMPATE!');
        endGame()
        restartGame();
    }
    if(isWin) {
        addText(elements.wonText, `Jogador ${currentPlayer} venceu!`);
        endGame();
        restartGame();
    }
}

// Começa o jogo
const startGame = () => {
    setPlayer();
    for(const cell of elements.cells){
        cell.addEventListener('click', handleClick);
    }
}


// Limpa todas as celulas 
const clearCells = () => {
    for(const cell of elements.cells){
        removeClass(cell, 'filled');
        addText(cell, '')
    }
}

// Reinicia o jogo
const restartGame = () => {
    elements.restart.onclick = () => {
        clearCells();
        toggleClass(elements.resultContainer, 'hidden');
        toggleClass(elements.playerContainer, 'hidden');
        removeClass(elements.currentPlayerX, 'active');
        removeClass(elements.currentPlayerO, 'active');
    }
}

startGame();



