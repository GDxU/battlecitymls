
module game {

    export interface point {
        width: number;
        height: number;
        x: number;
        y: number;
    }

    export class spirit {
        id: string;
        point: point;
        private image: HTMLImageElement;
        set imgKey(key: string) {
            this.image = game.source.images[key].img;
        }

        constructor(imgKey: string, point: point) {
            this.point = point;
            this.id = common.newId();
            this.imgKey = imgKey;
        }
        draw(canvas: HTMLCanvasElement) {

        }
    }
}
