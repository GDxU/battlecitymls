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
        game.load.image("walls", "img/walls.gif");
        game.load.image("wall", "img/wall.gif");
        game.load.image("steels", "img/steels.gif");
        game.load.image("steel", "img/steel.gif");
        game.load.image("water", "img/water.gif");
        game.load.image("grass", "img/grass.gif");
        game.load.image("symbol", "img/symbol.gif");
    };
    var start = function () {
        //开始游戏
        game.scene = new game.playing(game.canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", game.config.troops.sentinel, {
            x: game.config.tankSize * 4,
            y: game.canvas.height - game.config.tankSize,
            width: game.config.tankSize,
            height: game.config.tankSize
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
        var p2 = new game.tank("p2tank", game.config.troops.sentinel, {
            x: game.config.tankSize * 8,
            y: game.canvas.height - game.config.tankSize,
            width: game.config.tankSize,
            height: game.config.tankSize
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
        var aa = new game.tank("enemy1", game.config.troops.scourge, {
            x: 0,
            y: 0,
            width: game.config.tankSize,
            height: game.config.tankSize
        });
        aa.run.sTime = 1000;
        aa.runingDirection = game.direction.D;
        game.scene.addSpirit(aa);
        game.scene.addSpirit(new game.tank("enemy2", game.config.troops.scourge, {
            x: game.config.tankSize * 1,
            y: 0,
            width: game.config.tankSize,
            height: game.config.tankSize
        }, { attackIntervale: 2000 }));
        game.scene.addSpirit(new game.tank("enemy3", game.config.troops.scourge, {
            x: game.config.tankSize * 2,
            y: 0,
            width: game.config.tankSize,
            height: game.config.tankSize
        }, { attackIntervale: 2000 }));
        (function () {
            var i, j, row, cell, x, y, w = game.config.tankSize, h = w;
            for (i = 0; i < game.config.map.length; i++) {
                row = game.config.map[i];
                for (j = 0; j < row.length; j++) {
                    x = j * game.config.tankSize;
                    y = i * game.config.tankSize;
                    cell = row[j];
                    switch (cell.type) {
                        case game.config.terrain.symbol:
                            game.scene.addSpirit(new game.terrain("symbol", {
                                width: w,
                                height: h,
                                x: x,
                                y: y
                            }));
                            break;
                        case game.config.terrain.wall:
                            console.log(cell.full, game.config.terrainFull.right, game.config.terrainFull.full);
                            if (cell.full === game.config.terrainFull.right) {
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y
                                }));
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y + w / 2
                                }));
                            }
                            if (cell.full === game.config.terrainFull.left) {
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y + w / 2
                                }));
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y
                                }));
                            }
                            if (cell.full === game.config.terrainFull.bottom) {
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y + w / 2
                                }));
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y + w / 2
                                }));
                            }
                            if (cell.full === game.config.terrainFull.top) {
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y
                                }));
                                game.scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y
                                }));
                            }
                            if (cell.full === game.config.terrainFull.full) {
                                game.scene.addSpirit(new game.terrain("walls", {
                                    width: w,
                                    height: h,
                                    x: x,
                                    y: y
                                }));
                            }
                            break;
                    }
                }
            }
        })();
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
