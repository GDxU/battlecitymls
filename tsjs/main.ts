
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


        draw();
    }
}
window.addEventListener("load", function () {
    game.init();
});