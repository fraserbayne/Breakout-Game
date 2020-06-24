"use strict";

function BreakoutView() {

    var colors = ["#0004ff", "#00ffff", "#00ff00", "#ffff00", "#ff00ff"],
        context,
        canvas;

    this.drawBall = function (ballX, ballY, ballRadius) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            context.fillStyle = "#ff0000";
            context.fill();
            context.closePath();
        },

        this.drawPaddle = function (paddleX, paddleY, paddleHeight, paddleWidth, lives) {
            context.beginPath();
            context.rect(paddleX, paddleY - paddleHeight, paddleWidth, paddleHeight);
            context.fillStyle = "#3386FF";
            context.fill();
            context.fillStyle = "black";
            context.font = "bold " + paddleHeight * 1.2 + "px Helvetica";
            context.textAlign = "center";
            context.fillText(lives, paddleX + (paddleWidth / 2), paddleY - 1);
            context.closePath();
        },


        this.drawBlocks = function (blocks, blockRowCount, blockColumnCount) {

            for (var i = 0; i < blockRowCount * blockColumnCount; i++) {
                if (blocks[i].alive) {
                    context.beginPath();
                    context.rect(blocks[i].xcoord, blocks[i].ycoord, canvas.width / blockColumnCount - 1, canvas.height / 24 - 1);
                    context.fillStyle = colors[blocks[i].color];
                    context.strokeStyle = "#000000";
                    context.fill();
                    context.stroke();
                    context.closePath();
                }
            }
        }
    this.setMoveCallBack = function (callback) {
        window.addEventListener("deviceorientation", callback);
    }


    this.init = function () {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

    };
}