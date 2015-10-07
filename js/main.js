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
        game.load.image("enemy1", "img/enemy1.gif");
        game.load.image("enemy2", "img/enemy2.gif");
        game.load.image("enemy3", "img/enemy3.gif");
        game.load.image("bomb", "img/bomb.gif");
        game.load.image("tankmissile", "img/tankmissile.gif");
    };
    var start = function () {
        //开始游戏
        game.scene = new game.playing(game.canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", game.troops.sentinel, {
            x: game.config.tankWidth * 4,
            y: game.canvas.height - game.config.tankHeight,
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
        var p2 = new game.tank("p2tank", game.troops.sentinel, {
            x: game.config.tankWidth * 8,
            y: game.canvas.height - game.config.tankHeight,
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
        var aa = new game.tank("enemy1", game.troops.scourge, {
            x: 0,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        });
        aa.run.sTime = 1000;
        aa.runingDirection = game.direction.D;
        game.scene.addSpirit(aa);
        game.scene.addSpirit(new game.tank("enemy2", game.troops.scourge, {
            x: game.config.tankWidth * 1,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        }, { attackIntervale: 2000 }));
        game.scene.addSpirit(new game.tank("enemy3", game.troops.scourge, {
            x: game.config.tankWidth * 2,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        }, { attackIntervale: 2000 }));
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
