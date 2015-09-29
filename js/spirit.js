var game;
(function (game) {
    var spirit = (function () {
        function spirit(point) {
            this.point = point;
            this.id = common.newId();
        }
        Object.defineProperty(spirit.prototype, "imgSrc", {
            set: function (src) {
                this.image = new Image();
                this.image.src = src;
            },
            enumerable: true,
            configurable: true
        });
        return spirit;
    })();
    game.spirit = spirit;
})(game || (game = {}));
