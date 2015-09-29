var game;
(function (game) {
    var load = (function () {
        function load() {
        }
        load.images = {};
        load.image = function (key, src) {
            load.images[key] = null;
            common.convertImgToBase64(src, function (img, base64) {
            });
        };
        return load;
    })();
    game.load = load;
})(game || (game = {}));
