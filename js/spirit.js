var game;
(function (game) {
    var spirit = (function () {
        function spirit(point) {
            this.point = point;
            this.id = common.newId();
        }
        Object.defineProperty(spirit.prototype, "imgKey", {
            set: function (key) {
                this.image = game.source.images[key].img;
            },
            enumerable: true,
            configurable: true
        });
        return spirit;
    })();
    game.spirit = spirit;
})(game || (game = {}));
