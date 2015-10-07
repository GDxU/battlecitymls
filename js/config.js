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
    (function (troops) {
        troops[troops["sentinel"] = 0] = "sentinel";
        troops[troops["scourge"] = 1] = "scourge";
    })(game.troops || (game.troops = {}));
    var troops = game.troops;
})(game || (game = {}));
