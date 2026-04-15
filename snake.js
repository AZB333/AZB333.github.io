document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const overlay = document.getElementById("playOverlay");

    const TILE_COUNT = 20;
    let gridSize;

    function getStartSnake() {
    return [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
}

    let gameRunning = false;
    overlay.addEventListener("click", () => {
        console.log("clicked overlay"); 

        gameRunning = true;
        overlay.classList.add("hidden");

        canvas.focus();
    });

    function resizeCanvas() {
        const size = Math.min(window.innerWidth * 0.5, 500);
        canvas.width = size;
        canvas.height = size;

        gridSize = canvas.width / TILE_COUNT;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let snake = getStartSnake();
    let direction = { x: 1, y: 0 }; // start moving immediately
    let food = spawnFood();
    let score = 0;

    function spawnFood() {
        return {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
    }

    function update() {
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        if (
            head.x < 0 || head.x >= TILE_COUNT ||
            head.y < 0 || head.y >= TILE_COUNT ||
            snake.some(s => s.x === head.x && s.y === head.y)
        ) {
            resetGame();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
            food = spawnFood();
        } else {
            snake.pop();
        }
    }

    function draw() {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#22c55e";
        snake.forEach(s => {
            ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
        });

        ctx.fillStyle = "#ef4444";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function resetGame() {
        snake = getStartSnake();
        direction = { x: 1, y: 0 };
        score = 0;
        document.getElementById("score").innerText = "Score: 0";
        food = spawnFood();

        gameRunning = false;
        overlay.classList.remove("hidden");
    }

    canvas.addEventListener("click", () => {
        canvas.focus();
    });

    document.addEventListener("keydown", e => {
        if (!gameRunning) return;

        e.preventDefault();

        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
            case "s":
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
            case "a":
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
            case "d":
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    setInterval(() => {
        if (!gameRunning) {
            draw();
            return;
        }

        update();
        draw();
    }, 100);

    //mobile controls
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener("touchstart", e => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });

    canvas.addEventListener("touchend", e => {
         if (!gameRunning) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0 && direction.x === 0) {
                direction = { x: 1, y: 0 };
            } else if (dx < 0 && direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
        } else {
            // Vertical swipe
            if (dy > 0 && direction.y === 0) {
                direction = { x: 0, y: 1 };
            } else if (dy < 0 && direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
        }
    });

    canvas.addEventListener("touchmove", e => {
        e.preventDefault();
    }, { passive: false });
});