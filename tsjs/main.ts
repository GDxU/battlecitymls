
module game {
    export var canvas: HTMLCanvasElement;
    export var scene: playing;
    export function init() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);

        var stl = canvas.style;
        stl.backgroundColor = "#000";
        stl.width = config.maxWidth + "px";
        stl.height = config.maxHeight + "px";

        loadImgs();
        load.onload = function () {
            start();
        }
    }

    var loadImgs = function () {
        game.load.image("p1tank", "img/p1tank.gif");
    }
    var start = function () {
        //开始游戏

        scene = new game.playing(canvas.getContext("2d"));
        var p1 = new game.tank("p1tank", {
            x: 0,
            y: 0,
            width: config.tankWidth,
            height: config.tankHeight
        });
        scene.addSpirit(p1);

        console.log("start");
    };
}
window.addEventListener("load", function () {
    game.init();
});