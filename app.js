document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird")
    const gameDisplay = document.querySelector(".game-container")
    const ground = document.querySelector(".ground")
    const sky = document.querySelector(".sky")
    const score = document.getElementById("score")

    let birdLeft = 230;
    let birdBottom = 300;
    let gravity = 3
    let gap = 450
    let rotation = -20
    let isGameOver = false
    let scoreCount = 0

    function startGame() {
        birdBottom -= gravity
        rotation += 1
        bird.style.bottom = birdBottom + "px"
        bird.style.left = birdLeft + "px"
        bird.style.transform = `rotate(${rotation}deg)`
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if(e.keyCode === 32) jump()
    }

    function jump() {
        if(birdBottom < 390) birdBottom += 50
        bird.style.bottom = birdBottom + "px"
        rotation = -20
    }
    document.addEventListener("keyup", control)
    document.addEventListener("click", jump)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 200
        let obstacleBottom = randomHeight
        const obstacle = document.createElement("div")
        const topObstacle = document.createElement("div")
        if (!isGameOver) {
            obstacle.classList.add("obstacle")
            topObstacle.classList.add("top-obstacle")
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + "px"
        topObstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px"
        topObstacle.style.bottom = obstacleBottom + gap + "px"

        function moveObstacle() {
            obstacleLeft -= 1
            obstacle.style.left = obstacleLeft + "px"
            topObstacle.style.left = obstacleLeft + "px"

            if(obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if(obstacleLeft < 230 && obstacleLeft > 228 && !isGameOver) {
                scoreCount++
                score.innerHTML = "Score: " + scoreCount
            }
            if(
                obstacleLeft > 180 && obstacleLeft < 280 && birdLeft === 230 && 
                (birdBottom < obstacleBottom + 100 || birdBottom > obstacleBottom + gap - 249) ||
                birdBottom === 0
            ) {
                clearInterval(timerId)
                gameOver()
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3500)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener("keyup", control)
        document.removeEventListener("click", jump)
        document.querySelector(".options").style.display = "flex"
    }


})