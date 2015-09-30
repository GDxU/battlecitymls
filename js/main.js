var game;
(function (game) {
    function init() {
        game.canvas = document.createElement("canvas");
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
        game.scene = new game.playing(game.canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", {
            x: 0,
            y: 0,
            width: game.config.tankWidth,
            height: game.config.tankHeight
        });
        game.scene.addSpirit(p1);
        console.log("start");
    };
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
