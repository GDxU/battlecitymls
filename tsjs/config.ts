module game.config {
    export var
        tankSize = 50,
        missileWH = 10,
        gameCellWidth = 13, //列
        gameCellHeight = 15, //行
        maxWidth = 0,
        maxHeight = 0;

    game.config.maxWidth = config.tankSize * config.gameCellWidth;
    game.config.maxHeight = config.tankSize * config.gameCellHeight;

    export enum troops {
        sentinel,
        scourge
    }
    export enum terrain { //地形
        empty,
        wall,  //土墙
        steel, //钢铁
        water, //水
        grass, //草地
        symbol //玩家基地
    }
    export enum terrainFull { //地形完整程度
        full, //完整
        left, //只有左
        top,
        right,
        bottom,
        LU,
        RU,
        LB,
        RB
    }
    export enum terrainPortion {
        LU, //左上
        RU, //右上
        LB, //左下
        RB  //右下
    }
    export var map = []; //地图配置
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
        map.push(row);
    }


    //基地
    map[config.gameCellHeight - 1][6].type = terrain.symbol;

    map[config.gameCellHeight - 1][5] = {
        type: terrain.wall,
        full: terrainFull.right
    }
    map[config.gameCellHeight - 1][7] = {
        type: terrain.wall,
        full: terrainFull.left
    }

    map[config.gameCellHeight - 2][6] = {
        type: terrain.wall,
        full: terrainFull.bottom
    }

    map[config.gameCellHeight - 2][5] = {
        type: terrain.wall,
        full: terrainFull.RB
    }

    map[config.gameCellHeight - 2][5] = {
        type: terrain.wall,
        full: terrainFull.RB
    }
    map[config.gameCellHeight - 2][7] = {
        type: terrain.wall,
        full: terrainFull.LB
    }


    map[2][5] = {
        type: terrain.steel,
        full: terrainFull.full
    }
    map[2][6] = {
        type: terrain.grass
    }
    map[2][8] = {
        type: terrain.water
    }
    map[2][2] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    //end地形初始化



}