module game {
    export enum playEven {
        onredraw, //重绘事件
        longPressL,  //长按
        longPressR,//长按
        longPressU,//长按
        longPressD,//长按
        longPressAlphaA,//长按
    }
    export enum ctrKey {
        L = 37,
        D = 40,
        U = 38,
        R = 39,
        AlphaA = 65
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
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;

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


            document.addEventListener("keydown", (e) => {
                var keycode = e.keyCode,
                    keyName = ctrKey[keycode];
                if (keyName) {
                    this.pressKey[keyName] = true;
                    e.preventDefault();
                }

            });
            document.addEventListener("keyup", (e) => {
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
            this.spirits.filter(function (value) {
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
            for (var i = 0, len = this.spirits.length; i < len; i++) {
                this.spirits[i].draw(this.canvas);
            }
        };



    }
}