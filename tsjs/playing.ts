module game {
    enum playEven {
        onredraw
    }
    //游戏场景
    export class playing {
        private canvas: CanvasRenderingContext2D;
        private canvasElement: HTMLCanvasElement;
        width: number;
        height: number;
        fps = 10000 / 60;
        lasttime = new Date()
        constructor(canvas: CanvasRenderingContext2D) {
            this.canvas = canvas;
            this.canvasElement = canvas.canvas;
            this.width = this.canvasElement.width;
            this.height = this.canvasElement.height;

            this.init();
        }
        init = () => {
            this.buildEvent();
            var self = this;
            setInterval(function () {

                self.redraw();

            }, this.fps);
        }
        
        // 绑定事件
        buildEvent = () => {

        }
        //触发事件
        trigger = (even: playEven) => {

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
        //添加事件
        addEventListener = (eveb: playEven, handler: Function) => {

        };
        //重绘所有
        redraw = () => {
            //触发重给绘事件
            this.trigger(playEven.onredraw);

            this.canvas.clearRect(0, 0, this.width, this.height);
            for (var i = 0, len = this.spirits.length; i < len; i++) {
                this.spirits[i].draw(this.canvas);
            }
        };



    }
}