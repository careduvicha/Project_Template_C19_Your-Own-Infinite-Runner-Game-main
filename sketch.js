var boy, boyRunning
var ballons, ballonsImg, ballonsGroup
var enemys, enemysGroup
var score = 0
var grass, grassImg
var ground
var ballonsScore = 0
var gameOver, gameOverimg
const PLAY = 0
const OVER = 1
var gameState = PLAY

function preload() {
    boyRunning = loadAnimation("./images/menino2.jpg", "./images/menino3.jpg", "./images/menino4.jpg", "./images/menino2.jpg")
    grassImg = loadAnimation("./images/grama.jpg")
    gameOverimg = loadImage("./images/gameOver.png")
    ballonImg = loadAnimation("./images/ballon.jpg")
}

function setup() {
    createCanvas(600, 600)
    enemysGroup = new Group()
    ballonsGroup = new Group()

    boy = createSprite(100, 500)
    boy.addAnimation("running", boyRunning)
    boy.scale = 0.5

    gameOver = createSprite(300, 300)
    
    gameOver.addImage(gameOverimg)
    gameOver.visible = false

    grass = createSprite(300, 500)
    grass.addAnimation("grama", grassImg)
    grass.depth = boy.depth - 1
    grass.velocityX = -(2 + 3 * score / 100)


    ground = createSprite(300, 570, 600, 5)
    ground.visible = false

    boy.debug = true
    boy.setCollider("rectangle", 0, 0, 160, 280, 0)


}


function draw() {

    background("white")
    if (gameState == PLAY) {
        createEnemys()
        createBallons()
        if (grass.x < 270) {
            grass.x = 300
        }

        if (keyDown("space") && boy.y > 490) {
            boy.velocityY = -15

        }
        if (boy.collide(ballonsGroup)) {
            ballonsScore += 1
            ballonsGroup.destroyEach()
            boy.velocityX = 0


        }
        if (boy.isTouching(enemysGroup)) {
            gameState = OVER
        }


        score += Math.round(getFrameRate() / 60)

        fill("black")
        textSize(20)
        text("score: " + score, 480, 40)
        fill("black")
        textSize(20)
        text("ballons: " + ballonsScore, 360, 40)
    }



    else if (gameState == OVER) {
        gameOver.visible = true
        
        enemysGroup.setVelocityXEach(0)
        ballonsGroup.setVelocityXEach(0)
        grass.velocityX=0
        ballonsGroup.setLifetimeEach(-1)
        enemysGroup.setLifetimeEach(-1)
    }
    boy.velocityY += 0.5
    boy.collide(ground)

    drawSprites()


}


function createEnemys() {
    if (frameCount % 80 == 0) {

        enemys = createSprite(610, 535, 80, 80)

        enemys.velocityX = -(3 + 3 * score / 100)
        enemys.scale = 0.8
        enemys.lifetime = 1000

        enemysGroup.add(enemys)
    }

}
function createBallons() {
    if (frameCount % 150 == 0) {
        ballons = createSprite(610, random(400, 410))
        ballons.addAnimation("balao", ballonImg)
        ballons.velocityX = random(-6, -8)
        ballons.scale = 0.5
        ballons.lifetime = 400

        ballonsGroup.add(ballons)
    }

}
