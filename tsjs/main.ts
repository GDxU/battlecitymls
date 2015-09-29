
module game {
    export var canvas: HTMLCanvasElement;
    export var cvx: CanvasRenderingContext2D;
    export function init() {
        canvas = document.createElement("canvas");
        cvx = canvas.getContext("2d");
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
        game.playing.



        console.log("start");
        draw();
    }
}
window.addEventListener("load", function () {
    game.init();
});