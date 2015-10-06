var game;
(function (game) {
    function init() {
        game.canvas = document.createElement("canvas");
        document.body.appendChild(game.canvas);
        game.canvas.width = game.config.maxWidth;
        game.canvas.height = game.config.maxHeight;
        game.canvas.style.backgroundColor = "#000";
        loadImgs();
        game.load.onload = function () {
            start();
        };
    }
    game.init = init;
    var loadImgs = function () {
        game.load.image("p1tank", "img/p1tank.gif");
        game.load.image("p2tank", "img/p2tank.gif");
        game.load.image("bomb", "img/bomb.gif");
        game.load.image("tankmissile", "img/tankmissile.gif");
    };
    var start = function () {
        //开始游戏
        game.scene = new game.playing(game.canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", {
            x: 0,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        });
        game.scene.addSpirit(p1);
        game.scene.addEventListener(game.playEven.longPressAlphaA, function () {
            p1.moveL();
        });
        game.scene.addEventListener(game.playEven.longPressAlphaD, function () {
            p1.moveR();
        });
        game.scene.addEventListener(game.playEven.longPressAlphaW, function () {
            p1.moveU();
        });
        game.scene.addEventListener(game.playEven.longPressAlphaS, function () {
            p1.moveD();
        });
        game.scene.addEventListener(game.playEven.longPressAlphaJ, function () {
            p1.attack();
        });
        var p2 = new game.tank("p2tank", {
            x: game.config.tankWidth,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        });
        game.scene.addSpirit(p2);
        game.scene.addEventListener(game.playEven.longPressL, function () {
            p2.moveL();
        });
        game.scene.addEventListener(game.playEven.longPressR, function () {
            p2.moveR();
        });
        game.scene.addEventListener(game.playEven.longPressU, function () {
            p2.moveU();
        });
        game.scene.addEventListener(game.playEven.longPressD, function () {
            p2.moveD();
        });
        game.scene.addEventListener(game.playEven.longPressKeypad0, function () {
            p2.attack();
        });
        console.log("start");
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
