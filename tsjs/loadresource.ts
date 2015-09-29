
module game {
    export class load {
        static images = {};
        static image = function (key: string, src: string) {
            load.images[key] = null;
            common.convertImgToBase64(src, function (img, base64) {

            });



        }
    }
}