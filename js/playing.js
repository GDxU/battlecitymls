var game;
(function (game) {
    (function (playEven) {
        playEven[playEven["onredraw"] = 0] = "onredraw";
        playEven[playEven["longPressL"] = 1] = "longPressL";
        playEven[playEven["longPressR"] = 2] = "longPressR";
        playEven[playEven["longPressU"] = 3] = "longPressU";
        playEven[playEven["longPressD"] = 4] = "longPressD";
        playEven[playEven["longPressKeypad0"] = 5] = "longPressKeypad0";
        playEven[playEven["longPressAlphaA"] = 6] = "longPressAlphaA";
        playEven[playEven["longPressAlphaW"] = 7] = "longPressAlphaW";
        playEven[playEven["longPressAlphaS"] = 8] = "longPressAlphaS";
        playEven[playEven["longPressAlphaD"] = 9] = "longPressAlphaD";
        playEven[playEven["longPressAlphaJ"] = 10] = "longPressAlphaJ";
    })(game.playEven || (game.playEven = {}));
    var playEven = game.playEven;
    (function (ctrKey) {
        ctrKey[ctrKey["L"] = 37] = "L";
        ctrKey[ctrKey["D"] = 40] = "D";
        ctrKey[ctrKey["U"] = 38] = "U";
        ctrKey[ctrKey["R"] = 39] = "R";
        ctrKey[ctrKey["Keypad0"] = 96] = "Keypad0";
        ctrKey[ctrKey["AlphaA"] = 65] = "AlphaA";
        ctrKey[ctrKey["AlphaW"] = 87] = "AlphaW";
        ctrKey[ctrKey["AlphaS"] = 83] = "AlphaS";
        ctrKey[ctrKey["AlphaD"] = 68] = "AlphaD";
        ctrKey[ctrKey["AlphaJ"] = 74] = "AlphaJ";
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
                _this.spirits = _this.spirits.filter(function (value) {
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
                for (var i = 0; i < _this.spirits.length; i++) {
                    if (_this.spirits[i].isDel) {
                        //排除已经删除的
                        _this.removeSpirit(_this.spirits[i]);
                        i--;
                        continue;
                    }
                    _this.spirits[i].draw(_this.canvas);
                }
            };
            //测试一个spirit的是不是碰到边界
            this.testOutBorder = function (spirit) {
                if (spirit.point.x + spirit.point.width > _this.width) {
                    return true;
                }
                if (spirit.point.x < 0) {
                    return true;
                }
                if (spirit.point.y + spirit.point.height > _this.height) {
                    return true;
                }
                if (spirit.point.y < 0) {
                    return true;
                }
                return false;
            };
            //测试是两个spirit是否重叠
            this.testOverlap = function (one, two) {
                if (one === two || two.isFloat || one.isFloat)
                    return false;
                //var one_x1 = one.point.x,
                //    one_x2 = one.point.x + one.point.width - 1,  // one.point.width -1 是因为坐标是从0开始的
                //    one_y1 = one.point.y + one.point.height,
                //    one_y2 = one.point.y + one.point.height + one.point.width - 1,
                //    two_x1 = two.point.x,
                //    two_x2 = two.point.x + two.point.width - 1,
                //    two_y1 = two.point.y + two.point.height,
                //    two_y2 = two.point.y + two.point.height + two.point.width - 1;
                //if ((one_x1 <= two_x1 && two_x1 <= one_x2) && (one_x1 <= two_x1 && two_x1 <= one_y1)) {
                //    // two 1 one 内
                //    return true;
                //}
                //if ((one_x1 <= two_x2 && two_x2 <= one_x2) && (one_x1 <= two_x2 && two_x2 <= one_y1)) {
                //    // two 第2个点在 one 内
                //    return true;
                //}
                //if ((one_x1 <= two_y1 && two_y1 <= one_x2) && (one_x1 <= two_y1 && two_y1 <= one_y1)) {
                //    // two 3 one 内
                //    return true;
                //}
                //if ((one_x1 <= two_y2 && two_y2 <= one_x2) && (one_x1 <= two_y2 && two_y2 <= one_y1)) {
                //    // two 4 one 内
                //    return true;
                //}
                var one_x1 = one.point.x, one_x2 = one.point.x + one.point.width - 1, // one.point.width -1 是因为坐标是从0开始的
                one_y1 = one.point.y, one_y2 = one.point.y + one.point.width - 1, two_x1 = two.point.x, two_x2 = two.point.x + two.point.width - 1, two_y1 = two.point.y, two_y2 = two.point.y + two.point.width - 1;
                if ((two_x1 <= one_x1 && one_x1 <= two_x2) && (two_y1 <= one_y1 && one_y1 <= two_y2)) {
                    return true;
                }
                else if ((two_x1 <= one_x2 && one_x2 <= two_x2) && (two_y1 <= one_y1 && one_y1 <= two_y2)) {
                    return true;
                }
                else if ((two_x1 <= one_x1 && one_x1 <= two_x2) && (two_y1 <= one_y2 && one_y2 <= two_y2)) {
                    return true;
                }
                else if ((two_x1 <= one_x2 && one_x2 <= two_x2) && (two_y1 <= one_y2 && one_y2 <= two_y2)) {
                    return true;
                }
                if ((one_x1 <= two_x1 && two_x1 <= one_x2) && (one_y1 <= two_y1 && two_y1 <= one_y2)) {
                    return true;
                }
                else if ((one_x1 <= two_x2 && two_x2 <= one_x2) && (one_y1 <= two_y1 && two_y1 <= one_y2)) {
                    return true;
                }
                else if ((one_x1 <= two_x1 && two_x1 <= one_x2) && (one_y1 <= two_y2 && two_y2 <= one_y2)) {
                    return true;
                }
                else if ((one_x1 <= two_x2 && two_x2 <= one_x2) && (one_y1 <= two_y2 && two_y2 <= one_y2)) {
                    return true;
                }
            };
            //测试是否会超出边界或碰撞
            this.testOutBorderAndOverlap = function (spirit) {
                if (_this.testOutBorder(spirit))
                    return true;
                var one = spirit, two;
                for (var t = 0, tlen = _this.spirits.length; t < tlen; t++) {
                    two = _this.spirits[t];
                    if (one !== two && _this.testOverlap(one, two)) {
                        return true;
                    }
                }
                return false;
            };
            this.canvas = canvas;
            this.canvasElement = canvas.canvas;
            this.width = this.canvas.canvas.width;
            this.height = this.canvas.canvas.height;
            this.init();
        }
        return playing;
    })();
    game.playing = playing;
})(game || (game = {}));
