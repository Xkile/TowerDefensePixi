import * as PIXI from 'pixi.js';
import { path } from '../core/map.js';
import { gold, updateGold, baseHP, updateBaseHP, gameOver } from '../core/gameLoop.js';

export class Enemy {
    constructor(type = 'basic') {
        this.type = type;
        this.sprite = new PIXI.Graphics();
        this.healthBar = new PIXI.Graphics();
        this.healthBarBackground = new PIXI.Graphics();

        // Set properties based on enemy type
        if (type === 'fast') {
            this.maxHealth = 50;
            this.speed = 3;
            this.sprite.beginFill(0xffff00); // Yellow for fast
            this.reward = 5;
            this.baseDamage = 10;
        } else if (type === 'tank') {
            this.maxHealth = 200;
            this.speed = 1;
            this.sprite.beginFill(0x00ff00); // Green for tank
            this.reward = 20;
            this.baseDamage = 30;
        } else {
            this.maxHealth = 100;
            this.speed = 2;
            this.sprite.beginFill(0xff0000); // Red for basic
            this.reward = 10;
            this.baseDamage = 15;
        }

        this.initialSpeed = this.speed; // Store initial speed for reset
        this.health = this.maxHealth;
        this.sprite.drawCircle(0, 0, type === 'tank' ? 15 : 10);
        this.sprite.endFill();
        this.sprite.x = path[0].x;
        this.sprite.y = path[0].y;
        this.pathIndex = 0;
        this.isDestroyed = false; // Flag to prevent updates after destruction

        // Health bar setup
        this.healthBarBackground.beginFill(0x000000);
        this.healthBarBackground.drawRect(-20, -30, 40, 5);
        this.healthBarBackground.endFill();
        this.updateHealthBar();
    }

    addToStage(stage) {
        stage.addChild(this.healthBarBackground);
        stage.addChild(this.healthBar);
        stage.addChild(this.sprite);
    }

    updateHealthBar() {
        this.healthBar.clear();
        const healthPercent = this.health / this.maxHealth;
        const color = healthPercent > 0.5 ? 0x00ff00 : healthPercent > 0.25 ? 0xffff00 : 0xff0000;
        this.healthBar.beginFill(color);
        this.healthBar.drawRect(-20, -30, 40 * healthPercent, 5);
        this.healthBar.endFill();
        this.healthBar.x = this.sprite.x;
        this.healthBar.y = this.sprite.y;
        this.healthBarBackground.x = this.sprite.x;
        this.healthBarBackground.y = this.sprite.y;
    }

    update() {
        if (this.isDestroyed) return; // Skip updates if already destroyed

        if (this.pathIndex < path.length - 1) {
            const target = path[this.pathIndex + 1];
            const dx = target.x - this.sprite.x;
            const dy = target.y - this.sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.speed) {
                this.pathIndex++;
            } else {
                const vx = (dx / distance) * this.speed;
                const vy = (dy / distance) * this.speed;
                this.sprite.x += vx;
                this.sprite.y += vy;
            }
            this.updateHealthBar();
        } else {
            // Enemy reached the base
            updateBaseHP(baseHP - this.baseDamage);
            this.destroy();
            if (baseHP <= 0 && !gameOver) {
                alert('Game Over! Base destroyed.');
                window.location.reload(); // Refresh the page to restart
            }
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        this.updateHealthBar();
        if (this.health <= 0) {
            this.destroy();
            updateGold(gold + this.reward);
        }
    }

    destroy() {
        if (this.isDestroyed) return; // Prevent multiple destroys
        this.isDestroyed = true;
        this.sprite.parent?.removeChild(this.sprite);
        this.healthBar.parent?.removeChild(this.healthBar);
        this.healthBarBackground.parent?.removeChild(this.healthBarBackground);
        // Remove from enemies array
        import('../core/gameLoop.js').then(module => {
            const index = module.enemies.indexOf(this);
            if (index !== -1) {
                module.enemies.splice(index, 1);
            }
        });
    }
}