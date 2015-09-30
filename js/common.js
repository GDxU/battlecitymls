var common;
(function (common) {
    var id = 1;
    function newId() {
        return +new Date + "" + id++;
    }
    common.newId = newId;
    function convertImgToBase64(url, callback, outputFormat) {
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), img = new Image, dataURL;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat || 'image/png');
            canvas = ctx = null;
            img.onload = null;
            callback(img, dataURL);
        };
        img.src = url;
    }
    common.convertImgToBase64 = convertImgToBase64;
})(common || (common = {}));
