module game {
    export class terrain extends spirit {
        constructor(imgKey: string, point: point, isFloat: boolean) {

            super(imgKey, point)

            this.isFloat = isFloat;

        }
        draw(canvas: CanvasRenderingContext2D) {
            super.draw(canvas);

        }
    }
}