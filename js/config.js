var game;
(function (game) {
    var config;
    (function (config) {
        config.tankSize = 50, config.missileWH = 10, config.gameCellWidth = 13, config.gameCellHeight = 15, config.maxWidth = 0, config.maxHeight = 0;
        game.config.maxWidth = config.tankSize * config.gameCellWidth;
        game.config.maxHeight = config.tankSize * config.gameCellHeight;
        (function (troops) {
            troops[troops["sentinel"] = 0] = "sentinel";
            troops[troops["scourge"] = 1] = "scourge";
        })(config.troops || (config.troops = {}));
        var troops = config.troops;
        (function (terrain) {
            terrain[terrain["empty"] = 0] = "empty";
            terrain[terrain["wall"] = 1] = "wall";
            terrain[terrain["steel"] = 2] = "steel";
            terrain[terrain["water"] = 3] = "water";
            terrain[terrain["grass"] = 4] = "grass";
            terrain[terrain["symbol"] = 5] = "symbol"; //玩家基地
        })(config.terrain || (config.terrain = {}));
        var terrain = config.terrain;
        (function (terrainFull) {
            terrainFull[terrainFull["full"] = 0] = "full";
            terrainFull[terrainFull["left"] = 1] = "left";
            terrainFull[terrainFull["top"] = 2] = "top";
            terrainFull[terrainFull["right"] = 3] = "right";
            terrainFull[terrainFull["bottom"] = 4] = "bottom";
        })(config.terrainFull || (config.terrainFull = {}));
        var terrainFull = config.terrainFull;
        config.map = []; //地图配置
        //地形初始化
        var i, j, row;
        for (i = 0; i < config.gameCellHeight; i++) {
            row = [];
            for (j = 0; j < config.gameCellWidth; j++) {
                row.push({
                    type: terrain.empty,
                    full: terrainFull.full
                });
            }
            config.map.push(row);
        }
        config.map[config.gameCellHeight - 1][6].type = terrain.symbol; //基地
        //基地
        config.map[config.gameCellHeight - 1][5].type = terrain.wall;
        config.map[config.gameCellHeight - 1][5].full = terrainFull.right;
        config.map[config.gameCellHeight - 1][7].type = terrain.wall;
        config.map[config.gameCellHeight - 1][7].full = terrainFull.left;
        config.map[config.gameCellHeight - 2][6].type = terrain.wall;
        config.map[config.gameCellHeight - 2][6].full = terrainFull.bottom;
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
