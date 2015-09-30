module game {
    export class missile extends spirit {
        constructor(direc: direction, point?: point) {
            super("tankmissile", point);
            this.runingDirection = direc;
        }
        draw(canvas: CanvasRenderingContext2D) {


            super.draw(canvas);
        }
        runingDirection: direction;
        run = {
            speed: 0,  //每步走多少像素
            sTime: 200,//每步需要多少时间
            startPoint: 0,
            endPoint: 0,
            startRunTime: 0,
            isRuning: false
        }
    }
}