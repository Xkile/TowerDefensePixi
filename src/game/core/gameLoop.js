import { Tower } from '../classes/Tower.js';
import { GRID_SIZE, GRID_WIDTH, GRID_HEIGHT, mapLayout } from '../../constants.js';
import { selectedTowerType } from '../ui/ui.js';

export let gold = 100;
export let wave = 1;
export let baseHP = 1000;
export let enemies = [];
export let towers = [];
export let gameOver = false;

export function updateGold(newGold) {
    gold = newGold;
    document.getElementById('gold').textContent = gold;
}

export function updateWave(newWave) {
    wave = newWave;
    document.getElementById('wave').textContent = wave;
}

export function updateBaseHP(newBaseHP) {
    baseHP = newBaseHP;
    document.getElementById('base-hp').textContent = baseHP;
}

export function gameLoop(ticker) {
    if (!window.app) {
        console.error('window.app is not defined. PixiJS application may not have initialized correctly.');
        return;
    }
    if (gameOver) {
        window.app.ticker.stop(); // Use window.app
        return;
    }
    for (let enemy of enemies) {
        enemy.update();
    }
    for (let tower of towers) {
        tower.update(window.app.ticker); // Pass window.app.ticker
    }
}

export function setupEventListeners() {
    const canvas = document.getElementById('app');
    if (!canvas) {
        console.error('Canvas element with id="app" not found.');
        return;
    }
    canvas.addEventListener('click', (e) => {
        if (gameOver) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const gridX = Math.floor(x / GRID_SIZE);
        const gridY = Math.floor(y / GRID_SIZE);

        if (gridX >= 0 && gridX < GRID_WIDTH && gridY >= 0 && gridY < GRID_HEIGHT) {
            if (mapLayout[gridY][gridX] === 2) {
                const existingTower = towers.find(t => t.x === gridX * GRID_SIZE + GRID_SIZE / 2 && t.y === gridY * GRID_SIZE + GRID_SIZE / 2);
                if (!existingTower) {
                    const tower = new Tower(gridX, gridY, selectedTowerType);
                    if (gold >= tower.cost) {
                        tower.addToStage(window.app.stage); // Use window.app
                        towers.push(tower);
                        updateGold(gold - tower.cost);
                    }
                }
            }
        }
    });
}