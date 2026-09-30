# Tic-Tac-Toe Game

A simple, beautiful, and fully playable Tic-Tac-Toe game built using ONLY HTML, Vanilla CSS, and JavaScript. No external frameworks, libraries, build tools, or dependencies required.

## 🌟 Features

- **Classic 3x3 Grid**: Smooth, responsive 2-player or vs Computer gameplay.
- **Game Modes**:
  - **👥 2 Players (Local)**: Play against a friend on the same device.
  - **🤖 vs Computer**: Play against a smart AI opponent.
- **AI Difficulty Levels**:
  - **🌱 Easy**: Random move generator.
  - **⚡ Medium**: Tactical AI that completes winning moves, blocks opponent wins, and prioritizes the center cell.
  - **🔥 Hard (Unbeatable)**: Built with the **Minimax Algorithm** to calculate optimal decisions for every board state.
- **Win & Draw Detection**: Automatically evaluates all 8 winning combinations (3 rows, 3 columns, 2 diagonals) and highlights the winning line with animations.
- **Scoreboard System**: Keeps track of Player X wins, Player O / Computer wins, and Draws across game restarts within your session.
- **Modern Glassmorphic UI**: Vibrant neon cyan and rose styling, dark mode theme, hover feedback, smooth pop-in animations, and mobile-friendly responsive layout.
- **Control Options**: Instant "Restart Game" and "Reset Scores" capabilities.

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structuring.
- **CSS3**: Custom properties (CSS variables), CSS Grid layout, CSS animations, and glassmorphism styling.
- **Vanilla JavaScript (ES6+)**: Game state management, event listeners, board evaluation algorithms, and Minimax AI implementation.

## 📁 Project Structure

```text
tic-tac-toe/
├── index.html   # Main HTML interface & markup
├── style.css    # Responsive CSS styling & animations
├── script.js    # Core game state & AI logic
└── README.md    # Documentation & instructions
```

## 🚀 How to Run

No installation, build step, or HTTP server is required!

1. Download or clone this repository.
2. Locate the `index.html` file in the project folder.
3. Double-click `index.html` (or right-click and choose "Open with") to launch it in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

## 🎮 How to Play

1. **Select Game Mode**: Choose **2 Players** or **vs Computer** from the dropdown menu.
2. **Select AI Difficulty** (if playing vs Computer): Choose between **Easy**, **Medium**, or **Hard**.
3. **Make Your Move**: Click on any empty grid cell to place your mark (`X` always goes first).
4. **Take Turns**: Players alternate turns putting marks on open squares.
5. **Win Condition**: The first player to align 3 of their marks horizontally, vertically, or diagonally wins the game!
6. **Draw Condition**: If all 9 cells are filled without a 3-in-a-row alignment, the game ends in a tie.
7. **Restart & Reset**: Click **Restart Game** to begin a new round while retaining scores, or click **Reset Scores** to reset the scoreboard.

## 🔮 Possible Future Improvements

- **Sound Effects**: Add custom sound effects for placing marks, winning, and drawing.
- **Custom Themes**: Allow players to toggle between dark mode, cyberpunk neon, retro arcade, or light themes.
- **Custom Player Symbols**: Allow users to pick custom emojis or avatars instead of traditional X and O.
- **Online Multiplayer**: Add WebSockets or Peer-to-Peer connectivity for remote multi-device play.
