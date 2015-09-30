var game;
(function (game) {
    var playEven;
    (function (playEven) {
        playEven[playEven["onredraw"] = 0] = "onredraw";
    })(playEven || (playEven = {}));
    //游戏场景
    var playing = (function () {
        function playing(canvas) {
            var _this = this;
            this.fps = 10000 / 60;
            this.lasttime = new Date();
            this.init = function () {
                _this.buildEvent();
                setInterval(function () {
                }, _this.fps);
            };
            // 绑定事件
            this.buildEvent = function () {
            };
            //Spirits
            this.spirits = [];
            //添加Spirit
            this.addSpirit = function (spirit) {
                _this.spirits.push(spirit);
            };
            //删除Spirit
            this.removeSpirit = function (spirit) {
                _this.spirits.filter(function (value) {
                    if (value.id === spirit.id) {
                        return false;
                    }
                    return true;
                });
            };
            //添加事件
            this.addEventListener = function (name, handler) {
                switch (name) {
                }
            };
            this.redraw = function () {
                _this.canvas.clearRect(0, 0, _this.width, _this.height);
                for (var i = 0, len = _this.spirits.length; i < len; i++) {
                    _this.spirits[i].draw(_this.canvas);
                }
            };
            this.canvas = canvas;
            this.canvasElement = canvas.canvas;
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;
            this.init();
        }
        return playing;
    })();
    game.playing = playing;
})(game || (game = {}));
