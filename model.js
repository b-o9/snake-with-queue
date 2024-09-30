// model.js

import { Queue } from './queue.js';

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

export class Food {
    constructor(gridWidth, gridHeight) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.position = this.randomPosition();
    }

    randomPosition() {
        const x = Math.floor(Math.random() * this.gridWidth);
        const y = Math.floor(Math.random() * this.gridHeight);
        return { x, y };
    }

    respawn() {
        this.position = this.randomPosition();
    }
}

export class Snake {
    constructor(gridWidth, gridHeight) {
        this.body = new Queue();
        this.direction = { x: 1, y: 0 };
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.body.enqueue({ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) });
        this.growing = false;
    }

    move() {
        const head = this.body.tail.data;
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y,
        };

        if (this.hasCollided(newHead) || this.isOutOfBounds(newHead)) {
            return true;
        }

        this.body.enqueue(newHead);

        if (!this.growing) {
            this.body.dequeue();
        } else {
            this.growing = false;
        }

        return false;
    }

    hasCollided(newHead) {
        let currentNode = this.body.head;

        if (currentNode) {
            currentNode = currentNode.next;
        }

        while (currentNode) {
            if (currentNode.data.x === newHead.x && currentNode.data.y === newHead.y) {
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    changeDirection(newDirection) {
        if (this.direction.x + newDirection.x !== 0 || this.direction.y + newDirection.y !== 0) {
            this.direction = newDirection;
        }
    }

    grow() {
        this.growing = true;
    }

    isOutOfBounds() {
        const head = this.body.tail.data;
        return (
            head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight
        );
    }
}
