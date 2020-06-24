"use strict";

var breakoutView = new BreakoutView(),
    breakoutModel = new BreakoutModel(),
    breakoutController = null;

function BreakoutController() {

    this.updateBall = function () {
        var b = breakoutModel.getBall();
        breakoutView.drawBall(b.x, b.y, b.r);
    }
    this.updatePaddle = function () {
        var p = breakoutModel.getPaddle();
        breakoutView.drawPaddle(p.x, p.y, p.h, p.w, breakoutModel.getLives());
    }
    this.updateBlocks = function () {
        var bs = breakoutModel.getBlocks();
        breakoutView.drawBlocks(bs.ba, bs.rc, bs.cc);
    }


    this.init = function () {

        var canvas = document.getElementById("myCanvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        breakoutView.setMoveCallBack(function (evt) {
            //breakoutModel.setPaddleSpeed(evt.gamma);
            breakoutModel.setPaddleX(((canvas.width / 2) + ((evt.gamma / 90) * canvas.width / 2)));
        });

        breakoutView.init();
        breakoutModel.init();

        window.setInterval(function () {
            breakoutModel.update();
            breakoutController.updateBall();
            breakoutController.updatePaddle();
            breakoutController.updateBlocks();
        }, 10);
    };
}

breakoutController = new BreakoutController();
window.addEventListener("load", breakoutController.init);