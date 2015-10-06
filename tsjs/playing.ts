module game {
    export enum playEven {
        onredraw, //重绘事件
        longPressL,  //长按
        longPressR,//长按
        longPressU,//长按
        longPressD,//长按
        longPressKeypad0,//长按
        longPressAlphaA,//长按
        longPressAlphaW,//长按
        longPressAlphaS,//长按
        longPressAlphaD,//长按
        longPressAlphaJ,//长按
    }
    export enum ctrKey {
        L = 37,
        D = 40,
        U = 38,
        R = 39,
        Keypad0 = 96, //小键盘0
        AlphaA = 65,
        AlphaW = 87,
        AlphaS = 83,
        AlphaD = 68,
        AlphaJ = 74,
    }
    //游戏场景
    export class playing {
        private canvas: CanvasRenderingContext2D;
        private canvasElement: HTMLCanvasElement;
        width: number;
        height: number;
        fps = 10000 / 60;
        lasttime = new Date();
        interval: number;
        constructor(canvas: CanvasRenderingContext2D) {
            this.canvas = canvas;
            this.canvasElement = canvas.canvas;
            this.width = this.canvas.canvas.width;
            this.height = this.canvas.canvas.height;

            this.init();
        }
        init = () => {
            this.buildEvent();
            //this.interval = setInterval(() => {
                
            //}, this.fps);
            this.startDraw();
        }
        startDraw = () => {
            this.lasttime = new Date();
            this.redraw();
            requestAnimationFrame(this.startDraw);
        }
        close = () => {
            clearInterval(this.interval);
        }
        //长按状态的按钮  从ctrKey反射
        pressKey = {}

        // 绑定事件
        buildEvent = () => {

            for (var pk in ctrKey) {
                this.pressKey[pk] = false;
            }


            document.addEventListener("keydown",(e) => {
                var keycode = e.keyCode,
                    keyName = ctrKey[keycode];
                if (keyName) {
                    this.pressKey[keyName] = true;
                    e.preventDefault();
                }

            });
            document.addEventListener("keyup",(e) => {
                var keycode = e.keyCode,
                    keyName = ctrKey[keycode];
                if (keyName) {
                    this.pressKey[keyName] = false;
                    e.preventDefault();
                }

            });

        }

        private eventHandlers = {};
        //添加事件
        addEventListener = (eventName: playEven, handler: Function) => {
            if (!this.eventHandlers[eventName]) {
                this.eventHandlers[eventName] = [];
            }
            this.eventHandlers[eventName].push(handler);
        };
        //触发事件
        trigger = (eventName: playEven) => {
            var handlers = this.eventHandlers[eventName];
            if (!handlers) {
                return;
            }
            for (var i = 0; i < handlers.length; i++) {
                handlers[i]();
            }
        }

        //Spirits
        private spirits: spirit[] = [];
        //添加Spirit
        addSpirit = (spirit: spirit) => {
            this.spirits.push(spirit);
        };
        //删除Spirit
        removeSpirit = (spirit: spirit) => {
            this.spirits = this.spirits.filter(function (value) {
                if (value.id === spirit.id) {
                    return false;
                }
                return true;
            });
        };
        //重绘所有
        redraw = () => {
            //触发重给绘事件
            this.trigger(playEven.onredraw);

            // #region 触发长按事件
            for (var pk in this.pressKey) {
                if (this.pressKey[pk]) {
                    this.trigger(playEven["longPress" + pk]);
                }
            }
            // #endregion

            this.canvas.clearRect(0, 0, this.width, this.height);
            for (var i = 0; i < this.spirits.length; i++) {
                if (this.spirits[i].isDel) {
                    //排除已经删除的
                    this.removeSpirit(this.spirits[i]);
                    i--;
                    continue;
                }

                this.spirits[i].draw(this.canvas);
            }
        };

        //测试一个spirit的是不是碰到边界
        testOutBorder = (spirit: spirit) => {
            if (spirit.point.x + spirit.point.width > this.width) {
                return true;
            }
            if (spirit.point.x < 0) {
                return true;
            }
            if (spirit.point.y + spirit.point.height > this.height) {
                return true;
            }
            if (spirit.point.y < 0) {
                return true;
            }
            return false;
        }
        //测试是两个spirit是否重叠
        testOverlap = (one: spirit, two: spirit): boolean => {
            if (one === two)
                return false;
            var one_x1 = one.point.x,
                one_x2 = one.point.x + one.point.width - 1,  // one.point.width -1 是因为坐标是从0开始的
                one_y1 = one.point.y,
                one_y2 = one.point.y + one.point.width - 1,

                two_x1 = two.point.x,
                two_x2 = two.point.x + two.point.width - 1,
                two_y1 = two.point.y,
                two_y2 = two.point.y + two.point.width - 1;

            if ((two_x1 <= one_x1 && one_x1 <= two_x2) && (two_y1 <= one_y1 && one_y1 <= two_y2)) {
                debugger
                return true;
            } else if ((two_x1 <= one_x2 && one_x2 <= two_x2) && (two_y1 <= one_y1 && one_y1 <= two_y2)) {
                debugger
                return true;
            } else if ((two_x1 <= one_x1 && one_x1 <= two_x2) && (two_y1 <= one_y2 && one_y2 <= two_y2)) {
                debugger
                return true;
            } else if ((two_x1 <= one_x2 && one_x2 <= two_x2) && (two_y1 <= one_y2 && one_y2 <= two_y2)) {
                debugger
                return true;
            }

        }

        //测试是否会超出边界或碰撞
        testOutBorderAndOverlap = (spirit): boolean => {
            if (this.testOutBorder(spirit)) return true;
            var one = spirit, two;
            for (var t = 0, tlen = this.spirits.length; t < tlen; t++) {
                two = this.spirits[t];
                if (one !== two && this.testOverlap(one, two)) {
                    return true;
                }
            }

            return false;
        }

    }
}