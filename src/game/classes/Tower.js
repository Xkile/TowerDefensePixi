import * as PIXI from 'pixi.js';
import { GRID_SIZE } from '../../constants.js';
import { enemies } from '../core/gameLoop.js';

export class Tower {
    constructor(x, y, type = 'basic') {
        this.type = type;
        this.sprite = new PIXI.Graphics();
        this.x = x * GRID_SIZE + GRID_SIZE / 2;
        this.y = y * GRID_SIZE + GRID_SIZE / 2;

        // Set properties based on tower type
        if (type === 'sniper') {
            this.cost = 75;
            this.range = 200;
            this.damage = 50;
            this.fireRate = 120; // Slow fire rate (2 seconds at 60 FPS)
            this.sprite.beginFill(0x800080); // Purple for sniper
            this.projectileColor = 0xff00ff; // Magenta projectiles
        } else if (type === 'rapid') {
            this.cost = 60;
            this.range = 100;
            this.damage = 10;
            this.fireRate = 30; // Fast fire rate (0.5 seconds at 60 FPS)
            this.sprite.beginFill(0xffa500); // Orange for rapid
            this.projectileColor = 0xffa500; // Orange projectiles
        } else {
            this.cost = 50;
            this.range = 150;
            this.damage = 20;
            this.fireRate = 60; // Moderate fire rate (1 second at 60 FPS)
            this.sprite.beginFill(0x0000ff); // Blue for basic
            this.projectileColor = 0xffff00; // Yellow projectiles
        }

        this.sprite.drawRect(x * GRID_SIZE + 5, y * GRID_SIZE + 5, GRID_SIZE - 10, GRID_SIZE - 10);
        this.sprite.endFill();
        this.fireTimer = 0;

        // Range visualization
        this.rangeCircle = new PIXI.Graphics();
        this.rangeCircle.beginFill(0xffffff, 0.2);
        this.rangeCircle.drawCircle(0, 0, this.range);
        this.rangeCircle.endFill();
        this.rangeCircle.x = this.x;
        this.rangeCircle.y = this.y;
        this.rangeCircle.visible = false;

        // Enable interactivity for hover
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.on('mouseover', () => {
            this.rangeCircle.visible = true;
        });
        this.sprite.on('mouseout', () => {
            this.rangeCircle.visible = false;
        });
    }

    addToStage(stage) {
        stage.addChild(this.rangeCircle);
        stage.addChild(this.sprite);
    }

    update(ticker) {
        this.fireTimer++;
        if (this.fireTimer >= this.fireRate) {
            const target = this.findTarget();
            if (target) {
                this.shoot(target, ticker);
                this.fireTimer = 0;
            }
        }
    }

    findTarget() {
        for (let enemy of enemies) {
            const dx = enemy.sprite.x - this.x;
            const dy = enemy.sprite.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= this.range) {
                return enemy;
            }
        }
        return null;
    }

    shoot(target, ticker) {
        const projectile = new PIXI.Graphics();
        projectile.beginFill(this.projectileColor);
        projectile.drawCircle(0, 0, 5);
        projectile.endFill();
        projectile.x = this.x;
        projectile.y = this.y;
        this.sprite.parent.addChild(projectile);

        const moveProjectile = () => {
            if (!projectile.parent || !target.sprite.parent) {
                projectile.parent?.removeChild(projectile);
                ticker.remove(moveProjectile);
                return;
            }

            const dx = target.sprite.x - projectile.x;
            const dy = target.sprite.y - projectile.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 5) {
                projectile.parent.removeChild(projectile);
                ticker.remove(moveProjectile);
                target.takeDamage(this.damage);
            } else {
                const vx = (dx / distance) * 5;
                const vy = (dy / distance) * 5;
                projectile.x += vx;
                projectile.y += vy;
            }
        };
        ticker.add(moveProjectile);
    }

    destroy() {
        this.sprite.parent?.removeChild(this.sprite);
        this.rangeCircle.parent?.removeChild(this.rangeCircle);
        // Remove from towers array
        import('../core/gameLoop.js').then(module => {
            const index = module.towers.indexOf(this);
            if (index !== -1) {
                module.towers.splice(index, 1); // Modify the array in place
            }
        });
    }
}