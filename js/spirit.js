var game;
(function (game) {
    var spirit = (function () {
        function spirit(imgKey, point) {
            this.rotate = 0;
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
            canvas.save();
            // #region 中心旋转
            (function () {
                var angle = this.rotate * Math.PI / 180;
                var rx = this.point.x + this.point.width / 2, ry = this.point.y + this.point.height / 2; // the rotation x and y
                var px = rx, py = ry; // the objects center x and y
                var radius = ry - py; // the difference in y positions or the radius
                var dx = rx + radius * Math.sin(angle); // the draw x 
                var dy = ry - radius * Math.cos(angle); // the draw y
                canvas.translate(dx, dy);
                canvas.rotate(angle);
                canvas.translate(-dx, -dx);
            }).call(this);
            // #endregion
            canvas.drawImage(this.image, this.point.x, this.point.y, this.point.width, this.point.height);
            canvas.restore();
        };
        return spirit;
    })();
    game.spirit = spirit;
})(game || (game = {}));
