// view.js

class View {
    constructor(canvas, gridWidth, gridHeight, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cellSize = cellSize;
    }

    update(snake, food) {
        this.clearCanvas();
        this.drawGrid();
        this.drawSnake(snake);
        this.drawFood(food);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid() {
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.lineWidth = 0.5;

        for (let x = 0; x < this.gridWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.gridHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.canvas.width, y * this.cellSize);
            this.ctx.stroke();
        }
    }

    drawSnake(snake) {
        let currentNode = snake.body.head;
        while (currentNode) {
            const { x, y } = currentNode.data;
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            currentNode = currentNode.next;
        }
    }

    drawFood(food) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(food.position.x * this.cellSize, food.position.y * this.cellSize, this.cellSize, this.cellSize);
    }
}

export { View };
