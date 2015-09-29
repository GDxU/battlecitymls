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
        game.draw();
    }
    game.init = init;
})(game || (game = {}));
window.addEventListener("load", function () {
    game.init();
});
