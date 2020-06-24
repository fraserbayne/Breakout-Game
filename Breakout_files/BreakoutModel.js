"use strict";

function BreakoutModel() {

    var blockRowCount = 5,
        blockColumnCount = 8,
        ballX,
        ballY,
        ballInitialXSpeed,
        ballInitialYSpeed,
        ballXSpeed,
        ballYSpeed,
        ballRadius,
        paddleX,
        paddleY,
        paddleHeight,
        paddleWidth,
        paddleSpeed = 0,
        blocks = [],
        lives = 5;

    var canvas, context,

        restart = function () {
            ballX = paddleX + (paddleWidth / 2);
            ballY = paddleY - paddleHeight - ballRadius;
            ballXSpeed = ballInitialXSpeed;
            ballYSpeed = ballInitialYSpeed;
            if (lives == 0) {
                window.alert("You lose");
                resetBlocks();
                lives = 5;
            }
            else {
                lives--;
            }
        },

        resetBlocks = function () {
            for (var i = 0; i < blockRowCount * blockColumnCount; i++) {
                blocks[i].alive = true;
            }
        },

        gameWon = function () {

            for (var i = 0; i < blockRowCount * blockColumnCount; i++) {
                if (blocks[i].alive == false) {
                    return true;
                }
                return false;
            }

        };

    this.update = function () {


        //Ball speed
        ballX += ballXSpeed;
        ballY += ballYSpeed;

        //Paddle speed
        paddleX += paddleSpeed / 10
        if (paddleX < 0) {
            paddleX = 0;
        }
        if (paddleX > canvas.width - paddleWidth) {
            paddleX = canvas.width - paddleWidth;
        }

        //Collisions
        //Right wall
        if (ballX > canvas.width - ballRadius) {
            ballXSpeed = -ballXSpeed;
            ballX = canvas.width - ballRadius;
        }
        //Left wall
        if (ballX < 0 + ballRadius) {
            ballXSpeed = -ballXSpeed;
            ballX = 0 + ballRadius;
        }
        //Top wall
        if (ballY < 0 + ballRadius) {
            ballYSpeed = -ballYSpeed;
            ballY = 0 + ballRadius
        }
        //Bottom wall (reset)
        if (ballY > canvas.height) {

            restart();

            return;
        }

        //Paddle
        //If next tick = collision
        if ((ballY + ballYSpeed > paddleY - ballRadius - paddleHeight) && (ballY + ballYSpeed < paddleY + paddleHeight + ballRadius)) {
            if (ballX + ballXSpeed > paddleX - ballRadius && (ballX + ballXSpeed < paddleX + paddleWidth + ballRadius)) {

                if (ballY < paddleY - paddleHeight) {
                    if (ballX + ballRadius > paddleX) {
                        if (ballX - ballRadius < paddleX + paddleWidth) {
                            //Top

                            ballY = paddleY - paddleHeight - ballRadius;
                            var percentAlong = (ballX - (paddleX + paddleWidth / 2)) / (ballRadius + paddleWidth / 2);

                            var newXSpeed = percentAlong * ballInitialXSpeed;
                            var inverse = (1 - Math.abs(percentAlong));

                            var newYSpeed = (inverse * -ballInitialYSpeed) - ballInitialYSpeed / 5;

                            if (newXSpeed < 0) {
                                newXSpeed -= ballInitialXSpeed / 5;
                            }
                            else {
                                newXSpeed += ballInitialXSpeed / 5;
                            }

                            ballXSpeed = newXSpeed;
                            ballYSpeed = newYSpeed;

                        }
                    }
                }
            }
        }
        //Blocks
        var blockWidth = canvas.width / 8;
        var blockHeight = canvas.height / 24;
        for (var i = 0; i < blockRowCount * blockColumnCount; i++) {
            if (blocks[i].alive && (ballY + ballYSpeed > blocks[i].ycoord - ballRadius - blockHeight) && (ballY + ballYSpeed < blocks[i].ycoord + blockHeight + ballRadius)) {
                if (ballX + ballXSpeed > blocks[i].xcoord - ballRadius && (ballX + ballXSpeed < blocks[i].xcoord + blockWidth + ballRadius)) {

                    if (ballY > blocks[i].ycoord + blockHeight) {
                        //Bottom
                        ballYSpeed = -ballYSpeed;
                        ballY = blocks[i].ycoord + blockHeight + ballRadius;
                        blocks[i].alive = false;
                        return;
                    }
                    if (ballX < blocks[i].xcoord) {
                        //Left
                        ballXSpeed = -ballXSpeed;
                        ballX = blocks[i].xcoord - ballRadius;
                        blocks[i].alive = false;
                        return;
                    }
                    if (ballX > blocks[i].xcoord + blockWidth) {
                        //Right
                        ballXSpeed = -ballXSpeed;
                        ballX = blocks[i].xcoord + blockWidth + ballRadius;
                        blocks[i].alive = false;
                        return;
                    }

                    if (ballY < blocks[i].ycoord) {
                        //Top
                        ballYSpeed = -ballYSpeed;
                        ballY = blocks[i].ycoord - blockHeight - ballRadius;
                        blocks[i].alive = false;
                        return;
                    }
                    return;
                }
            }


        }
        if (gameWon()) {
            window.alert("You win");
            lives = 5;
            restart();
        }

    }

    this.init = function () {

        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        paddleHeight = canvas.height / 50;
        paddleWidth = canvas.width / 5;

        paddleX = (canvas.width - paddleWidth) / 2;
        paddleY = canvas.height * 0.9;

        var scale = Math.min(canvas.width, canvas.height);

        ballRadius = scale / 50
        ballInitialXSpeed = scale / 100
        ballInitialYSpeed = scale / 100

        for (var i = 0; i < blockRowCount; i++) {
            for (var b = 0; b < blockColumnCount; b++) {
                blocks.push({
                    xcoord: b * canvas.width / blockColumnCount,
                    ycoord: (i + 2) * canvas.height / 24,
                    color: i,
                    alive: true
                });
            }
        }
        restart();
    }

    this.getLives = function () {
        return lives;
    }

    this.getPaddle = function () {
        return {
            x: paddleX,
            y: paddleY,
            h: paddleHeight,
            w: paddleWidth
        };
    }

    this.getBall = function () {
        return {
            x: ballX,
            y: ballY,
            r: ballRadius
        };
    }

    this.getBlocks = function () {
        return {
            ba: blocks,
            rc: blockRowCount,
            cc: blockColumnCount
        };
    }

    this.setPaddleSpeed = function (speed) {
        paddleSpeed = speed * canvas.width / 200;
    }

    this.setPaddleX = function (x) {
        paddleX = x - paddleWidth / 2;
    }
}