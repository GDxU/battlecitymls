var game;
(function (game) {
    game.config = {
        tankWidth: 50,
        tankHeight: 50,
        missileWH: 10,
        maxWidth: 0,
        maxHeight: 0,
    };
    game.config.maxWidth = game.config.tankWidth * 13;
    game.config.maxHeight = game.config.tankHeight * 15;
})(game || (game = {}));
