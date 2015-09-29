var game;
(function (game) {
    function init() {
        game.canvas = document.createElement("canvas");
        game.cvx = game.canvas.getContext("2d");
        document.body.appendChild(game.canvas);
        var stl = game.canvas.style;
        stl.backgroundColor = "#000";
        stl.width = game.config.maxWidth + "px";
        stl.height = game.config.maxHeight + "px";
        loadImgs();
        game.load.onload = function () {
            start();
        };
    }
    game.init = init;
    var loadImgs = function () {
        game.load.image("p1tank", "img/p1tank.gif");
    };
    var start = function () {
        //开始游戏
        game.playing.
            console.log("start");
        game.draw();
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
