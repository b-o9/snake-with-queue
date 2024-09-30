// controller.js

import { Snake, Food } from './model.js';
import { View } from './view.js';

class Controller {
    constructor(canvas, cellSize) {
        this.cellSize = cellSize; // Initialize cell size
        this.gridWidth = Math.floor(canvas.width / this.cellSize);
        this.gridHeight = Math.floor(canvas.height / this.cellSize);
        this.snake = new Snake(this.gridWidth, this.gridHeight);
        this.food = new Food(this.gridWidth, this.gridHeight);
        this.view = new View(canvas, this.gridWidth, this.gridHeight, this.cellSize);
        this.isGameOver = false;
        this.tick();
        this.setupInput();
    }

    setupInput() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.snake.changeDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    this.snake.changeDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    this.snake.changeDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    this.snake.changeDirection({ x: 1, y: 0 });
                    break;
            }
        });
    }

    tick() {
        if (this.isGameOver) return;

        const collision = this.snake.move();

        if (collision || this.snake.isOutOfBounds()) {
            this.isGameOver = true;
            alert('Game Over!');
            return;
        }

        const head = this.snake.body.peek();
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.snake.grow();
            this.food.respawn();
        }

        this.view.update(this.snake, this.food);
        setTimeout(() => this.tick(), 200);
    }

    updateGridSize(newCellSize) {
        this.cellSize = newCellSize;
        this.gridWidth = Math.floor(this.view.canvas.width / this.cellSize);
        this.gridHeight = Math.floor(this.view.canvas.height / this.cellSize);
        this.snake = new Snake(this.gridWidth, this.gridHeight);
        this.food = new Food(this.gridWidth, this.gridHeight);
        this.view.gridWidth = this.gridWidth;
        this.view.gridHeight = this.gridHeight;
        this.view.cellSize = this.cellSize;
        this.view.update(this.snake, this.food); // Redraw with new grid size
    }
}

export { Controller };
