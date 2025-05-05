import { Enemy } from '../classes/Enemy.js';
import { enemies, wave, updateWave, gameOver } from './gameLoop.js';

export function spawnWave() {
    if (gameOver) return;
    const enemyTypes = ['basic', 'fast', 'tank'];
    for (let i = 0; i < wave * 3; i++) {
        setTimeout(() => {
            if (gameOver) return;
            const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            const enemy = new Enemy(type);
            enemy.addToStage(window.app.stage); // Use window.app
            enemies.push(enemy);
        }, i * 1000);
    }
    updateWave(wave + 1);
}