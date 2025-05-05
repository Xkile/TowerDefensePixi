import * as PIXI from 'pixi.js';
import { createMap } from './game/core/map.js';
import { spawnWave } from './game/core/wave.js';
import { gameLoop, setupEventListeners } from './game/core/gameLoop.js';
import { setupUI } from './game/ui/ui.js';

// Create a canvas element manually
const canvas = document.createElement('canvas');
canvas.id = 'app';
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
console.log('Canvas created and added to DOM:', canvas);

// Initialize PixiJS application with the canvas
const app = new PIXI.Application({
    view: canvas, // Use the manually created canvas
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});
console.log('PixiJS app initialized with canvas:', app);

// Make app accessible globally for other modules
window.app = app;

// Store the interval ID for wave spawning
let waveInterval;

// Initialize game
function initGame() {
    // Reset game state
    import('./game/core/gameLoop.js').then(module => {
        module.gold = 100;
        module.wave = 1;
        module.baseHP = 1000;
        module.enemies.forEach(enemy => enemy.destroy());
        module.enemies = [];
        module.towers.forEach(tower => tower.destroy());
        module.towers = [];
        module.gameOver = false;

        // Update UI
        module.updateGold(module.gold);
        module.updateWave(module.wave);
        module.updateBaseHP(module.baseHP);
    });

    // Clear the PixiJS stage
    while (app.stage.children.length > 0) {
        app.stage.removeChild(app.stage.children[0]);
    }

    // Clear the ticker to stop any ongoing animations
    app.ticker.stop();
    app.ticker.remove(gameLoop);
    app.ticker.start();

    // Reinitialize the game
    createMap(app);
    setupUI(); // No argument needed
    setupEventListeners();
    spawnWave();
    waveInterval = setInterval(spawnWave, 15000); // Start wave spawning
    app.ticker.add(gameLoop);
}

// Start the game
initGame();

// Expose a function to restart the game
window.restartGame = () => {
    clearInterval(waveInterval); // Clear the existing interval
    initGame(); // Reinitialize the game
};