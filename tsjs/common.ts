

module common {
    interface imageloadcall {
        (img: HTMLImageElement, base64: string): void
    }

    var id = 1;
    export function newId(): string {
        return +new Date + "" + id++;
    }
    export function convertImgToBase64(url: string, callback?: imageloadcall, outputFormat?: string) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image,
            dataURL;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat || 'image/png');
            canvas = ctx = null;

            img.onload = null;
            callback.call(img, dataURL);

        };
        img.src = url;
    }

}