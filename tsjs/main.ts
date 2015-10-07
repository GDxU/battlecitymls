
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



    }
    var start = function () {
        //开始游戏

        scene = new game.playing(canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", config.troops.sentinel, {
            x: config.tankSize * 4,
            y: canvas.height - config.tankSize,
            width: config.tankSize,
            height: config.tankSize
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

        var p2 = new game.tank("p2tank", config.troops.sentinel, {
            x: config.tankSize * 8,
            y: canvas.height - config.tankSize,
            width: config.tankSize,
            height: config.tankSize
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


        var aa = new game.tank("enemy1", config.troops.scourge, {
            x: 0,
            y: 0,
            width: config.tankSize,
            height: config.tankSize
        });
        aa.run.sTime = 1000;
        aa.runingDirection = direction.D;
        scene.addSpirit(aa);
        scene.addSpirit(new game.tank("enemy2", config.troops.scourge, {
            x: config.tankSize * 1,
            y: 0,
            width: config.tankSize,
            height: config.tankSize
        }, { attackIntervale: 2000 }));
        scene.addSpirit(new game.tank("enemy3", config.troops.scourge, {
            x: config.tankSize * 2,
            y: 0,
            width: config.tankSize,
            height: config.tankSize
        }, { attackIntervale: 2000 }));

        (function () {
            var i, j, row, cell,
                x, y,
                w = config.tankSize,
                h = w;
            for (i = 0; i < config.map.length; i++) {
                row = config.map[i];
                for (j = 0; j < row.length; j++) {
                    x = j * config.tankSize;
                    y = i * config.tankSize;
                    cell = row[j]
                    switch (cell.type) {
                        case config.terrain.symbol:
                            scene.addSpirit(new game.terrain("symbol", {
                                width: w,
                                height: h,
                                x: x,
                                y: y
                            }));
                            break;
                        case config.terrain.wall:
                            console.log(cell.full, config.terrainFull.right, config.terrainFull.full)
                            if (cell.full === config.terrainFull.right) {
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y
                                }));
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y + w / 2
                                }));
                            }
                            if (cell.full === config.terrainFull.left) {
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y + w / 2
                                }));
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y
                                }));
                            }
                            if (cell.full === config.terrainFull.bottom) {
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y + w / 2
                                }));
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y + w / 2
                                }));
                            }
                            if (cell.full === config.terrainFull.top) {
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x,
                                    y: y
                                }));
                                scene.addSpirit(new game.terrain("wall", {
                                    width: w / 2,
                                    height: h / 2,
                                    x: x + w / 2,
                                    y: y
                                }));
                            }

                            if (cell.full === config.terrainFull.full) {
                                scene.addSpirit(new game.terrain("walls", {
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
}
window.addEventListener("load", function () {
    game.init();
});