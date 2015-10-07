module game {
    export var config = {
        tankWidth: 50,
        tankHeight: 50,
        missileWH: 10,
        maxWidth: 0,
        maxHeight: 0,
    };
    game.config.maxWidth = config.tankWidth * 13;
    game.config.maxHeight = config.tankHeight * 15;

    export enum troops {
        sentinel,
        scourge
    }
}