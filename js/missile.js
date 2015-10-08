var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var missile = (function (_super) {
        __extends(missile, _super);
        function missile(direc, point, opt) {
            _super.call(this, "tankmissile", point);
            this.run = {
                speed: 200 //每秒走多少像素
            };
            opt && common.extend(this, opt);
            this.runingDirection = direc;
        }
        missile.prototype.draw = function (canvas) {
            var t = +new Date - this.lastUpdateTime, result = t / 1000 * this.run.speed;
            switch (this.runingDirection) {
                case game.direction.D:
                    this.point.y += result;
                    break;
                case game.direction.U:
                    this.point.y -= result;
                    break;
                case game.direction.L:
                    this.point.x -= result;
                    break;
                case game.direction.R:
                    this.point.x += result;
                    break;
            }
            _super.prototype.draw.call(this, canvas);
            if (Math.abs(this.point.x) + this.point.width > canvas.canvas.width
                || Math.abs(this.point.y) + this.point.height > canvas.canvas.height) {
                //超出边界，删除
                this.isDel = true;
                return;
            }
        };
        return missile;
    })(game.spirit);
    game.missile = missile;
})(game || (game = {}));
