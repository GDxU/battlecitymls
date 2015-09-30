
module game {
    export var canvas: HTMLCanvasElement;
    export var scene: playing;
    export function init() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width = config.maxWidth;
        canvas.height = config.maxHeight;
        canvas.style.backgroundColor = "#000";

        loadImgs();
        load.onload = function () {
            start();
        }
    }

    var loadImgs = function () {
        game.load.image("p1tank", "img/p1tank.gif");
        game.load.image("bomb", "img/bomb.gif");
    }
    var start = function () {
        //开始游戏

        scene = new game.playing(canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", {
            x: 0,
            y: 0,
            width: config.tankWidth,
            height: config.tankHeight
        });
        scene.addSpirit(p1);

        scene.addEventListener(playEven.longPressL, function () {
            p1.moveL();
        });
        scene.addEventListener(playEven.longPressR, function () {
            p1.moveR();
        });
        scene.addEventListener(playEven.longPressU, function () {
            p1.moveU();
        });
        scene.addEventListener(playEven.longPressD, function () {
            p1.moveD();
        });
        console.log("start");
    };
}
window.addEventListener("load", function () {
    game.init();
});