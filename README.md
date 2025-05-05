PixiJS Tower Defense Game

Overview:

This project is a classic tower defense game built using PixiJS, a fast and lightweight 2D rendering library. The game features a grid-based map where enemies follow a predefined path, and the player must place towers to defend a base from incoming waves of enemies. The objective is to prevent enemies from reaching the base by strategically placing towers with different abilities.

Features:

Dynamic Waves: Enemies spawn in waves, with increasing difficulty as the wave number increases.



Multiple Tower Types: Choose from three tower types—Basic, Sniper, and Rapid—each with unique stats (cost, range, damage, fire rate).


Interactive UI: Display for Gold, Wave, and Base HP, along with tower selection buttons, positioned above the game canvas.


Game Over and Restart: The game ends when the base's HP reaches zero, with an option to restart automatically after clicking "OK" on the Game Over alert.



Visual Feedback: Towers show their range on hover, and enemies display health bars that update dynamically.


Prerequisites:

Before running the project, ensure you have the following installed:

Node.js (version 14.x or higher recommended)

npm (comes with Node.js)


Setup Instructions:

Clone the Repository:

git clone https://github.com/Xkile/TowerDefensePixi.git
cd TowerDefensePixi


Install Dependencies: Run the following command to install the required packages (including PixiJS and Vite):

npm install


Start the Development Server: Use Vite to start the development server:

npm run dev


This will start the server and open the game in your default browser at http://localhost:5173/.


How to Play:

Objective: Protect your base (cyan square at the bottom-right) from enemies by placing towers on designated spots (dark gray squares).



Game UI:

Gold: Currency used to place towers (starts at 100).

Wave: Current wave number (starts at 1).

Base HP: Health of your base (starts at 1000; game ends if it reaches 0).

Tower Selection: Choose a tower type (Basic: 50g, Sniper: 75g, Rapid: 60g) by clicking the corresponding button.



Placing Towers:

Click a tower type button to select it (highlighted in yellow).

Click on a dark gray tower spot on the grid to place the tower if you have enough gold.



Enemies:

Enemies spawn in waves every 15 seconds and follow the gray path to the base.

Types: Basic (red), Fast (yellow), Tank (green), each with different health, speed, and damage.



Game Over: If the base HP reaches 0, a "Game Over! Base destroyed" alert appears. Click "OK" to restart the game.


Project Structure

The project is organized as follows:

project-root/
├── src/
│   ├── game/
│   │   ├── classes/
│   │   │   ├── Enemy.js       # Enemy class with movement and health logic
│   │   │   └── Tower.js       # Tower class with attack and range logic
│   │   ├── core/
│   │   │   ├── gameLoop.js    # Main game loop, state management, and event listeners
│   │   │   ├── map.js         # Map creation and path setup
│   │   │   └── wave.js        # Wave spawning logic
│   │   └── ui/
│   │       └── ui.js          # UI setup for tower selection
│   ├── constants.js           # Game constants (grid size, map layout, etc.)
│   ├── main.js                # Entry point, initializes PixiJS and game
│   ├── styles.css             # CSS styles for UI elements
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation

Dependencies

PixiJS (^7.4.0): Used for rendering the game canvas and graphics.

Vite (^5.2.0): Used as the build tool and development server.


Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Some potential enhancements include:

Adding more tower types or enemy types.

Implementing a scoring system or difficulty levels.

Enhancing the UI with additional visual effects or animations.


Known Issues

The game may require balancing (e.g., tower costs, enemy speeds, wave frequency) for optimal gameplay.

UI positioning can be adjusted in styles.css if it overlaps with the game canvas on smaller screens.

License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.



Built with ❤️ using PixiJS and Vite.