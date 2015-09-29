var game;
(function (game) {
    var spirit = (function () {
        function spirit(imgKey, point) {
            this.point = point;
            this.id = common.newId();
            this.imgKey = imgKey;
        }
        Object.defineProperty(spirit.prototype, "imgKey", {
            set: function (key) {
                this.image = game.source.images[key].img;
            },
            enumerable: true,
            configurable: true
        });
        spirit.prototype.draw = function (canvas) {
        };
        return spirit;
    })();
    game.spirit = spirit;
})(game || (game = {}));
