
module game {
    export var canvas: HTMLCanvasElement;
    export var scene: playing;
    export function init() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width = config.maxWidth;
        canvas.height = config.maxHeight;
        canvas.style.backgroundColor = "#000";

        loadImgs();
        load.onload = function () {
             start();
        }
    }

    var loadImgs = function () {
        game.load.image("p1tank", "img/p1tank.gif");
        game.load.image("bomb", "img/bomb.gif");
    }
    var start = function () {
        //开始游戏

        scene = new game.playing(canvas.getContext("2d"));
        var p1 = new game.tank("bomb", {
            x: 100,
            y: 100,
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