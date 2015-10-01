
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
        game.load.image("p2tank", "img/p2tank.gif");
        game.load.image("bomb", "img/bomb.gif");
        game.load.image("tankmissile", "img/tankmissile.gif");
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

        scene.addEventListener(playEven.longPressAlphaA, function () {
            p1.moveL();
        });
        scene.addEventListener(playEven.longPressAlphaD, function () {
            p1.moveR();
        });
        scene.addEventListener(playEven.longPressAlphaW, function () {
            p1.moveU();
        });
        scene.addEventListener(playEven.longPressAlphaS, function () {
            p1.moveD();
        });
        scene.addEventListener(playEven.longPressAlphaJ, function () {
            p1.attack();
        });

        var p2 = new game.tank("p2tank", {
            x: config.tankWidth,
            y: 0,
            width: config.tankWidth,
            height: config.tankHeight
        });
        scene.addSpirit(p2);

        scene.addEventListener(playEven.longPressL, function () {
            p2.moveL();
        });
        scene.addEventListener(playEven.longPressR, function () {
            p2.moveR();
        });
        scene.addEventListener(playEven.longPressU, function () {
            p2.moveU();
        });
        scene.addEventListener(playEven.longPressD, function () {
            p2.moveD();
        });
        scene.addEventListener(playEven.longPressKeypad0, function () {
            p2.attack();
        });

        console.log("start");
    };
}
window.addEventListener("load", function () {
    game.init();
});