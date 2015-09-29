
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
        set imgSrc(src: string) {
            this.image = new Image();
            this.image.src = src;
        }

        constructor(point: point) {
            this.point = point;
            this.id = common.newId();
        }
    }
}
