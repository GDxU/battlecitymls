var game;
(function (game) {
    (function (playEven) {
        playEven[playEven["onredraw"] = 0] = "onredraw";
        playEven[playEven["longPressL"] = 1] = "longPressL";
        playEven[playEven["longPressR"] = 2] = "longPressR";
        playEven[playEven["longPressU"] = 3] = "longPressU";
        playEven[playEven["longPressD"] = 4] = "longPressD";
        playEven[playEven["longPressAlphaA"] = 5] = "longPressAlphaA";
    })(game.playEven || (game.playEven = {}));
    var playEven = game.playEven;
    (function (ctrKey) {
        ctrKey[ctrKey["L"] = 37] = "L";
        ctrKey[ctrKey["D"] = 40] = "D";
        ctrKey[ctrKey["U"] = 38] = "U";
        ctrKey[ctrKey["R"] = 39] = "R";
        ctrKey[ctrKey["AlphaA"] = 65] = "AlphaA";
    })(game.ctrKey || (game.ctrKey = {}));
    var ctrKey = game.ctrKey;
    //游戏场景
    var playing = (function () {
        function playing(canvas) {
            var _this = this;
            this.fps = 10000 / 60;
            this.lasttime = new Date();
            this.init = function () {
                _this.buildEvent();
                //this.interval = setInterval(() => {
                //}, this.fps);
                _this.startDraw();
            };
            this.startDraw = function () {
                _this.lasttime = new Date();
                _this.redraw();
                requestAnimationFrame(_this.startDraw);
            };
            this.close = function () {
                clearInterval(_this.interval);
            };
            //长按状态的按钮  从ctrKey反射
            this.pressKey = {};
            // 绑定事件
            this.buildEvent = function () {
                for (var pk in ctrKey) {
                    _this.pressKey[pk] = false;
                }
                document.addEventListener("keydown", function (e) {
                    var keycode = e.keyCode, keyName = ctrKey[keycode];
                    if (keyName) {
                        _this.pressKey[keyName] = true;
                        e.preventDefault();
                    }
                });
                document.addEventListener("keyup", function (e) {
                    var keycode = e.keyCode, keyName = ctrKey[keycode];
                    if (keyName) {
                        _this.pressKey[keyName] = false;
                        e.preventDefault();
                    }
                });
            };
            this.eventHandlers = {};
            //添加事件
            this.addEventListener = function (eventName, handler) {
                if (!_this.eventHandlers[eventName]) {
                    _this.eventHandlers[eventName] = [];
                }
                _this.eventHandlers[eventName].push(handler);
            };
            //触发事件
            this.trigger = function (eventName) {
                var handlers = _this.eventHandlers[eventName];
                if (!handlers) {
                    return;
                }
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i]();
                }
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
            //重绘所有
            this.redraw = function () {
                //触发重给绘事件
                _this.trigger(playEven.onredraw);
                // #region 触发长按事件
                for (var pk in _this.pressKey) {
                    if (_this.pressKey[pk]) {
                        _this.trigger(playEven["longPress" + pk]);
                    }
                }
                // #endregion
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
