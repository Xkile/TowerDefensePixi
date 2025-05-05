import * as PIXI from 'pixi.js';
import { GRID_SIZE, GRID_WIDTH, GRID_HEIGHT, mapLayout } from '../../constants.js';

export const path = [];

export function createMap(app) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const tile = new PIXI.Graphics();
            if (mapLayout[y][x] === 0) {
                tile.beginFill(0x00ff00); // Grass
            } else if (mapLayout[y][x] === 1) {
                tile.beginFill(0xaaaaaa); // Path
                path.push({ x: x * GRID_SIZE + GRID_SIZE / 2, y: y * GRID_SIZE + GRID_SIZE / 2 });
            } else if (mapLayout[y][x] === 2) {
                tile.beginFill(0x555555); // Tower spot
            } else if (mapLayout[y][x] === 3) {
                tile.beginFill(0x00ffff); // Base (cyan)
            }
            tile.drawRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            tile.endFill();
            app.stage.addChild(tile);
        }
    }
}