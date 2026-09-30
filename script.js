/**
 * Tic-Tac-Toe Game Logic
 * Features: 2 Players (PvP) & vs Computer (PvC) modes with Easy, Medium, Hard (Minimax) difficulty.
 */

// ==========================================================================
// Game State Constants & Variables
// ==========================================================================

const WINNING_COMBINATIONS = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'pvc'; // 'pvp' or 'pvc'
let difficulty = 'hard'; // 'easy', 'medium', 'hard'

const scores = {
    X: 0,
    O: 0,
    ties: 0
};

// ==========================================================================
// DOM Element References
// ==========================================================================

const boardElement = document.getElementById('board');
const cellElements = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const modeSelect = document.getElementById('modeSelect');
const difficultySelect = document.getElementById('difficultySelect');
const difficultyGroup = document.getElementById('difficultyGroup');

const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreTiesElement = document.getElementById('scoreTies');

const labelXElement = document.getElementById('labelX');
const labelOElement = document.getElementById('labelO');

const restartBtn = document.getElementById('restartBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

// ==========================================================================
// Initialization & Event Listeners
// ==========================================================================

function initGame() {
    // Add click events to board cells
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Control listeners
    modeSelect.addEventListener('change', handleModeChange);
    difficultySelect.addEventListener('change', handleDifficultyChange);
    restartBtn.addEventListener('click', restartGame);
    resetScoreBtn.addEventListener('click', resetScores);

    // Initial setup
    updateModeUI();
    restartGame();
}

// Start game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// ==========================================================================
// Core Game Play Functions
// ==========================================================================

/**
 * Handles user clicking on a board cell.
 */
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore click if cell already filled or game over
    if (boardState[clickedIndex] !== '' || !gameActive) {
        return;
    }

    // Ignore click if it's computer's turn in PvC mode
    if (gameMode === 'pvc' && currentPlayer === 'O') {
        return;
    }

    // Execute Move for Human Player
    makeMove(clickedIndex, currentPlayer);

    // Process Move Outcome
    if (checkGameStatus()) {
        return; // Game ended
    }

    // Switch Player
    switchPlayer();

    // Trigger Computer move if PvC mode and it's O's turn
    if (gameMode === 'pvc' && currentPlayer === 'O' && gameActive) {
        // Add slight delay for realistic feeling AI
        setTimeout(makeComputerMove, 350);
    }
}

/**
 * Places a mark on the board and updates UI state.
 */
function makeMove(index, player) {
    boardState[index] = player;
    const cell = cellElements[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

/**
 * Switches current player and updates turn status display.
 */
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

/**
 * Evaluates current board to check for win or draw.
 * @returns {boolean} True if game ended.
 */
function checkGameStatus() {
    const winResult = checkWinner(boardState);

    if (winResult) {
        endGame(winResult.winner, winResult.combination);
        return true;
    }

    if (checkDraw(boardState)) {
        endGame('draw', null);
        return true;
    }

    return false;
}

/**
 * Checks board state against all 8 winning combinations.
 * @param {Array} board Board array to evaluate.
 * @returns {Object|null} Winning player and combination array, or null.
 */
function checkWinner(board) {
    for (let combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                winner: board[a],
                combination: combo
            };
        }
    }
    return null;
}

/**
 * Checks if all cells are filled with no winner.
 * @param {Array} board Board array to evaluate.
 * @returns {boolean} True if draw.
 */
function checkDraw(board) {
    return board.every(cell => cell !== '');
}

/**
 * Concludes the game, highlights winning cells, and updates scoreboard.
 */
function endGame(result, winCombo) {
    gameActive = false;

    if (result === 'draw') {
        scores.ties++;
        statusMessage.textContent = "It's a Draw! 🤝";
        statusMessage.className = "status-message";
    } else {
        scores[result]++;
        const winnerName = (gameMode === 'pvc' && result === 'O') ? 'Computer' : `Player ${result}`;
        statusMessage.textContent = `${winnerName} Wins! 🎉`;
        statusMessage.className = "status-message winner";

        // Highlight winning cells
        if (winCombo) {
            winCombo.forEach(index => {
                cellElements[index].classList.add('winning');
            });
        }
    }

    updateScoreboard();
}

/**
 * Updates status text and indicator colors.
 */
function updateStatus() {
    if (!gameActive) return;

    if (gameMode === 'pvc' && currentPlayer === 'O') {
        statusMessage.textContent = "Computer is thinking... 🤖";
        statusMessage.className = "status-message turn-o";
    } else {
        const playerName = (gameMode === 'pvc') ? "Your" : `Player ${currentPlayer}'s`;
        statusMessage.textContent = `${playerName} Turn (${currentPlayer})`;
        statusMessage.className = `status-message turn-${currentPlayer.toLowerCase()}`;
    }
}

// ==========================================================================
// Computer Opponent (AI) Logic
// ==========================================================================

/**
 * Executes AI move based on chosen difficulty.
 */
function makeComputerMove() {
    if (!gameActive) return;

    let targetIndex;

    switch (difficulty) {
        case 'easy':
            targetIndex = getEasyAIMove();
            break;
        case 'medium':
            targetIndex = getMediumAIMove();
            break;
        case 'hard':
        default:
            targetIndex = getHardAIMove();
            break;
    }

    if (targetIndex !== undefined && targetIndex !== null && targetIndex !== -1) {
        makeMove(targetIndex, 'O');

        if (!checkGameStatus()) {
            switchPlayer();
        }
    }
}

/**
 * Easy AI: Selects a completely random available cell.
 */
function getEasyAIMove() {
    const emptyIndices = getEmptyIndices(boardState);
    if (emptyIndices.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
}

/**
 * Medium AI:
 * 1. Win if possible in 1 move.
 * 2. Block player 'X' if they can win in 1 move.
 * 3. Take center cell (4) if available.
 * 4. Fallback to random.
 */
function getMediumAIMove() {
    const emptyIndices = getEmptyIndices(boardState);

    // 1. Check if Computer (O) can win in 1 move
    for (let index of emptyIndices) {
        const tempBoard = [...boardState];
        tempBoard[index] = 'O';
        if (checkWinner(tempBoard)) {
            return index;
        }
    }

    // 2. Check if Player (X) can win in 1 move -> Block it
    for (let index of emptyIndices) {
        const tempBoard = [...boardState];
        tempBoard[index] = 'X';
        if (checkWinner(tempBoard)) {
            return index;
        }
    }

    // 3. Take center cell if open
    if (boardState[4] === '') {
        return 4;
    }

    // 4. Otherwise random move
    return getEasyAIMove();
}

/**
 * Hard AI: Unbeatable Minimax Algorithm.
 */
function getHardAIMove() {
    const bestMove = minimax(boardState, 'O', 0);
    return bestMove.index;
}

/**
 * Minimax Recursive Function for optimal decision making.
 * @param {Array} board Current state of board.
 * @param {string} player Current turn player ('O' max, 'X' min).
 * @param {number} depth Recursion depth.
 */
function minimax(board, player, depth) {
    const emptyIndices = getEmptyIndices(board);

    // Terminal state evaluation
    const winResult = checkWinner(board);
    if (winResult) {
        if (winResult.winner === 'O') return { score: 10 - depth };
        if (winResult.winner === 'X') return { score: depth - 10 };
    }
    if (emptyIndices.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < emptyIndices.length; i++) {
        const index = emptyIndices[i];
        const move = { index: index };

        // Test move
        board[index] = player;

        if (player === 'O') {
            const result = minimax(board, 'X', depth + 1);
            move.score = result.score;
        } else {
            const result = minimax(board, 'O', depth + 1);
            move.score = result.score;
        }

        // Undo move
        board[index] = '';
        moves.push(move);
    }

    // Select best move for Maximizer ('O') or Minimizer ('X')
    let bestMove;
    if (player === 'O') {
        let bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}

/**
 * Helper to get array of unoccupied cell indices.
 */
function getEmptyIndices(board) {
    return board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
}

// ==========================================================================
// Mode, Reset & Controls Logic
// ==========================================================================

function handleModeChange() {
    gameMode = modeSelect.value;
    updateModeUI();
    restartGame();
}

function handleDifficultyChange() {
    difficulty = difficultySelect.value;
    restartGame();
}

function updateModeUI() {
    if (gameMode === 'pvc') {
        difficultyGroup.style.display = 'flex';
        labelXElement.textContent = 'You (X)';
        labelOElement.textContent = 'Computer (O)';
    } else {
        difficultyGroup.style.display = 'none';
        labelXElement.textContent = 'Player X';
        labelOElement.textContent = 'Player O';
    }
}

/**
 * Resets the board and game state for a new round.
 */
function restartGame() {
    boardState = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;

    // Reset Board UI
    cellElements.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });

    updateStatus();
}

/**
 * Resets session scores for X, O, and ties.
 */
function resetScores() {
    scores.X = 0;
    scores.O = 0;
    scores.ties = 0;
    updateScoreboard();
}

/**
 * Updates scoreboard UI values.
 */
function updateScoreboard() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
    scoreTiesElement.textContent = scores.ties;
}
