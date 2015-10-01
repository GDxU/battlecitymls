module game {
    export class missile extends spirit {
        constructor(direc: direction, point?: point) {
            super("tankmissile", point);
            this.runingDirection = direc;
        }
        draw(canvas: CanvasRenderingContext2D) {
            var t = +new Date - this.lastUpdateTime,
                result = t / 1000 * this.run.speed;
            switch (this.runingDirection) {
                case direction.D:
                    this.point.y += result;
                    break;
                case direction.U:
                    this.point.y -= result;
                    break;
                case direction.L:
                    this.point.x -= result;
                    break;
                case direction.R:
                    this.point.x += result;
                    break;
            }
            super.draw(canvas);

            if (Math.abs(this.point.x) + this.point.width > canvas.canvas.width
                || Math.abs(this.point.y) + this.point.height > canvas.canvas.height) {
                //超出边界，删除
                this.isDel = true;
                return;
            }
        }
        runingDirection: direction;
        run = {
            speed: 200  //每秒走多少像素
        }
    }
}