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
        game.load.image("bomb", "img/bomb.gif");
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
        game.scene.addEventListener(game.playEven.longPressL, function () {
            p1.moveL();
        });
        game.scene.addEventListener(game.playEven.longPressR, function () {
            p1.moveR();
        });
        game.scene.addEventListener(game.playEven.longPressU, function () {
            p1.moveU();
        });
        game.scene.addEventListener(game.playEven.longPressD, function () {
            p1.moveD();
        });
        console.log("start");
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
