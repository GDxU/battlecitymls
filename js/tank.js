var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var tank = (function (_super) {
        __extends(tank, _super);
        function tank(imgKey, point) {
            _super.call(this, imgKey, point);
        }
        tank.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
        };
        return tank;
    })(game.spirit);
    game.tank = tank;
})(game || (game = {}));
