module game {
    export class tank extends spirit {
        constructor(imgKey: string,point?: point) {
            super(imgKey,point);
        }

        draw(canvas: CanvasRenderingContext2D) {

            super.draw(canvas);
        }
    }
}